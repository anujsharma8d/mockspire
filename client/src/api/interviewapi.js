import api from "./axios";

const getQuestions = (sessionId) => {
    const token = localStorage.getItem("token");

    return api.get(`/api/interview/${sessionId}/questions`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getFirstQuestion = (sessionId) => {
    const token = localStorage.getItem("token");

    return api.get(`/api/interview/${sessionId}/first-question`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const startInterview = (setup)=>{
    const token = localStorage.getItem("token");

    return api.post("/api/interview/start", setup, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const getInterview = (sessionId)=>{
    const token = localStorage.getItem("token");
    return api.get(`/api/interview/${sessionId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

const updateDuration = (sessionId, duration)=>{
    const token = localStorage.getItem("token");
    return api.patch(`/api/interview/${sessionId}/duration`, { duration }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export default {getQuestions,startInterview,getInterview,getFirstQuestion,updateDuration};