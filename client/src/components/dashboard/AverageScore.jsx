import { MoreHorizontal } from "lucide-react";

const AverageScore = ({ averageScore }) => {
  const score = averageScore || 0;

  const getStatus = () => {
    if (score >= 80) return "Strong";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
  };

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  return (
    <div className="flex min-h-[300px] flex-col justify-between rounded-xl border border-[#c2c8c5] bg-white p-6 md:col-span-4">

      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-2xl font-semibold text-[#051916]">
          Average Score
        </h3>

        <button className="text-[#424846]">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center py-4">

        <div className="relative mb-4 h-40 w-40">

          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 120 120"
          >

            {/* Background */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e5eeff"
              strokeWidth="8"
            />

            {/* Progress */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#006c49"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-3xl leading-none text-[#051916]">
              {score}
            </span>

            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#006c49]">
              {getStatus()}
            </span>

          </div>

        </div>

        <p className="text-center text-sm text-[#424846]">
          Your average score across completed interviews.
        </p>

      </div>
    </div>
  );
};

export default AverageScore;