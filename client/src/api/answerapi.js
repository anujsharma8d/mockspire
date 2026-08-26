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

export default saveAnswer;