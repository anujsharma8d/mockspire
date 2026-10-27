const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

/**
 * Analyzes the candidate's answer and determines the next interview direction
 * @param {Object} context - Interview context
 * @returns {Promise<Object>} Evaluation and next action
 */
const evaluateAnswerAndDetermineNext = async (context) => {
    try {
        const {
            currentQuestion,
            candidateAnswer,
            role,
            interviewType,
            difficulty,
            previousAnswers = [],
            coveredTopics = []
        } = context;

        const prompt = `You are an expert technical interviewer conducting a ${interviewType} interview for a ${role} position at ${difficulty} difficulty level.

Current Question: "${currentQuestion}"

Candidate's Answer: "${candidateAnswer}"

${previousAnswers.length > 0 ? `Recent Interview Context (last ${Math.min(3, previousAnswers.length)} Q&As):
${previousAnswers.slice(-3).map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`).join('\n\n')}` : ''}

${coveredTopics.length > 0 ? `Topics Already Covered: ${coveredTopics.join(', ')}` : ''}

Your task is to:
1. Evaluate the candidate's answer quality and depth
2. Determine the most appropriate next interview action

Analyze:
- Correctness: Is the answer accurate? (0-10)
- Depth: How thorough is the understanding? (0-10)
- Clarity: How well did they explain? (0-10)
- Gaps: What specific concepts are missing or unclear?

Based on this analysis, decide the next action:

**cross_question** - Ask a follow-up question that challenges or explores their answer deeper
Use when: Answer is partially correct or surface-level, needs clarification

**deeper_question** - Dive deeper into the same concept
Use when: Answer is good but you want to test advanced understanding

**clarification** - Ask them to clarify or elaborate on something specific they mentioned
Use when: Answer is vague or has unclear parts

**example_question** - Ask for a practical example or real-world scenario
Use when: Answer is theoretical but lacks practical application

**scenario_question** - Present a problem scenario related to the topic
Use when: You want to test practical problem-solving skills

**new_topic** - Move to a different topic
Use when: Current topic is sufficiently explored (after 2-4 questions typically)

**easier_question** - Ask an easier question on a related concept
Use when: Answer shows fundamental gaps in understanding

**harder_question** - Increase difficulty on the same or related topic
Use when: Answer demonstrates strong understanding consistently

**end_topic** - Wrap up current topic and prepare to transition
Use when: Topic is thoroughly covered

Return ONLY valid JSON in this exact format:
{
  "correctness": <number 0-10>,
  "depth": <number 0-10>,
  "clarity": <number 0-10>,
  "nextAction": "<one of the actions above>",
  "reasoning": "<brief explanation of your decision>",
  "suggestedTopic": "<specific topic/concept for the next question>",
  "gaps": ["<specific gap 1>", "<specific gap 2>"],
  "shouldGenerateCustomQuestion": <true if answer requires very specific follow-up, false if existing question from bank is better>
}`;

        console.log("Sending evaluation request to Gemini...");

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        console.log("Gemini evaluation response received");
        const evaluation = JSON.parse(response.text);

        return evaluation;

    } catch (err) {
        console.error("AI Evaluation Error:", err);
        throw err;
    }
};

/**
 * Generates a custom follow-up question based on the candidate's specific answer
 * @param {Object} context - Interview context
 * @returns {Promise<Object>} Generated question and topic
 */
const generateCustomFollowUpQuestion = async (context) => {
    try {
        const {
            currentQuestion,
            candidateAnswer,
            nextAction,
            suggestedTopic,
            gaps,
            role,
            interviewType,
            difficulty,
            evaluation = {},
            previousAnswers = [],
            recentQuestions = []
        } = context;

        const prompt = `You are an expert technical interviewer conducting a ${interviewType} interview for a ${role} position at ${difficulty} difficulty level.

CURRENT CONTEXT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Question: "${currentQuestion}"

Candidate's Answer: "${candidateAnswer}"

Answer Evaluation:
- Correctness: ${evaluation.correctness || 'N/A'}/10
- Depth: ${evaluation.depth || 'N/A'}/10
- Clarity: ${evaluation.clarity || 'N/A'}/10
${gaps && gaps.length > 0 ? `- Knowledge Gaps: ${gaps.join(', ')}` : ''}
${suggestedTopic ? `- Suggested Focus: ${suggestedTopic}` : ''}

${previousAnswers.length > 0 ? `\nRECENT CONVERSATION (last ${Math.min(3, previousAnswers.length)} Q&As):
${previousAnswers.slice(-3).map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`).join('\n\n')}` : ''}

${recentQuestions.length > 0 ? `\nQUESTIONS ALREADY ASKED:
${recentQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR TASK:
Generate ONE follow-up question that naturally follows from what the candidate just said.

ANALYZE THE CANDIDATE'S ANSWER:
1. What did they claim or state?
2. What important details are missing?
3. What concepts did they mention but not explain?
4. Are there any potential misconceptions?
5. What technical reasoning could be probed deeper?
6. What practical applications could be explored?

FOLLOW-UP HIERARCHY (prefer in this order):

A. CLARIFY WEAK/INCOMPLETE STATEMENTS
   If the candidate made a vague or incomplete claim, ask them to explain specifically.
   Example: Candidate: "Middleware checks authentication"
   Follow-up: "What information does the authentication middleware actually inspect to determine whether the request is authenticated?"

B. PROBE KNOWLEDGE GAPS
   If evaluation identified missing concepts, ask about them directly.
   Example: Gap = "token verification"
   Follow-up: "How does the server use the JWT signature to verify the token?"

C. CHALLENGE CLAIMS (if appropriate)
   If the candidate made a questionable statement, probe it gently.
   Example: Candidate: "Storing JWTs in localStorage is completely secure"
   Follow-up: "What security risk could arise from storing authentication tokens in localStorage?"

D. ASK FOR PRACTICAL APPLICATION
   If the candidate mentioned using something, ask how they implemented it.
   Example: Candidate: "I used JWT authentication in my MERN project"
   Follow-up: "How did your backend middleware verify the JWT before allowing access to protected routes?"

E. INCREASE DEPTH (for strong candidates)
   If the candidate demonstrated strong understanding, go deeper.
   Example: "What trade-offs would you consider between JWT-based authentication and server-side sessions?"

CRITICAL RULES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Base your question on what the candidate ACTUALLY SAID, not just the topic
2. Do NOT repeat or rephrase any previously asked questions
3. Make the question self-contained (don't reference scores, gaps, or internal reasoning)
4. Generate exactly ONE question
5. Keep the question conversational and natural
6. Match difficulty to the candidate's demonstrated ability:
   - Weak candidate (depth < 5): Ask foundational/clarification questions
   - Average candidate (depth 5-7): Ask practical/conceptual questions
   - Strong candidate (depth > 7): Ask deeper technical/scenario questions
7. The question must introduce a NEW angle, not repeat what was already asked
8. Stay connected to the conversation flow
9. Don't expose that you're evaluating them (no "based on your gap..." language)

NEXT ACTION GUIDANCE:
Current action is: ${nextAction}
${nextAction === 'cross_question' ? '→ Challenge or explore their answer deeper based on what they said' : ''}
${nextAction === 'deeper_question' ? '→ Dive into technical details they mentioned but didn\'t fully explain' : ''}
${nextAction === 'clarification' ? '→ Ask them to clarify or elaborate on a specific statement they made' : ''}
${nextAction === 'example_question' ? '→ Ask for a concrete example related to something they mentioned' : ''}
${nextAction === 'scenario_question' ? '→ Present a realistic problem based on the concepts they discussed' : ''}
${nextAction === 'easier_question' ? '→ Ask something simpler to build foundation in the current topic' : ''}
${nextAction === 'harder_question' ? '→ Challenge them with a more advanced aspect of what they discussed' : ''}

Return ONLY valid JSON in this exact format:
{
  "question": "<ONE self-contained interview question that naturally follows from the candidate's answer>",
  "topic": "<specific topic/concept being tested>"
}`;

        console.log("Generating custom follow-up question with full context...");

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        console.log("Custom question generated");
        const result = JSON.parse(response.text);

        return result;

    } catch (err) {
        console.error("Custom Question Generation Error:", err);
        throw err;
    }
};

module.exports = {
    evaluateAnswerAndDetermineNext,
    generateCustomFollowUpQuestion
};
