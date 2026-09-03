import { useState, useEffect } from 'react'
import { getResult } from "../api/resultapi"
import { useParams } from 'react-router-dom'
import {
  BriefcaseBusiness,
  CalendarDays,
  Timer,
  Download,
  BarChart3,
  Lightbulb,
  LayoutDashboard
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import interviewapi from '../api/interviewapi';
import Loader from '../components/Loader';

const Result = () => {
  const navigate = useNavigate()

  const [result, setResult] = useState(null)
  const { interviewId } = useParams();
  const [role, setRole] = useState(null)

  useEffect(() => {

    fetchResult()
    fetchInterviewDetails()

  }, [interviewId])

  const fetchResult = async () => {
    try {
      const res = await getResult(interviewId)
      setResult(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchInterviewDetails = async () => {
    try {
      const res = await interviewapi.getInterview(interviewId)
      setRole(res.data.interview.role)
    } catch (err) {
      console.log(err)
    }
  }

  if (!result) {
    return <Loader message="Loading Result..."/>;
  }

  const score = result.overallScore || 0;

  const formattedDate = new Date(result.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  )

  const questions = result.questions || [];

  const scoreMessage =
    score >= 80
      ? "Excellent"
      : score >= 60
        ? "Good"
        : score >= 40
          ? "Needs Improvement"
          : "Needs Work";


  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">

      <main className="mx-auto min-h-screen w-full max-w-[1120px] px-4 py-8 md:px-8 lg:px-16">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header className="mb-12 flex flex-col gap-6 border-b border-[#c2c8c5] pb-6 md:flex-row md:items-end md:justify-between">

          <div>

            <h1 className="mb-3 text-4xl font-bold tracking-tight text-[#051916]">
              Evaluation Report
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-[#424846]">

              <span className="flex items-center gap-1">
                <BriefcaseBusiness size={16} />
                {role || "Software Engineer"}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays size={16} />
                {formattedDate || "Today"}
              </span>

              <span className="flex items-center gap-1">
                <Timer size={16} />
                {result.duration || "—"}
              </span>

            </div>

          </div>

          <div className='flex flex-col justify-center items-center gap-2 '>
            <button className='flex items-center self-start gap-2 rounded border border-[#c2c8c5] bg-white px-4 py-2 text-xs font-semibold uppercase hover:border-[#006c49] hover:text-[#006c49]'
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard />
              Dashboard
            </button>

            <button
              className="flex items-center gap-2 self-start rounded border border-[#c2c8c5] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#051916] transition-colors hover:bg-[#eff4ff] md:self-auto"
            >
              <Download size={17} />
              Download PDF
            </button>
          </div>

        </header>

        {/* ================================================= */}
        {/* SCORE + SUMMARY */}
        {/* ================================================= */}

        <div className="mb-20 grid grid-cols-12 gap-6">

          {/* ================= SCORE ================= */}

          <div className="relative col-span-12 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-[#c2c8c5] bg-white p-6 shadow-sm lg:col-span-5">

            <h2 className="mb-6 w-full text-left text-2xl font-semibold text-[#051916]">
              Overall Score
            </h2>

            <div className="relative flex h-48 w-48 items-center justify-center">

              {/* Circle */}
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  d="
                    M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831
                  "
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3.8"
                />

                <path
                  d="
                    M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831
                  "
                  fill="none"
                  stroke="#ba1a1a"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  strokeDasharray={`${score * 10}, 100`}
                />
              </svg>

              {/* Score */}
              <div className="absolute flex flex-col items-center">

                <span className="text-[40px] font-bold leading-none text-[#ba1a1a]">
                  {score}
                  <span className="text-2xl text-[#424846]">
                    /100
                  </span>
                </span>

                <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#424846]">
                  {scoreMessage}
                </span>

              </div>

            </div>

          </div>

          {/* ================= SUMMARY ================= */}

          <div className="col-span-12 flex flex-col rounded-xl border border-[#c2c8c5] bg-white p-6 shadow-sm lg:col-span-7">

            <div className="mb-6 flex items-center gap-3">

              <BarChart3
                size={24}
                className="text-[#006c49]"
              />

              <h2 className="text-2xl font-semibold text-[#051916]">
                AI Executive Summary
              </h2>

            </div>

            <div className="flex-1 rounded-lg border border-[#c2c8c5]/50 bg-[#006c49]/5 p-6">

              <p className="text-base leading-6 text-[#424846]">
                {result.overallFeedback ||
                  "No summary is available for this interview."}
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* DETAILED BREAKDOWN */}
        {/* ================================================= */}

        <section>

          <h2 className="mb-6 text-3xl font-semibold text-[#051916]">
            Detailed Breakdown
          </h2>

          <div className="space-y-6">

            {questions.map((item, index) => (

              <div
                key={item._id || index}
                className="overflow-hidden rounded-xl border border-[#c2c8c5] bg-white shadow-sm"
              >

                {/* ================= QUESTION HEADER ================= */}

                <div className="flex items-start justify-between gap-4 border-b border-[#c2c8c5] bg-[#f8f9ff] p-6">

                  <div>

                    <span className="mb-3 inline-block rounded bg-[#d3e4fe] px-2 py-1 text-xs font-semibold text-[#424846]">
                      Question {index + 1}
                    </span>

                    <h3 className="text-xl font-semibold leading-7 text-[#051916]">
                      {item.question}
                    </h3>

                  </div>

                  <div className="shrink-0 rounded bg-[#ffdad6] px-4 py-2 text-xl font-bold text-[#93000a]">
                    {item.score || 0}/10
                  </div>

                </div>

                {/* ================= ANSWER + FEEDBACK ================= */}

                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

                  {/* User Answer */}

                  <div>

                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#424846]">
                      Your Answer
                    </h4>

                    <div className="min-h-[100px] rounded border border-[#c2c8c5]/50 bg-[#f8f9ff] p-4 text-sm italic leading-6 text-[#0b1c30]">
                      {item.answer
                        ? `"${item.answer}"`
                        : "No answer provided."}
                    </div>

                  </div>

                  {/* AI Feedback */}

                  <div>

                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#424846]">
                      AI Feedback
                    </h4>

                    <div className="min-h-[100px] rounded border border-[#c2c8c5]/50 bg-[#f8f9ff] p-4 text-sm leading-6 text-[#0b1c30]">
                      {item.feedback ||
                        "No feedback available."}
                    </div>

                  </div>

                </div>

                {/* ================= IDEAL APPROACH ================= */}

                <div className="border-t border-[#c2c8c5] bg-[#006c49]/5 p-6">

                  <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#006c49]">

                    <Lightbulb size={16} />

                    Ideal Answer

                  </h4>

                  <div className="space-y-2 text-sm leading-6 text-[#424846]">

                    {item.idealAnswer}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>







    // <div>
    //   <h1>Interview Result</h1>

    //   <h2>Overall Score: {result.overallScore}</h2>

    //   <p>{result.overallFeedback}</p>

    //   {result.questions.map((item, index) => (
    //     <div key={index}>
    //       <h3>{item.question}</h3>

    //       <p>
    //         <strong>Your Answer:</strong> {item.answer}
    //       </p>

    //       <p>
    //         <strong>Score:</strong> {item.score}/10
    //       </p>

    //       <p>
    //         <strong>Feedback:</strong> {item.feedback}
    //       </p>

    //       <p>
    //         <strong>Ideal Answer:</strong> {item.idealAnswer}
    //       </p>

    //       <hr />
    //     </div>
    //   ))}
    // </div>
  )
}

export default Result
