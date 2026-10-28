import api from "./axios";

const saveAnswer = ({ interviewId, answers, duration }) => {
    const token = localStorage.getItem("token");

    return api.post("/api/answers", {
        interviewId,
        answers,
        duration
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const submitAnswer = ({ interviewId, questionId, answer }) => {
    const token = localStorage.getItem("token");

    return api.post("/api/answers/submit", {
        interviewId,
        questionId,
        answer
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

/**
 * Streams follow-up question tokens over SSE from backend
 */
const submitAnswerStream = async ({ interviewId, questionId, answer, onChunk, onComplete, onError }) => {
    const token = localStorage.getItem("token");
    const baseURL = import.meta.env.VITE_API_URL || "";

    try {
        const response = await fetch(`${baseURL}/api/answers/submit-stream`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ interviewId, questionId, answer })
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const blocks = buffer.split("\n\n");
            buffer = blocks.pop(); // keep trailing partial

            for (const block of blocks) {
                if (!block.trim()) continue;
                const eventMatch = block.match(/^event:\s*(.+)$/m);
                const dataMatch = block.match(/^data:\s*(.+)$/m);

                const eventType = eventMatch ? eventMatch[1].trim() : "message";
                const eventData = dataMatch ? JSON.parse(dataMatch[1]) : {};

                if (eventType === "chunk" && onChunk) {
                    onChunk(eventData.text);
                } else if (eventType === "complete" && onComplete) {
                    onComplete(eventData);
                } else if (eventType === "error" && onError) {
                    onError(eventData);
                }
            }
        }
    } catch (err) {
        if (onError) onError(err);
        else throw err;
    }
};

export { saveAnswer, submitAnswer, submitAnswerStream };
