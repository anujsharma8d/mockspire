const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


const generateInterviewFeedback = async (prompt) => {
    try {
        console.log("Sending request to Gemini...");

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                temperature: 0.3
            }
        });

        console.log("Gemini response received");
        console.log(response);

        return JSON.parse(response.text);

    } catch (err) {
        console.error("Gemini Error:", err);
        throw err;
    }
};

module.exports = {generateInterviewFeedback}