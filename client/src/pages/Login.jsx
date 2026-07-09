import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import api from '../api/axios'

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
        const res = await api.post(`/api/auth/login`,
          {
            email,
            password
          }
        );

        localStorage.setItem("token",res.data.token);

        alert(res.data.message)

        setEmail("");
        setPassword("");

        navigate("/dashboard");


      } catch(err){
        alert(err.response?.data?.message || "Something went wrong");
      }
    }

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center">
          Welcome Back
        </h1>

        <p className="text-neutral-400 text-center mt-2">
          Login to continue your interview journey
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-neutral-300">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type='submit' className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition">
            Login
          </button>
        </form>

        <p className="text-center text-neutral-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
