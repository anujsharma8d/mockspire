import api from "./axios";

const generateInsight = ()=>{
    const token = localStorage.getItem("token");

    return api.post(`/api/insights/generate`,{}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const getInsight = ()=>{
    const token = localStorage.getItem("token");

    return api.get(`/api/insights`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export default { generateInsight, getInsight };