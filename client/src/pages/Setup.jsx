import { useState } from 'react'
import interviewApi from "../api/interviewapi";
import { useNavigate } from "react-router-dom";

const Setup = () => {
    const navigate = useNavigate();
    const [setup, setSetup] = useState({
        interviewType:"",
        role:"",
        difficulty:"",
        questionCount:""
    })
    const selectOption = (name,value) =>{
        setSetup((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const startInterviewHandler = async()=>{
        if(!setup.difficulty || !setup.interviewType || !setup.role || !setup.questionCount){
            alert("Please select all options")
            return;
        }
        try{
            console.log("Sending setup:", setup);
            const response = await interviewApi.startInterview(setup);
            const sessionId = response.data.sessionId;
            navigate(`/interview/${sessionId}`);
        } catch(err){
            console.log(err)
        }
    }
  return (
    <section>
        <div>
            <h2>Interview Type</h2>
            <button onClick={()=>selectOption("interviewType", "Technical")} className='border p-1'>Technical</button>
            <button onClick={()=>selectOption("interviewType", "HR")} className='border p-1'>HR</button>
            <button onClick={()=>selectOption("interviewType", "Behavioral")} className='border p-1'>Behavioral</button>
            <button onClick={()=>selectOption("interviewType", "System Design")} className='border p-1'>System Design</button>
        </div>
        <div>
            <h2>Role</h2>
            <button onClick={() =>selectOption("role", "Software Engineer")} className='border p-1'>Software Engineer</button>
            <button onClick={() =>selectOption("role", "Frontend Developer")} className='border p-1'>Frontend Developer</button>
            <button onClick={() =>selectOption("role", "Backend Developer")} className='border p-1'>Backend Developer</button>
            <button onClick={() =>selectOption("role", "Full Stack Developer")} className='border p-1'>Full Stack developer</button>
            <button onClick={() =>selectOption("role", "Data Scientist")} className='border p-1'>Data Scientist</button>
        </div>
        <div>
            <h2>Difficulty</h2>
            <button onClick={() =>selectOption("difficulty", "Easy")} className='border p-1'>Easy</button>
            <button onClick={() =>selectOption("difficulty", "Medium")} className='border p-1'>Medium</button>
            <button onClick={() =>selectOption("difficulty", "Hard")} className='border p-1'>Hard</button>
        </div>
        <div>
            <h2>Number of Questions</h2>
            <button onClick={() =>selectOption("questionCount", 5)} className='border p-1'>5</button>
            <button onClick={() =>selectOption("questionCount", 10)} className='border p-1'>10</button>
            <button onClick={() =>selectOption("questionCount", 15)} className='border p-1'>15</button>
        </div>
        <div>
            <button onClick={startInterviewHandler}
                className='border p-1'
            >
                Start Interview
            </button>
        </div>
    </section>
  )
}

export default Setup
