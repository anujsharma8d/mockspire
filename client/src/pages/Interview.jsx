import { useState, useEffect } from 'react'
import interviewApi from '../api/interviewapi'
import saveAnswer from "../api/answerapi"
import { useNavigate,useParams } from 'react-router-dom'
import { generateResult } from '../api/resultapi'
import {
  ArrowLeft,
  ArrowRight,
  Mic,
  Send,
  Timer,
} from "lucide-react";
import Logo from '../components/Logo'
import insightApi from '../api/insightapi'
import useSpeechRecognition from "../hooks/useSpeechRecognition";
import Loader from '../components/Loader'
import SEO from '../components/SEO'
import { toast } from 'react-toastify';



const Interview = () => {

  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [answers, setAnswers] = useState({})
  const [role, setRole] = useState("")
  const [interviewType, setInterviewType] = useState("")
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = questions[currIndex];

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  const fetchQuestion = async () => {
    try {
      const res = await interviewApi.getQuestions(sessionId);
      setQuestions(res.data.questions)
    } catch (err) {
      console.log(err);
    }
  }

  const fetchInterviewDetails = async () => {
    try {
      const res = await interviewApi.getInterview(sessionId)
      setRole(res.data.interview.role)
      setInterviewType(res.data.interview.interviewType)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(sessionId){
      fetchQuestion();
      fetchInterviewDetails();
    }
  }, [sessionId])

  const handleNext = () => {
    if (currIndex < questions.length - 1) {
      stopListening();
      resetTranscript()

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
    if(submitting){
      return 
    }

    try{
      setSubmitting(true)
      const formattedAnswers = Object.entries(answers).map(
        ([questionId,answer])=>({
          questionId,
          answer
        })
      )

      console.log("Sending duration:", formattedTime);

      const res = await saveAnswer({
        interviewId: sessionId,
        answers:formattedAnswers,
        duration:formattedTime
      });

      console.log("SAVE ANSWER SUCCESS:", res.data);

      await generateResult({
        interviewId: sessionId
      })

      await insightApi.generateInsight();


      toast.success(res.data.message)
      console.log(res.data.newAnswers)

      navigate(`/results/${sessionId}`)

    } catch(err){
      console.log("ERROR STATUS:", err.response?.status);
      console.log(
        "ERROR DATA:",
        JSON.stringify(err.response?.data, null, 2)
      );
      console.log("ERROR:", err);
    }finally{
      setSubmitting(false)
    }
  }

  const handleEndInterview = ()=>{
    const confirmEnd = window.confirm("Are you sure want to end the Interview?")

    if(confirmEnd){
      navigate("/dashboard")
    }
  }

  useEffect(() => {
    if (transcript) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion?._id]: transcript
      }));
    }
  }, [transcript, currIndex]);

  if (questions.length === 0) {
    return (
      <Loader message="Loading Interview..."/>
    );
  }


  const progress =
    ((currIndex + 1) / questions.length) * 100;

  const isLastQuestion =
    currIndex === questions.length - 1;



  return (
    <>
    <SEO
      title="Mockspire Interview Practice – AI-Powered Mock Interviews"
      description="Practice interview questions with Mockspire and use AI-powered feedback to review your answers and identify areas for improvement."
      noindex
    />
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-zinc-900 text-[#0b1c30] dark:text-zinc-100">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 border-b border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 sm:px-6 py-4 shadow-sm">

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#006c49] dark:border-emerald-400">
            <Logo
              size={18}
              className="text-white"
            />
          </div>

          <span className="text-base sm:text-xl font-semibold tracking-tight text-[#051916] dark:text-zinc-100">
            Mockspire
          </span>

        </div>

        <div className="hidden md:block">

          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#424846] dark:text-zinc-300">
            Live AI Interview • {role} • {interviewType}
          </h2>

        </div>

        <div className="flex justify-center items-center gap-3">

          <button
            onClick={handleEndInterview}
            className="rounded-lg border border-[#ba1a1a] dark:border-red-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#ba1a1a] dark:text-red-400 transition-colors hover:bg-[#ffdad6] dark:hover:bg-red-950"
            >
            End Interview
          </button>
          </div>

      </nav>

      <main className="mx-auto flex w-full max-w-[1440px] gap-8 p-6 pt-35 lg:pt-25">


        <section className="flex min-w-0 flex-1 flex-col gap-8">

          <div className="flex min-h-[300px] flex-col gap-6 rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-8 shadow-sm">

            <div className="flex items-start justify-between">

              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#424846] dark:text-zinc-300">
                Current Question
              </h2>

            </div>

            <div className="flex flex-1 items-center">

              <p className="text-lg font-medium leading-7 text-[#051916] dark:text-zinc-100">
                {currentQuestion.question}
              </p>

            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#c2c8c5] dark:border-zinc-600 pt-6">

              <button
                onClick={handlePrevious}
                disabled={currIndex === 0}
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-[#424846] dark:text-zinc-300 transition-colors hover:bg-[#eff4ff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft size={16} />

                Previous
              </button>

              {!isLastQuestion && (
                <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg bg-[#006c49] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4edea3] hover:text-[#051916] dark:hover:text-zinc-900"
                >
                  Next Question

                  <ArrowRight size={16} />
                </button>
              )}

            </div>

          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-8 shadow-sm">

            <label className="text-xs font-semibold uppercase tracking-wider text-[#424846] dark:text-zinc-300">
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
              className="h-32 w-full resize-none rounded-lg border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-4 text-base text-[#051916] dark:text-zinc-100 outline-none transition-all placeholder:text-[#727876] dark:placeholder:text-zinc-400 focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20"
            />
            <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                  isListening
                  ? "bg-[#ba1a1a] text-white"
                  : "bg-[#006c49] text-white"
                }`}
                >
                <Mic size={16} />

                {isListening ? "Stop" : "Speak"}
            </button>

            <div className="flex justify-end">

              {isLastQuestion && (
                <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 rounded-lg bg-[#006c49] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4edea3] hover:text-[#051916] dark:hover:text-zinc-900"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Answer
                      <Send size={16} />
                    </>
                  )}

                </button>
              )}

              {!isLastQuestion && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-lg bg-[#006c49] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4edea3] hover:text-[#051916] dark:hover:text-zinc-900"
                >
                  Save & Continue

                  <ArrowRight size={16} />
                </button>
              )}

            </div>

          </div>

        </section>

        <div className='lg:hidden flex fixed z-20 top-20 left-0 right-0 justify-between items-center border-b border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 px-5 py-3'>
          <div className='flex flex-col justify-center items-center'>

          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#006c49] dark:text-emerald-400">
                Question {currIndex + 1} of{" "}
                {questions.length}
          </span>
           <div className="h-1 w-full overflow-hidden rounded-full bg-[#eff4ff] dark:bg-zinc-700">

                <div
                  className="h-full rounded-full bg-[#006c49] transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                  />

              </div>
                  </div>
          <div className="mt-2 flex items-center justify-between">

              <span className="rounded-full border border-[#fecaca] dark:border-red-800 bg-[#fef2f2] dark:bg-red-950 px-3 py-1 text-[9px] lg:text-[11px] font-semibold uppercase tracking-wide text-[#991b1b] dark:text-red-300">
                {currentQuestion.difficulty}
              </span>

            </div>

            <div className="flex items-center gap-2 text-xs lg:text-2xl font-medium text-[#051916] dark:text-zinc-100">

              <Timer
                size={24}
                className="text-[#006c49] dark:text-emerald-400"
              />

              <span>
                {formattedTime}
              </span>
            </div>

        </div>

        <aside className="hidden w-72 shrink-0 flex-col gap-6 lg:flex">

          <div className="flex flex-col gap-4 rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-6 shadow-sm">

            <div className="flex flex-col gap-2">

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#006c49] dark:text-emerald-400">
                Question {currIndex + 1} of{" "}
                {questions.length}
              </span>

              <div className="h-1 w-full overflow-hidden rounded-full bg-[#eff4ff] dark:bg-zinc-700">

                <div
                  className="h-full rounded-full bg-[#006c49] transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                  />

              </div>


            </div>

            <div className="mt-2 flex items-center justify-between">

              <span className="text-xs font-semibold uppercase tracking-wider text-[#424846] dark:text-zinc-300">
                Difficulty
              </span>

              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                currentQuestion.difficulty === "Easy" ? "border-[#bbf7d0] dark:border-emerald-800 bg-[#f0fdf4] dark:bg-emerald-950 text-[#166534] dark:text-emerald-300"
                :currentQuestion.difficulty === "Medium" ? "border-[#fde68a] dark:border-amber-800 bg-[#fffbeb] dark:bg-amber-950 text-[#cd5910] dark:text-amber-300"
                : "border-[#fecaca] dark:border-red-800 bg-[#fef2f2] dark:bg-red-950 text-[#991b1b] dark:text-red-300"
              }`}>
                {currentQuestion.difficulty}
              </span>

            </div>

          </div>

          {/* ================= TIMER ================= */}

          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-6 shadow-sm">

            <span className="text-xs font-semibold uppercase tracking-wider text-[#424846] dark:text-zinc-300">
              Time Elapsed
            </span>

            <div className="flex items-center gap-2 text-2xl font-medium text-[#051916] dark:text-zinc-100">

              <Timer
                size={24}
                className="text-[#006c49] dark:text-emerald-400"
              />

              <span>
                {formattedTime}
              </span>

            </div>

          </div>

        </aside>

      </main>

    </div>
    </>
  );
};

export default Interview