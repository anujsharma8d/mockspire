import api from "./axios";

const saveAnswer = ({ interviewId, answers })=>{
    const token = localStorage.getItem("token");

    return api.post("/api/answers",{
        interviewId,
        answers
    },{
        headers: { 
            Authorization: `Bearer ${token}`
          }});
}

export default saveAnswer;