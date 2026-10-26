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

import { getRecentResults, getInterviewStats } from "../api/resultapi";
import Sidebar from "../components/Sidebar";
import MobileBottomNav from "../components/MobileBottomNav";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import SEO from "../components/SEO";

const RecentActivityPage = () => {
  const navigate = useNavigate();

  const [recentResults, setRecentResults] = useState([]);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);

      try {
        await Promise.all([fetchRecentResults(), fetchStats()]);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  const fetchRecentResults = async () => {
    try {
      const res = await getRecentResults();
      setRecentResults(res.data.allresults || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getInterviewStats();
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <>
      <SEO
        title="Mockspire Recent Activity – Interview Practice History"
        description="View your recent Mockspire interview activity and revisit your interview preparation history and results."
        noindex
      />
      {loading ? (
        <Loader message="Loading Results..." />
      ) : (
        <div className="min-h-screen bg-[#f8f9ff] dark:bg-zinc-900">
          {/* Sidebar */}
          <Sidebar />
          <MobileBottomNav />

          {/* Main Content */}
          <div className="flex min-h-screen flex-col md:ml-64">
            {/* Canvas */}
            <main className="flex-1 bg-[#f8f9ff] dark:bg-zinc-900 px-4 py-6 sm:px-6 sm:py-8 md:p-8 pb-20 md:pb-8">
              <div className="mx-auto max-w-[1120px]">
                {/* Page Header */}
                <header className="mb-8 md:mb-12">
                  <h1 className="mb-2 text-2xl font-semibold text-[#0b1c30] dark:text-zinc-100 md:text-3xl">
                    Recent Activity
                  </h1>

                  <p className="text-base text-[#424846] dark:text-zinc-300 md:text-lg">
                    Review your past interview sessions and track progress.
                  </p>
                </header>

                {/* Layout */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                  {/* Activity List */}
                  <div className="md:col-span-8">
                    <div className="overflow-hidden rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800">
                      {recentResults.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-lg font-semibold text-[#051916] dark:text-zinc-100">
                            No completed interviews
                          </p>

                          <p className="mt-1 text-sm text-[#424846] dark:text-zinc-300">
                            Complete an interview to see your results here.
                          </p>
                        </div>
                      ) : (
                        recentResults.map((item, index) => {
                          const Icon = getIcon(item.role);

                          return (
                            <div
                              key={item._id}
                              onClick={() =>
                                navigate(`/results/${item.interviewId}`)
                              }
                              className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 transition-colors hover:bg-[#f8f9ff] dark:hover:bg-zinc-700 cursor-pointer ${
                                index !== recentResults.length - 1
                                  ? "border-b border-[#c2c8c5] dark:border-zinc-600"
                                  : ""
                              }`}
                            >
                              {/* Left */}
                              <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#d3e4fe] dark:bg-zinc-700 text-[#051916] dark:text-zinc-100">
                                  <Icon size={22} />
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold text-[#0b1c30] dark:text-zinc-100">
                                    {item.role}
                                  </h3>

                                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#424846] dark:text-zinc-300">
                                    <span className="flex items-center gap-1">
                                      <CalendarDays size={16} />
                                      {formatDate(item.date)}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-[#c2c8c5] dark:bg-zinc-600" />

                                    <span className="flex items-center gap-1">
                                      <Clock3 size={16} />
                                      {item.duration || "--"}
                                    </span>
                                  </div>

                                  <p className="mt-1 text-sm text-[#424846] dark:text-zinc-300">
                                    {item.interviewType}
                                  </p>
                                </div>
                              </div>

                              {/* Right */}
                              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t border-[#c2c8c5]/40 sm:border-t-0 dark:border-zinc-700">
                                <span className="inline-flex items-center gap-1 rounded-full border border-[#c3e6cb] dark:border-emerald-800 bg-[#e6f4ea] dark:bg-emerald-950 px-3 py-1 text-xs font-semibold text-[#1e7e34] dark:text-emerald-300">
                                  <CheckCircle size={13} />
                                  Completed
                                </span>

                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-[#424846] dark:text-zinc-300">
                                    Score:
                                  </span>

                                  <span className="text-xl font-semibold text-[#006c49] dark:text-emerald-400">
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
                  <div className="md:col-span-4">
                    <div className="rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-6">
                      <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#727876] dark:text-zinc-400">
                        Overall Stats
                      </h3>

                      <div className="space-y-5">
                        <div className="flex justify-between">
                          <span className="text-sm text-[#424846] dark:text-zinc-300">
                            Total Interviews
                          </span>

                          <span className="font-bold text-[#0b1c30] dark:text-zinc-100">
                            {stats.totalInterviews}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-sm text-[#424846] dark:text-zinc-300">
                            Average Score
                          </span>

                          <span className="font-bold text-[#0b1c30] dark:text-zinc-100">
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
      )}
    </>
  );
};

export default RecentActivityPage;