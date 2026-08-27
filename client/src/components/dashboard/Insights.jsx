import {
  TrendingUp,
  Check,
  Brain,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import insightApi from "../../api/insightapi";

const Insights = () => {
  const [coreStrengths, setCoreStrengths] = useState([])
  const [focusAreas, setFocusAreas] = useState([])

  useEffect(() => {
    fetchInsights();

  }, [])

  const fetchInsights = async () => {
    try {
      const res = await insightApi.getInsight()
      console.log("INSIGHT RESPONSE:", res.data);
      setCoreStrengths(res.data.coreStrengths)
      setFocusAreas(res.data.focusAreas)

    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="flex flex-col gap-6 md:col-span-4">

      {/* Core Strengths */}
      <div className="rounded-xl border border-[#c2c8c5] bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">
          <TrendingUp
            size={22}
            className="text-[#006c49]"
          />

          <h3 className="text-lg font-semibold text-[#051916]">
            Core Strengths
          </h3>
        </div>

        <ul className="space-y-3">

          {coreStrengths.map((strength, index) => (
            <li key={strength.name}
              className={`flex items-start gap-3 ${index !== coreStrengths.length - 1
                  ? "border-b border-[#c2c8c5] pb-3"
                  : ""
                }`}
            >
              <Check
                size={18}
                className="mt-0.5 text-[#006c49]"
              />

              <div>
                <p className="font-semibold">
                  {strength.name}
                </p>

                <p className="mt-1 text-xs text-[#424846]">
                  {strength.description}
                </p>
              </div>

            </li>
          ))}

        </ul>
      </div>

      {/* Focus Areas */}
      <div className="rounded-xl border border-[#c2c8c5] bg-white p-6 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <Brain
            size={22}
            className="text-[#424846]"
          />

          <h3 className="text-lg font-semibold text-[#051916]">
            Focus Areas
          </h3>

        </div>

        <ul className="space-y-3">

          {focusAreas.map((area, index) => (
            <li
              key={area.name}
              className={`flex items-start gap-3 ${index !== focusAreas.length - 1
                  ? "border-b border-[#c2c8c5] pb-3"
                  : ""
                }`}
            >
              <ChevronRight
                size={18}
                className="mt-0.5 text-[#424846]"
              />

              <div>
                <p className="font-semibold">
                  {area.name}
                </p>

                <p className="mt-1 text-xs text-[#424846]">
                  {area.description}
                </p>
              </div>
            </li>
          ))}

        </ul>
      </div>

    </div>
  );
};

export default Insights;