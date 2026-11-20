import api from "./axios";

const deleteAccount = ()=>{
    const token = localStorage.getItem("token");

    return api.delete(`/api/account`,{
        headers: { 
            Authorization: `Bearer ${token}`
          }});
}

export default deleteAccount;