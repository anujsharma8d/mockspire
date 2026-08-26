import {
  TrendingUp,
  Check,
  Brain,
  ChevronRight,
} from "lucide-react";

const Insights = () => {
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

          <li className="flex items-start gap-3 border-b border-[#c2c8c5] pb-3">
            <Check
              size={18}
              className="mt-0.5 text-[#006c49]"
            />

            <div>
              <p className="font-semibold">
                STAR Method Structure
              </p>

              <p className="mt-1 text-xs text-[#424846]">
                Consistent formatting in behavioral answers.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">

            <Check
              size={18}
              className="mt-0.5 text-[#006c49]"
            />

            <div>
              <p className="font-semibold">
                Technical Depth
              </p>

              <p className="mt-1 text-xs text-[#424846]">
                Clear explanation of complex systems.
              </p>
            </div>

          </li>

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

          <li className="flex items-start gap-3 border-b border-[#c2c8c5] pb-3">

            <ChevronRight
              size={18}
              className="mt-0.5 text-[#424846]"
            />

            <div>
              <p className="font-semibold">
                Conciseness
              </p>

              <p className="mt-1 text-xs text-[#424846]">
                Answers average 45s over target duration.
              </p>
            </div>

          </li>

          <li className="flex items-start gap-3">

            <ChevronRight
              size={18}
              className="mt-0.5 text-[#424846]"
            />

            <div>
              <p className="font-semibold">
                Conflict Resolution
              </p>

              <p className="mt-1 text-xs text-[#424846]">
                Need more emphasis on positive outcomes.
              </p>
            </div>

          </li>

        </ul>
      </div>

    </div>
  );
};

export default Insights;