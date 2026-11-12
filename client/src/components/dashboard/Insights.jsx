import {
  TrendingUp,
  Check,
  Brain,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import insightApi from "../../api/insightapi";
import { useNavigate } from "react-router-dom";
import EmptyState from "../EmptyState";

const Insights = () => {
  const [coreStrengths, setCoreStrengths] = useState([])
  const [focusAreas, setFocusAreas] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [basedOnInterviews, setBasedOnInterviews] = useState(0);

  useEffect(() => {
    fetchInsights();
  }, [])

  const fetchInsights = async () => {
    try {
      const res = await insightApi.getInsight()
      console.log("INSIGHT RESPONSE:", res.data);
      setCoreStrengths(res.data.coreStrengths)
      setFocusAreas(res.data.focusAreas)
      setBasedOnInterviews(res.data.basedOnInterviews);

    } catch (err) {
      setError(true);
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 md:col-span-4">

      {/* Core Strengths */}
      <div className="rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">
          <TrendingUp
            size={22}
            className="text-[#006c49] dark:text-emerald-400"
          />

          <h3 className="text-lg font-semibold text-[#051916] dark:text-zinc-100">
            Core Strengths
          </h3>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#c2c8c5] dark:border-zinc-600 border-t-[#006c49]" />
            <p className="text-sm text-[#424846] dark:text-zinc-300">
              Loading insights...
            </p>
          </div>
        ) : error ? (
          <p className="py-6 text-center text-sm text-[#424846] dark:text-zinc-300">
            Unable to load insights. Please try again later.
          </p>
        ) : coreStrengths.length === 0 ? (
          <EmptyState
            title="No strengths to show yet"
            description={
              basedOnInterviews === 0
                ? "Complete your first interview to discover your strengths."
                : "Your strengths will appear here as we learn more about your interview performance."
            }
            onAction={() => navigate("/setup")}
          />
        ) :
          (
            <ul className="space-y-3">

              {coreStrengths.map((strength, index) => (
                <li key={strength.name}
                  className={`flex items-start gap-3 ${index !== coreStrengths.length - 1
                    ? "border-b border-[#c2c8c5] dark:border-zinc-600 pb-3"
                    : ""
                    }`}
                >
                  <Check
                    size={18}
                    className="mt-0.5 text-[#006c49] dark:text-emerald-400"
                  />

                  <div>
                    <p className="font-semibold">
                      {strength.name}
                    </p>

                    <p className="mt-1 text-xs text-[#424846] dark:text-zinc-300">
                      {strength.description}
                    </p>
                  </div>

                </li>
              ))}

            </ul>
          )}
      </div>

      {/* Focus Areas */}
      <div className="rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <Brain
            size={22}
            className="text-[#424846] dark:text-zinc-300"
          />

          <h3 className="text-lg font-semibold text-[#051916] dark:text-zinc-100">
            Focus Areas
          </h3>

        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#c2c8c5] dark:border-zinc-600 border-t-[#006c49]" />
            <p className="text-sm text-[#424846] dark:text-zinc-300">
              Loading insights...
            </p>
          </div>
        ) : error ? (
          <p className="py-6 text-center text-sm text-[#424846] dark:text-zinc-300">
            Unable to load insights. Please try again later.
          </p>
        ) : focusAreas.length === 0 ? (
          <EmptyState
            title="No focus areas yet"
            description={
              basedOnInterviews === 0
                ? "Complete your first interview to discover areas where you can improve."
                : "Your focus areas will appear here as we learn more about your interview performance."
            }
            onAction={() => navigate("/setup")}
          />
        ) :
          (
            <ul className="space-y-3">

              {focusAreas.map((area, index) => (
                <li
                  key={area.name}
                  className={`flex items-start gap-3 ${index !== focusAreas.length - 1
                    ? "border-b border-[#c2c8c5] dark:border-zinc-600 pb-3"
                    : ""
                    }`}
                >
                  <ChevronRight
                    size={18}
                    className="mt-0.5 text-[#424846] dark:text-zinc-300"
                  />

                  <div>
                    <p className="font-semibold">
                      {area.name}
                    </p>

                    <p className="mt-1 text-xs text-[#424846] dark:text-zinc-300">
                      {area.description}
                    </p>
                  </div>
                </li>
              ))}

            </ul>
          )}
      </div>

    </div>
  );
};

export default Insights;