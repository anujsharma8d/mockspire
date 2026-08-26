import { MoreHorizontal } from "lucide-react";

const ReadinessScore = () => {
  return (
    <div className="flex min-h-[300px] flex-col justify-between rounded-xl border border-[#c2c8c5] bg-white p-6 md:col-span-4">

      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-2xl font-semibold text-[#051916]">
          Readiness Score
        </h3>

        <button className="text-[#424846]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-4">

        <div className="relative mb-4 h-32 w-32">

          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5eeff"
              strokeWidth="8"
            />

            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#006c49"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset="62"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-3xl leading-none text-[#051916]">
              78
            </span>

            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#006c49]">
              Strong
            </span>

          </div>
        </div>

        <p className="text-center text-sm text-[#424846]">
          Top 15% of candidates for{" "}
          <strong>Product Manager</strong> roles.
        </p>

      </div>
    </div>
  );
};

export default ReadinessScore;