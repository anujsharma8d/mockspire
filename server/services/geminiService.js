const { GoogleGenAI } = require("@google/genai");
const { callGeminiWithRetry } = require("./geminiRetry");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const DEFAULT_MODEL = "gemini-3.1-flash-lite";

/**
 * Generates comprehensive interview feedback and grading
 * @param {string} prompt
 * @returns {Promise<Object>}
 */
const generateInterviewFeedback = async (prompt) => {
    const executeCall = async () => {
        console.log("Sending feedback request to Gemini...");

        const response = await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        console.log("Gemini feedback response received");
        return JSON.parse(response.text);
    };

    return await callGeminiWithRetry(executeCall, {
        maxRetries: 3,
        baseDelayMs: 1200,
        label: "Gemini Feedback Generation"
    });
};

/**
 * Generates initial interview questions
 * @param {string} prompt
 * @returns {Promise<Object>}
 */
const generateInterviewQuestions = async (prompt) => {
    const executeCall = async () => {
        console.log("Calling Gemini for interview questions...");

        const response = await ai.models.generateContent({
            model: DEFAULT_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        console.log("Gemini questions response received");
        return JSON.parse(response.text);
    };

    return await callGeminiWithRetry(executeCall, {
        maxRetries: 3,
        baseDelayMs: 1000,
        label: "Gemini Questions Generation"
    });
};

module.exports = {
    generateInterviewFeedback,
    generateInterviewQuestions
};
