import api from "./axios";


const generateResult = ({interviewId})=>{
    const token = localStorage.getItem("token");
    return api.post(
    "/api/results",
    { interviewId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

}


const getResult = (interviewId)=>{
    const token = localStorage.getItem("token");

    return api.get(`/api/results/${interviewId}`,{
        headers: { 
            Authorization: `Bearer ${token}`
          }});
}

export {getResult,generateResult};