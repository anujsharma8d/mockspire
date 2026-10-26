import api from "./axios";

const saveAnswer = ({ interviewId, answers, duration })=>{
    const token = localStorage.getItem("token");

    return api.post("/api/answers",{
        interviewId,
        answers,
        duration
    },{
        headers: { 
            Authorization: `Bearer ${token}`
          }});
}

const submitAnswer = ({ interviewId, questionId, answer })=>{
    const token = localStorage.getItem("token");

    return api.post("/api/answers/submit",{
        interviewId,
        questionId,
        answer
    },{
        headers: { 
            Authorization: `Bearer ${token}`
          }});
}

export {saveAnswer, submitAnswer};