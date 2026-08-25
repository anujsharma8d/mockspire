import React,{ useState, useEffect } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate()
  
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
      <div>
        Dashboard
      </div>
      <div>
        <button className='border p-1' onClick={()=>navigate("/setup")}>Start Interview</button>
      </div>
    </div>
  )
}

export default Dashboard
