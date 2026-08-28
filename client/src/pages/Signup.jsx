import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import {
  Rocket,
  User,
  Mail,
  Lock,
  ArrowRight,
  ChartNoAxesCombined,
  Sparkles,
} from "lucide-react";
import Logo from '../components/Logo';


const Signup = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

    } catch (err) {
      alert(err.response?.data?.message || "Somthing went wrong")
    }
  }


  return (
    <div className="min-h-screen flex w-full bg-[#f8f9ff] text-[#0b1c30] font-[Inter,sans-serif]">

      {/* =========================================
                LEFT SIDE - BRAND / VALUE PROPOSITION
            ========================================= */}
      <div className="hidden lg:flex w-1/2 bg-[#051916] relative overflow-hidden flex-col justify-between p-12">

        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">

          <Link
            to="/"
            className="flex items-center"
          >
            <Logo />

            <span className="text-2xl font-semibold text-white tracking-tight">
              Mockspire
            </span>
          </Link>

        </div>

        {/* Main Content */}

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-lg mx-auto my-auto">

          <div className="bg-[#f8f9ff]/80 backdrop-blur-md p-10 lg:p-12 rounded-xl border border-[#c2c8c5] shadow-xl">

            <h2 className="text-[32px] leading-10 font-semibold text-[#051916] mb-6">
              Master Your Next Interview.
            </h2>

            <p className="text-lg leading-7 text-[#424846] mb-10">
              Join Mockspire to practice with AI-powered interviews
              tailored to your target role, get detailed feedback,
              and improve your interview performance.
            </p>

            <ul className="space-y-6">

              {/* Personalized AI Interviews */}
              <li className="flex items-start gap-4">

                <div className="text-[#006c49] bg-[#6cf8bb] p-2 rounded-full shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>

                <div>
                  <strong className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wide block mb-1">
                    Personalized AI Interviews
                  </strong>

                  <span className="text-sm text-[#424846] block leading-6">
                    Practice with AI-generated questions tailored
                    to your selected role, interview type, and difficulty.
                  </span>
                </div>

              </li>

              {/* AI-Powered Performance Insights */}
              <li className="flex items-start gap-4">

                <div className="text-[#006c49] bg-[#6cf8bb] p-2 rounded-full shrink-0">
                  <ChartNoAxesCombined className="w-5 h-5" />
                </div>

                <div>
                  <strong className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wide block mb-1">
                    AI-Powered Performance Insights
                  </strong>

                  <span className="text-sm text-[#424846] block leading-6">
                    Get detailed feedback on your interview performance,
                    including scores, core strengths, and focus areas.
                  </span>
                </div>

              </li>

            </ul>

          </div>

        </div>
      </div>

      {/* =========================================
                RIGHT SIDE - SIGNUP FORM
            ========================================= */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-16 bg-[#f8f9ff]">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-12 lg:hidden">

            <Link
              to="/"
              className="font-semibold text-2xl text-[#051916] flex items-center gap-2"
            >
              <Logo/>

              Mockspire
            </Link>

          </div>


          {/* Heading */}
          <div className="mb-12">

            <h1 className="text-3xl md:text-[32px] leading-10 font-semibold text-[#051916] mb-1">
              Create your account
            </h1>

            <p className="text-base leading-6 text-[#424846]">
              Start your professional preparation journey today.
            </p>

          </div>


          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Full Name */}
            <div className="space-y-1">

              <label
                htmlFor="fullName"
                className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wide"
              >
                Full Name
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    size={20}
                    className="text-[#727876]"
                  />
                </div>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 bg-white border border-[#c2c8c5] rounded focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all text-[#0b1c30] placeholder:text-[#727876]"
                />

              </div>

            </div>


            {/* Email */}
            <div className="space-y-1">

              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wide"
              >
                Email
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    size={20}
                    className="text-[#727876]"
                  />
                </div>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 bg-white border border-[#c2c8c5] rounded focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all text-[#0b1c30] placeholder:text-[#727876]"
                />

              </div>

            </div>


            {/* Password */}
            <div className="space-y-1">

              <label
                htmlFor="password"
                className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wide"
              >
                Password
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    size={20}
                    className="text-[#727876]"
                  />
                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 bg-white border border-[#c2c8c5] rounded focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all text-[#0b1c30] placeholder:text-[#727876]"
                />

              </div>

              <p className="text-xs text-[#727876] mt-1">
                Must be at least 8 characters.
              </p>

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-6 rounded-lg shadow-sm font-semibold text-xs tracking-wide text-white bg-[#051916] hover:bg-[#364b46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#051916] transition-colors uppercase active:scale-95 gap-2 mt-6"
            >
              Create Account

              <ArrowRight className="w-5 h-5" />

            </button>

          </form>


          {/* Divider */}
          <div className="mt-12">

            <div className="relative">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#c2c8c5]" />
              </div>

            </div>

          </div>

          {/* Login Link */}
          <div className="mt-12 text-center">

            <p className="text-base text-[#424846]">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#006c49] hover:text-[#4edea3] transition-colors  ml-1"
              >
                Log in
              </Link>

            </p>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Signup
