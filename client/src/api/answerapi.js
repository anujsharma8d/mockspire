import api from "./axios";

const saveAnswer = (answers)=>{
    const token = localStorage.getItem("token");

    return api.post("/api/answers",{answers},{
        headers: { 
            Authorization: `Bearer ${token}`
          }});
}

export default saveAnswer;