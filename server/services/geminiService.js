const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})


const generateInterviewFeedback = async (prompt) => {
    try {
        console.log("Sending request to Gemini...");

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
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

const generateInterviewQuestions = async(prompt)=>{
    try{
        console.log("Calling gemini for interview questions...")

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }

        })
        console.log("Gemini questions response received");
        console.log(response);
        return JSON.parse(response.text);
    } catch(err){
        console.error("Gemini Question Error: ",err)
        throw err
    }
} 


module.exports = {generateInterviewFeedback,generateInterviewQuestions}