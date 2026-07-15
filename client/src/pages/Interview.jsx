import React from 'react'
import { useState,useEffect } from 'react'
import getQuestions from '../api/interviewapi'


const Interview = () => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestion();
  }, [])

  const fetchQuestion = async()=>{

    try{
      const res = await getQuestions();

      console.log(res.data)
      setQuestions(res.data)
    } catch(err){
      console.log(err);
    }

  }
  
  return (
    <div>
      <h2>Interview Questions</h2>
      {
        questions.map((q)=>(
          <div key={q._id}>
            <h3>{q.question}</h3>
            <p>{q.difficulty}</p>
          </div>
        ))
      }

    </div>
  )
}

export default Interview
