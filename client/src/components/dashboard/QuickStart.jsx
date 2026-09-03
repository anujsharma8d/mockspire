import { Bolt, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickStart = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-xl border border-[#c2c8c5] bg-white p-12 shadow-sm md:col-span-8">

      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6cf8bb] opacity-10 blur-3xl" />

      <div className="relative z-10 max-w-lg">

        <span className="mb-4 inline-flex items-center gap-1 rounded-full border border-[#c2c8c5] bg-[#eff4ff] px-3 py-1 text-xs font-semibold text-[#006c49]">
          <Bolt size={14} />
          Ready when you are
        </span>

        <h2 className="mb-4 text-3xl font-bold text-[#051916]">
          Master Your Next Interview
        </h2>

        <p className="mb-8 text-base leading-6 text-[#424846]">
          Select a role, configure the AI personality, and start a
          hyper-realistic practice session tailored to your target company.
        </p>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/setup")}
            className="flex items-center gap-2 rounded-lg bg-[#006c49] px-6 py-3 font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            <Play size={18} fill="white" />
            Start New Session
          </button>

        </div>

      </div>
    </div>
  );
};

export default QuickStart;