import api from "./axios";

const getQuestions = ()=>{
    return api.get("/api/questions");
}

export default getQuestions;
