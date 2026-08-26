import { useState, useEffect } from 'react'
import interviewApi from '../api/interviewapi'
import saveAnswer from "../api/answerapi"
import { useNavigate,useParams } from 'react-router-dom'
import { generateResult } from '../api/resultapi'
import {
  ArrowLeft,
  ArrowRight,
  Send,
  Timer,
} from "lucide-react";
import Logo from '../components/Logo'



const Interview = () => {

  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [answers, setAnswers] = useState({})
  const [role, setRole] = useState("")
  const [interviewType, setInterviewType] = useState("")

  useEffect(() => {
    if(sessionId){
      fetchQuestion();
      fetchInterviewDetails();
    }
  }, [sessionId])

  const fetchQuestion = async () => {

    try {
      const res = await interviewApi.getQuestions(sessionId);

      setQuestions(res.data.questions)

    } catch (err) {
      console.log(err);
    }

  }

  const fetchInterviewDetails = async()=>{
    try{
      const res = await interviewApi.getInterview(sessionId)

      setRole(res.data.interview.role)
      setInterviewType(res.data.interview.interviewType)

    }catch(err){
      console.log(err)
    }
  }

  const handleNext = () => {
    if (currIndex < questions.length - 1) {
      setCurrIndex(currIndex => currIndex + 1)
    }
  }
  const handlePrevious = () => {
    if (currIndex > 0) {
      setCurrIndex(currIndex => currIndex - 1)
    }
  }

  useEffect(() => {
    setSeconds(0)

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000);

    return () => clearInterval(interval)

  }, [])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`


  const handleSubmit = async ()=>{
    try{
      const formattedAnswers = Object.entries(answers).map(
        ([questionId,answer])=>({
          questionId,
          answer
        })
      )

      const res = await saveAnswer({
        interviewId: sessionId,
        answers:formattedAnswers
      });

      await generateResult({
        interviewId: sessionId
      })


      alert(res.data.message)
      console.log(res.data.newAnswers)

      navigate(`/results/${sessionId}`)

    } catch(err){
      console.log(err)
    }
  }

  const handleEndInterview = ()=>{
    const confirmEnd = window.confirm("Are you sure want to end the Interview?")

    if(confirmEnd){
      navigate("/dashboard")
    }
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9ff]">
        <p className="text-sm text-[#424846]">
          Loading interview...
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currIndex];

  const progress =
    ((currIndex + 1) / questions.length) * 100;

  const isLastQuestion =
    currIndex === questions.length - 1;



  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-[#c2c8c5] bg-white px-6 py-4 shadow-sm">

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#006c49]">
            <Logo
              size={18}
              className="text-white"
            />
          </div>

          <span className="text-xl font-semibold tracking-tight text-[#051916]">
            Mockspire
          </span>

        </div>

        <div className="hidden md:block">

          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#424846]">
            Live AI Interview • {role} • {interviewType}
          </h2>

        </div>

        <button
          onClick={handleEndInterview}
          className="rounded-lg border border-[#ba1a1a] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#ba1a1a] transition-colors hover:bg-[#ffdad6]"
        >
          End Interview
        </button>

      </nav>

      <main className="mx-auto flex w-full max-w-[1440px] gap-8 p-6 pt-30 lg:pt-20">


        <section className="flex min-w-0 flex-1 flex-col gap-8">

          <div className="flex min-h-[300px] flex-col gap-6 rounded-xl border border-[#c2c8c5] bg-white p-8 shadow-sm">

            <div className="flex items-start justify-between">

              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#424846]">
                Current Question
              </h2>

            </div>

            <div className="flex flex-1 items-center">

              <p className="text-lg font-medium leading-7 text-[#051916]">
                {currentQuestion.question}
              </p>

            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#c2c8c5] pt-6">

              <button
                onClick={handlePrevious}
                disabled={currIndex === 0}
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-[#424846] transition-colors hover:bg-[#eff4ff] hover:text-[#051916] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={16} />

                Previous
              </button>

              {!isLastQuestion && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-lg bg-[#006c49] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4edea3] hover:text-[#051916]"
                >
                  Next Question

                  <ArrowRight size={16} />
                </button>
              )}

            </div>

          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#c2c8c5] bg-white p-8 shadow-sm">

            <label className="text-xs font-semibold uppercase tracking-wider text-[#424846]">
              Your Answer
            </label>

            <textarea
              value={
                answers[currentQuestion._id] || ""
              }
              onChange={(e) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion._id]:
                    e.target.value,
                }))
              }
              placeholder="Type your detailed response here..."
              className="h-32 w-full resize-none rounded-lg border border-[#c2c8c5] bg-white p-4 text-base text-[#051916] outline-none transition-all placeholder:text-[#727876] focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20"
            />

            <div className="flex justify-end">

              {isLastQuestion && (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 rounded-lg bg-[#006c49] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4edea3] hover:text-[#051916]"
                >
                  Submit Answer

                  <Send size={16} />
                </button>
              )}

              {!isLastQuestion && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-lg bg-[#006c49] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4edea3] hover:text-[#051916]"
                >
                  Save & Continue

                  <ArrowRight size={16} />
                </button>
              )}

            </div>

          </div>

        </section>

        <div className='lg:hidden flex fixed z-20 top-15 left-0 right-0 justify-between items-center border-b border-[#c2c8c5] bg-white px-5 py-3'>
          <div className='flex flex-col justify-center items-center'>

          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#006c49]">
                Question {currIndex + 1} of{" "}
                {questions.length}
          </span>
           <div className="h-1 w-full overflow-hidden rounded-full bg-[#eff4ff]">

                <div
                  className="h-full rounded-full bg-[#006c49] transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                  />

              </div>
                  </div>
          <div className="mt-2 flex items-center justify-between">

              <span className="rounded-full border border-[#fecaca] bg-[#fef2f2] px-3 py-1 text-[9px] lg:text-[11px] font-semibold uppercase tracking-wide text-[#991b1b]">
                {currentQuestion.difficulty}
              </span>

            </div>

            <div className="flex items-center gap-2 text-xs lg:text-2xl font-medium text-[#051916]">

              <Timer
                size={24}
                className="text-[#006c49]"
              />

              <span>
                {formattedTime}
              </span>
            </div>

        </div>

        <aside className="hidden w-72 shrink-0 flex-col gap-6 lg:flex">

          <div className="flex flex-col gap-4 rounded-xl border border-[#c2c8c5] bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-2">

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#006c49]">
                Question {currIndex + 1} of{" "}
                {questions.length}
              </span>

              <div className="h-1 w-full overflow-hidden rounded-full bg-[#eff4ff]">

                <div
                  className="h-full rounded-full bg-[#006c49] transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>
              

            </div>

            <div className="mt-2 flex items-center justify-between">

              <span className="text-xs font-semibold uppercase tracking-wider text-[#424846]">
                Difficulty
              </span>

              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                currentQuestion.difficulty === "Easy" ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#166534]"
                :currentQuestion.difficulty === "Medium" ? "border-[#fde68a] bg-[#fffbeb] text-[#cd5910]"
                : "border-[#fecaca] bg-[#fef2f2] text-[#991b1b]"
              }`}>
                {currentQuestion.difficulty}
              </span>

            </div>

          </div>

          {/* ================= TIMER ================= */}

          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#c2c8c5] bg-white p-6 shadow-sm">

            <span className="text-xs font-semibold uppercase tracking-wider text-[#424846]">
              Time Elapsed
            </span>

            <div className="flex items-center gap-2 text-2xl font-medium text-[#051916]">

              <Timer
                size={24}
                className="text-[#006c49]"
              />

              <span>
                {formattedTime}
              </span>

            </div>

          </div>

        </aside>

      </main>

    </div>
  );
};

export default Interview
