const InterviewQuestion = require("../models/InterviewQuestion");
const { getFallbackQuestion } = require("./fallbackQuestionBank");

/**
 * Selects the best matching question from the question bank or curated fallback bank
 * @param {Object} criteria - Selection criteria
 * @returns {Promise<Object>} Selected question object { question, topic, difficulty, category }
 */
const selectQuestionFromBank = async (criteria) => {
    try {
        const {
            interviewId,
            suggestedTopic,
            nextAction,
            difficulty = "Medium",
            role = "Software Engineer",
            category = "Technical",
            excludeQuestionIds = [],
            excludeQuestionTexts = [],
            gaps = []
        } = criteria;

        // Adjust difficulty based on next action
        let targetDifficulty = difficulty;
        if (nextAction === 'easier_question') {
            targetDifficulty = difficulty === 'Hard' ? 'Medium' : 'Easy';
        } else if (nextAction === 'harder_question') {
            targetDifficulty = difficulty === 'Easy' ? 'Medium' : 'Hard';
        }

        // Try to find matching questions across the DB first
        const query = {
            role,
            difficulty: targetDifficulty,
            _id: { $nin: excludeQuestionIds }
        };

        if (category) {
            query.category = category;
        }

        let matchingQuestions = [];

        // Search for topic keyword if suggested
        if (suggestedTopic) {
            try {
                matchingQuestions = await InterviewQuestion.find({
                    ...query,
                    $or: [
                        { question: { $regex: suggestedTopic, $options: 'i' } },
                        { category: { $regex: suggestedTopic, $options: 'i' } }
                    ]
                }).limit(5).lean();
            } catch (qErr) {
                console.warn("DB search error:", qErr.message);
            }
        }

        // If no topic-specific matches, search for questions related to gaps
        if (matchingQuestions.length === 0 && gaps && gaps.length > 0) {
            try {
                const gapRegex = gaps.map(gap => `(${gap.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`).join('|');
                matchingQuestions = await InterviewQuestion.find({
                    ...query,
                    question: { $regex: gapRegex, $options: 'i' }
                }).limit(5).lean();
            } catch (qErr) {
                console.warn("DB gap search error:", qErr.message);
            }
        }

        // Filter out questions matching already asked question texts
        const normalizedExcludes = excludeQuestionTexts.map(t => t.toLowerCase().trim());
        const filteredDBMatches = matchingQuestions.filter(q => 
            !normalizedExcludes.some(ex => ex.includes(q.question.toLowerCase().trim()) || q.question.toLowerCase().trim().includes(ex))
        );

        if (filteredDBMatches.length > 0) {
            const chosen = filteredDBMatches[Math.floor(Math.random() * filteredDBMatches.length)];
            return {
                question: chosen.question,
                topic: chosen.category || suggestedTopic || role,
                difficulty: chosen.difficulty || targetDifficulty,
                category: chosen.category || category
            };
        }

        // Always fallback reliably to the curated question bank
        const fallback = getFallbackQuestion({
            role,
            interviewType: category,
            difficulty: targetDifficulty,
            suggestedTopic,
            excludeQuestions: excludeQuestionTexts
        });

        return fallback;

    } catch (err) {
        console.error("Question Selection Error:", err);
        // Guaranteed safe fallback
        return getFallbackQuestion({
            role: criteria.role,
            interviewType: criteria.category,
            difficulty: criteria.difficulty,
            suggestedTopic: criteria.suggestedTopic,
            excludeQuestions: criteria.excludeQuestionTexts
        });
    }
};

/**
 * Creates a follow-up question document and saves it to the database
 * @param {Object} questionData - Question data
 * @returns {Promise<Object>} Created question document
 */
const createFollowUpQuestion = async (questionData) => {
    try {
        const {
            interviewId,
            question,
            topic,
            role,
            category,
            difficulty
        } = questionData;

        const followUpQuestion = await InterviewQuestion.create({
            interviewId,
            category: topic || category || "General",
            role: role || "Software Engineer",
            difficulty: difficulty || "Medium",
            question,
            source: "followup",
            followUps: []
        });

        console.log("Follow-up question created:", followUpQuestion._id);
        return followUpQuestion;

    } catch (err) {
        console.error("Follow-up Question Creation Error:", err);
        throw err;
    }
};

/**
 * Builds interview context in a fast, batch-optimized manner (no N+1 queries)
 * @param {Object} session - Interview session
 * @param {Array} answers - Previous answers (preferably populated with questionId)
 * @returns {Promise<Object>} Context object
 */
const buildInterviewContext = async (session, answers = []) => {
    try {
        const recentAnswersSlice = answers.slice(-3);
        const recentAnswers = [];
        const coveredTopics = new Set();
        const askedQuestionTexts = [];

        // Check if answers already have populated questionId
        const needsFetchIds = [];
        for (const answer of answers) {
            if (answer.questionId && typeof answer.questionId === 'object' && answer.questionId.question) {
                askedQuestionTexts.push(answer.questionId.question);
                if (answer.questionId.category) coveredTopics.add(answer.questionId.category);
            } else if (answer.questionId) {
                needsFetchIds.push(answer.questionId);
            }
        }

        // If not populated, fetch all in ONE query ($in)
        let questionMap = new Map();
        if (needsFetchIds.length > 0) {
            const fetchedQuestions = await InterviewQuestion.find({
                _id: { $in: needsFetchIds }
            }).lean();

            for (const q of fetchedQuestions) {
                questionMap.set(q._id.toString(), q);
                askedQuestionTexts.push(q.question);
                if (q.category) coveredTopics.add(q.category);
            }
        }

        // Build recent Q&A list for prompt
        for (const answer of recentAnswersSlice) {
            let qText = "";
            let category = "";

            if (answer.questionId && typeof answer.questionId === 'object' && answer.questionId.question) {
                qText = answer.questionId.question;
                category = answer.questionId.category;
            } else if (answer.questionId) {
                const q = questionMap.get(answer.questionId.toString());
                if (q) {
                    qText = q.question;
                    category = q.category;
                }
            }

            if (qText) {
                recentAnswers.push({
                    question: qText,
                    answer: answer.answer
                });
                if (category) coveredTopics.add(category);
            }
        }

        return {
            previousAnswers: recentAnswers,
            coveredTopics: Array.from(coveredTopics),
            answeredQuestionIds: answers.map(a => (a.questionId?._id || a.questionId || "").toString()).filter(Boolean),
            askedQuestionTexts
        };

    } catch (err) {
        console.error("Context Building Error:", err);
        return {
            previousAnswers: [],
            coveredTopics: [],
            answeredQuestionIds: [],
            askedQuestionTexts: []
        };
    }
};

module.exports = {
    selectQuestionFromBank,
    createFollowUpQuestion,
    buildInterviewContext
};
