import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import api from '../api/axios'


const Signup = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await api.post("/api/auth/signup", 
        {
          name,
          email,
          password
        }
      );

      alert(res.data.message);
      setName("");
      setEmail("");
      setPassword("");

      navigate("/login")

    } catch(err){
      alert(err.response?.data?.message || "Somthing went wrong")
    }
  }


  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-neutral-400 text-center mt-2">
          Start practicing AI interviews today
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm text-neutral-300">Full Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white"
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Create a password"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white outline-none focus:border-white"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition"
          type='submit'
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-neutral-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>

    </section>
  )
}

export default Signup
