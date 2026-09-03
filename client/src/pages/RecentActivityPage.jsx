import { useEffect, useState } from "react";
import {
  Terminal,
  Brain,
  CalendarDays,
  Clock3,
  CheckCircle,
  Code,
  Monitor,
  Server,
  Layers,
} from "lucide-react";

import { getRecentResults,getInterviewStats } from "../api/resultapi";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"
import Loader from "../components/Loader";


const RecentActivityPage = () => {
  const navigate = useNavigate()

  const [recentResults, setRecentResults] = useState([]);
  const [stats,setStats] = useState({
    totalInterviews:0,
    averageScore:0
  })
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadPage = async()=>{
      setLoading(true)

      try{
        await Promise.all([
          fetchRecentResults(),
          fetchStats(),
          fetchDashboard(),
        ]) 
        
      }finally{
        setLoading(false);
      }
    }

    loadPage()
  }, []);

  const fetchRecentResults = async () => {
    try {
      const res = await getRecentResults();

      setRecentResults(res.data.results || []);
    } catch (err) {
      console.log(err);
    } 
  };

  const fetchStats = async()=>{
    try{
      const res = await getInterviewStats()
      setStats(res.data)
    } catch(err){
      console.log(err)
    }

  }

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


  const getIcon = (role) => {
    switch (role) {
      case "Software Engineer":
        return Code;

      case "Frontend Developer":
        return Monitor;

      case "Backend Developer":
        return Server;

      case "Full Stack Developer":
        return Layers;

      case "Data Scientist":
        return Brain;

      default:
        return Terminal;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
  return (
    <Loader message="Loading Results..."/>
  );
}

  return (
    <div className="min-h-screen bg-[#f8f9ff]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex min-h-screen flex-col">

        {/* Top Bar */}
        <TopNavbar user={user}/>

        {/* Canvas */}
        <main className="mt-16 flex-1 bg-[#f8f9ff] p-8">

          <div className="mx-auto max-w-[1120px]">

            {/* Page Header */}
            <header className="mb-12">

              <h1 className="mb-2 text-3xl font-semibold text-[#0b1c30]">
                Recent Activity
              </h1>

              <p className="text-lg text-[#424846]">
                Review your past interview sessions and track progress.
              </p>

            </header>

            {/* Layout */}
            <div className="grid grid-cols-12 gap-6">

              {/* Activity List */}
              <div className="col-span-8">

                <div className="overflow-hidden rounded-xl border border-[#c2c8c5] bg-white">

                  {recentResults.length === 0 ? (

                    <div className="p-8 text-center">

                      <p className="text-lg font-semibold text-[#051916]">
                        No completed interviews
                      </p>

                      <p className="mt-1 text-sm text-[#424846]">
                        Complete an interview to see your results here.
                      </p>

                    </div>

                  ) : (

                    recentResults.map((item, index) => {

                      const Icon = getIcon(item.role);

                      return (
                        <div
                          key={item._id}
                          onClick={()=>navigate(`/results/${item.interviewId}`)}
                          className={`flex items-center justify-between p-6 transition-colors hover:bg-[#f8f9ff] cursor-pointer ${
                            index !== recentResults.length - 1
                              ? "border-b border-[#c2c8c5]"
                              : ""
                          }`}
                        >

                          {/* Left */}
                          <div className="flex items-start gap-4">

                            <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-lg bg-[#d3e4fe] text-[#051916]">

                              <Icon size={22} />

                            </div>

                            <div>

                              <h3 className="text-lg font-semibold text-[#0b1c30]">
                                {item.role}
                              </h3>

                              <div className="mt-1 flex items-center gap-3 text-sm text-[#424846]">

                                <span className="flex items-center gap-1">
                                  <CalendarDays size={16} />

                                  {formatDate(item.date)}
                                </span>

                                <span className="h-1 w-1 rounded-full bg-[#c2c8c5]" />

                                <span className="flex items-center gap-1">
                                  <Clock3 size={16} />

                                  {item.duration || "--"}
                                </span>

                              </div>

                              <p className="mt-1 text-sm text-[#424846]">
                                {item.interviewType}
                              </p>

                            </div>

                          </div>

                          {/* Right */}
                          <div className="flex flex-col items-end gap-2">

                            <span className="inline-flex items-center gap-1 rounded-full border border-[#c3e6cb] bg-[#e6f4ea] px-3 py-1 text-xs font-semibold text-[#1e7e34]">

                              <CheckCircle size={13} />

                              Completed

                            </span>

                            <div className="flex items-center gap-2">

                              <span className="text-sm text-[#424846]">
                                Score:
                              </span>

                              <span className="text-xl font-semibold text-[#006c49]">
                                {item.score}/100
                              </span>

                            </div>

                          </div>

                        </div>
                      );
                    })

                  )}

                </div>

              </div>

              {/* Right Column */}
              <div className="col-span-4">

                <div className="rounded-xl border border-[#c2c8c5] bg-white p-6">

                  <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#727876]">
                    Overall Stats
                  </h3>

                  <div className="space-y-5">

                    <div className="flex justify-between">

                      <span className="text-sm text-[#424846]">
                        Total Interviews
                      </span>

                      <span className="font-bold text-[#0b1c30]">
                        {stats.totalInterviews}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-sm text-[#424846]">
                        Average Score
                      </span>

                      <span className="font-bold text-[#0b1c30]">
                        {stats.averageScore}/100
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
};

export default RecentActivityPage;