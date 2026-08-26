import {
  BriefcaseBusiness,
  Palette,
  Terminal,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    icon: BriefcaseBusiness,
    role: "Senior PM - TechCorp",
    date: "Today, 10:00 AM",
    score: "82/100",
    status: "Completed",
  },
  {
    icon: Palette,
    role: "UX Designer - StudioX",
    date: "Oct 24, 2023",
    score: "75/100",
    status: "Completed",
  },
  {
    icon: Terminal,
    role: "Frontend Eng - Startup",
    date: "Oct 20, 2023",
    score: "--",
    status: "Draft",
  },
];

const RecentActivity = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-[#c2c8c5] bg-white md:col-span-8">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#c2c8c5] bg-[#f8f9ff] p-6">

        <h3 className="text-2xl font-semibold text-[#051916]">
          Recent Activity
        </h3>

        <button className="flex items-center gap-1 font-semibold text-[#006c49]">
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

            {activities.map((item) => {

              const Icon = item.icon;

              return (
                <tr
                  key={item.role}
                  className="border-b border-[#c2c8c5] transition-colors hover:bg-[#eff4ff]"
                >

                  <td className="flex items-center gap-3 px-6 py-4 font-semibold">

                    <div className="flex h-8 w-8 items-center justify-center rounded bg-[#dce9ff]">
                      <Icon size={18} />
                    </div>

                    {item.role}

                  </td>

                  <td className="px-6 py-4 text-[#424846]">
                    {item.date}
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
            })}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default RecentActivity;