import React from 'react'
import { useState,useEffect } from 'react'
import {getResult} from "../api/resultapi"
import { useParams } from 'react-router-dom'


const Result = () => {
  const [result, setResult] = useState(null)
  const { interviewId } = useParams();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await getResult(interviewId)
        setResult(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchResult()

  }, [interviewId])

      if (!result) {
        return <h2>Loading...</h2>;
    }

  return (
    <div>
      <h1>Interview Result</h1>

      <h2>Overall Score: {result.overallScore}</h2>

      <p>{result.overallFeedback}</p>

      {result.questions.map((item, index) => (
        <div key={index}>
          <h3>{item.question}</h3>

          <p>
            <strong>Your Answer:</strong> {item.answer}
          </p>

          <p>
            <strong>Score:</strong> {item.score}/10
          </p>

          <p>
            <strong>Feedback:</strong> {item.feedback}
          </p>

          <p>
            <strong>Ideal Answer:</strong> {item.idealAnswer}
          </p>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default Result
