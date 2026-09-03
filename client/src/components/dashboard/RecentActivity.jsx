import {
  Terminal,
  CheckCircle,
  Clock,
  ArrowRight,
  Code,
  Monitor,
  Server,
  Layers,
  Brain,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getRecentResults } from "../../api/resultapi"
import { useNavigate } from "react-router-dom";

const RecentActivity = () => {

  const navigate = useNavigate()

  const [recentResults, setRecentResults] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentResults()
  }, [])


  const fetchRecentResults = async () => {
    try {

      const res = await getRecentResults();

      console.log(res)
      setRecentResults(res.data.results || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
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


  return (
    <div className="overflow-hidden rounded-xl border border-[#c2c8c5] bg-white md:col-span-8">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#c2c8c5] bg-[#f8f9ff] p-6">

        <h3 className="text-2xl font-semibold text-[#051916]">
          Recent Activity
        </h3>

        <button className="flex items-center gap-1 font-semibold text-[#006c49]"
          onClick={() => navigate("/recentactivity")}
        >
          View All
          <ArrowRight size={16} />
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse text-left">

          <thead>
            <tr className="border-b border-[#c2c8c5] bg-[#eff4ff] text-xs uppercase text-[#424846]">

              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3">Status</th>

            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-10">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#c2c8c5] border-t-[#006c49]" />

                    <p className="text-sm font-medium text-[#424846]">
                      Loading recent activity...
                    </p>
                  </div>
                </td>
              </tr>
            ) : recentResults.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-sm text-[#424846]"
                >
                  No recent interviews found.
                </td>
              </tr>
            ) :
              (
                recentResults.map((item) => {

                  const Icon = getIcon(item.role);
                  return (
                    <tr
                      key={item._id}
                      className="border-b border-[#c2c8c5] transition-colors hover:bg-[#eff4ff]"
                    >

                      <td className="flex items-center gap-3 px-6 py-4 font-semibold">

                        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#dce9ff]">
                          <Icon size={22} />
                        </div>

                        {item.role}

                      </td>

                      <td className="px-6 py-4 text-[#424846]">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-6 py-4 font-semibold">
                        {item.score}
                      </td>

                      <td className="px-6 py-4">

                        {item.status === "Completed" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#d0e7e1] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#005236]">
                            <CheckCircle size={12} />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#d3e4fe] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0b1c30]">
                            <Clock size={12} />
                            Draft
                          </span>
                        )}

                      </td>

                    </tr>
                  );
                }))
                }

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default RecentActivity;