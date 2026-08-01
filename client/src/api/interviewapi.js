import api from "./axios";

const getQuestions = () => {
    const token = localStorage.getItem("token");

    return api.get("/api/questions", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default getQuestions;