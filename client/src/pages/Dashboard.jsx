import React,{ useState, useEffect } from 'react'
import api from '../api/axios';


const Dashboard = () => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const fetchDashboard = async ()=>{

      try{
        const token = localStorage.getItem("token")
        
        const res = await api.get("/api/auth/dashboard",{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(res.data.user);
        
      } catch(err){
        console.log(err.response?.data?.message);
      }
    }

    fetchDashboard;

  }, [])
  


  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
