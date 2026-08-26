import { useState, useEffect } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import QuickStart from "../components/dashboard/QuickStart";
import AverageScore from "../components/dashboard/AverageScore";
import RecentActivity from "../components/dashboard/RecentActivity";
import Insights from "../components/dashboard/Insights";
import MobileBottomNav from '../components/MobileBottomNav';
import { getInterviewStats } from '../api/resultapi';


const Dashboard = () => {
  const navigate = useNavigate()
  
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalInterviews:0,
    averageScore:0
  });

  useEffect(() => {

    fetchDashboard();
    fetchStats();
    
  }, [])

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

  const fetchStats = async()=>{
    try{
      const res = await getInterviewStats()
      setStats(res.data)
    } catch(err){
      console.log(err)
    }

  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f9ff] font-[Inter] text-[#0b1c30]">

      {/* Sidebar */}
      <Sidebar />
      <MobileBottomNav />

      {/* Main */}
      <main className="relative flex h-full flex-1 flex-col md:ml-64 pb-10 md:pb-0">

        <TopNavbar user={user}/>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-4 md:p-6">

          <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-6 md:grid-cols-12">

            {/* Top */}
            <QuickStart />

            <AverageScore averageScore={stats.averageScore}/>

            {/* Bottom */}
            <RecentActivity />

            <Insights />

          </div>

          <div className="h-12 w-full" />

        </div>

      </main>

    </div>
  )
}

export default Dashboard
