import React from 'react'
import { useState, useEffect } from 'react'
import interviewApi from '../api/interviewapi'
import saveAnswer from "../api/answerapi"
import { useNavigate,useParams } from 'react-router-dom'
import { generateResult } from '../api/resultapi'


const Interview = () => {

  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    if(sessionId){
      fetchQuestion();
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

  }, [currIndex])

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



  return (
    <div>
      <h2>Interview Questions</h2>
      <div>{formattedTime}</div>

      {questions.length > 0 && (
        <div>
          <div>Question {currIndex + 1}</div>
          <div>{questions[currIndex].question}</div>
          <div>{questions[currIndex].difficulty}</div>
        </div>
      )}

      <textarea rows={6} placeholder='Enter your answer here ... ' className='w-full'
        value={answers[questions[currIndex]?._id] || ""}
        onChange={(e) => setAnswers((prev) => ({
          ...prev, [questions[currIndex]._id]: e.target.value,
        }))
        }
      ></textarea>


      <div className='flex gap-10'>
        <button className='border border-black p-3'
          onClick={handlePrevious} disabled={currIndex === 0}
        >Previous</button>
        <button className='border border-black p-3'
          onClick={handleNext} disabled={currIndex === questions.length - 1}

        >Next</button>
      </div>
      {currIndex==questions.length-1 && 
        <div>
          <button className='border border-black p-3' onClick={handleSubmit} >Submit</button>
        </div>
      }

    </div>
  )
}

export default Interview
