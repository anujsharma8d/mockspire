const InterviewQuestion = require("../models/InterviewQuestion");

/**
 * Selects the best matching question from the question bank
 * @param {Object} criteria - Selection criteria
 * @returns {Promise<Object|null>} Selected question or null
 */
const selectQuestionFromBank = async (criteria) => {
    try {
        const {
            interviewId,
            suggestedTopic,
            nextAction,
            difficulty,
            role,
            category,
            excludeQuestionIds = [],
            gaps = []
        } = criteria;

        // Build query to find matching questions
        const query = {
            interviewId: interviewId,
            _id: { $nin: excludeQuestionIds } // Exclude already asked questions
        };

        // Add filters based on criteria
        if (role) query.role = role;
        if (category) query.category = category;

        // Adjust difficulty based on next action
        let targetDifficulty = difficulty;
        if (nextAction === 'easier_question') {
            targetDifficulty = difficulty === 'Hard' ? 'Medium' : 'Easy';
        } else if (nextAction === 'harder_question') {
            targetDifficulty = difficulty === 'Easy' ? 'Medium' : 'Hard';
        }

        query.difficulty = targetDifficulty;

        // Search for questions matching the suggested topic
        let matchingQuestions = [];

        if (suggestedTopic) {
            // Search for questions that contain the topic keyword
            matchingQuestions = await InterviewQuestion.find({
                ...query,
                $or: [
                    { question: { $regex: suggestedTopic, $options: 'i' } },
                    { category: { $regex: suggestedTopic, $options: 'i' } }
                ]
            });
        }

        // If no topic-specific matches, search for questions related to gaps
        if (matchingQuestions.length === 0 && gaps && gaps.length > 0) {
            const gapRegex = gaps.map(gap => `(${gap})`).join('|');
            matchingQuestions = await InterviewQuestion.find({
                ...query,
                question: { $regex: gapRegex, $options: 'i' }
            });
        }

        // If still no matches, get any unused question from the bank
        if (matchingQuestions.length === 0) {
            matchingQuestions = await InterviewQuestion.find(query);
        }

        // Return a random question from matches (for variety)
        if (matchingQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * matchingQuestions.length);
            return matchingQuestions[randomIndex];
        }

        return null;

    } catch (err) {
        console.error("Question Selection Error:", err);
        throw err;
    }
};

/**
 * Creates a follow-up question and saves it to the database
 * @param {Object} questionData - Question data
 * @returns {Promise<Object>} Created question
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
            category: topic || category,
            role,
            difficulty,
            question,
            source: "followup",
            followUps: []
        });

        console.log("Follow-up question created for session:", followUpQuestion._id);

        return followUpQuestion;

    } catch (err) {
        console.error("Follow-up Question Creation Error:", err);
        throw err;
    }
};

/**
 * Gets the interview context for AI evaluation
 * @param {Object} session - Interview session
 * @param {Array} answers - Previous answers
 * @returns {Object} Context object
 */
const buildInterviewContext = async (session, answers) => {
    try {
        // Get the last 3 answers with their questions for context
        const recentAnswers = [];
        const coveredTopics = new Set();

        for (const answer of answers.slice(-3)) {
            const question = await InterviewQuestion.findById(answer.questionId);
            if (question) {
                recentAnswers.push({
                    question: question.question,
                    answer: answer.answer
                });
                coveredTopics.add(question.category);
            }
        }

        return {
            previousAnswers: recentAnswers,
            coveredTopics: Array.from(coveredTopics),
            answeredQuestionIds: answers.map(a => a.questionId.toString())
        };

    } catch (err) {
        console.error("Context Building Error:", err);
        return {
            previousAnswers: [],
            coveredTopics: [],
            answeredQuestionIds: []
        };
    }
};

module.exports = {
    selectQuestionFromBank,
    createFollowUpQuestion,
    buildInterviewContext
};
