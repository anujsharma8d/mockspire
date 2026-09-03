import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import api from '../api/axios'
import {
    Mail,
    Lock,
    Rocket,
} from "lucide-react";
import Logo from '../components/Logo';


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
        setLoading(true);

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
      } finally{
        setLoading(false)
      }
    }

  return (
    <div className="min-h-screen flex w-full bg-[#f8f9ff] text-[#0b1c30] font-[Inter,sans-serif]">

            {/* =========================================
                LEFT SIDE - LOGIN FORM
            ========================================= */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-16 bg-[#f8f9ff]">

                <div className="w-full max-w-md">

                    {/* Mobile Logo */}
                    <div className="lg:hidden mb-12 flex justify-center">
                        <Link
                            to="/"
                            className="flex items-center gap-2"
                        >
                            <Rocket
                                className="text-[#006c49]"
                                size={32}
                                fill="currentColor"
                            />

                            <span className="text-2xl font-semibold text-[#051916] tracking-tight">
                                Mockspire
                            </span>
                        </Link>
                    </div>

                    {/* Heading */}
                    <div className="mb-12 text-center lg:text-left">

                        <h1 className="text-3xl md:text-[32px] leading-10 font-semibold text-[#0b1c30] mb-1">
                            Welcome back
                        </h1>

                        <p className="text-base leading-6 text-[#424846]">
                            Sign in to your account to continue your preparation.
                        </p>

                    </div>

                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Email */}
                        <div>

                            <label
                                htmlFor="email"
                                className="block text-xs leading-4 tracking-wide font-semibold text-[#424846] mb-1"
                            >
                                Email Address
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
                                    autoComplete="email"
                                    placeholder="you@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-[#c2c8c5] rounded-sm text-[#0b1c30] placeholder-[#727876] bg-white focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <div className="flex items-center justify-between mb-1">

                                <label
                                    htmlFor="password"
                                    className="block text-xs leading-4 tracking-wide font-semibold text-[#424846]"
                                >
                                    Password
                                </label>

                            </div>

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
                                    type={"password"}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-3 border border-[#c2c8c5] rounded-sm text-[#0b1c30] placeholder-[#727876] bg-white focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all"
                                />

                            </div>

                        </div>

                        {/* Sign In */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 rounded-sm font-semibold text-xs tracking-wide text-white bg-[#051916] hover:bg-[#364b46] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#051916] active:scale-[0.98]"
                        >
                            {loading ? (
                                    <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Signing in...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
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

                    {/* Signup */}
                    <p className="mt-12 text-center text-sm text-[#424846]">

                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="font-semibold text-[#006c49] hover:text-[#4edea3] transition-colors underline decoration-[#006c49]/30 hover:decoration-[#006c49]"
                        >
                            Sign up
                        </Link>

                    </p>

                </div>
            </div>


            {/* =========================================
                RIGHT SIDE - BRAND VISUAL
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
                        className="flex items-center "
                    >
                        <Logo/>

                        <span className="text-2xl font-semibold text-white tracking-tight">
                            Mockspire
                        </span>
                    </Link>

                </div>

                {/* Main Content */}
                <div className="relative z-10 max-w-md mx-auto my-auto text-white">

                    <div className="mb-12">

                        <h2 className="text-[32px] leading-10 font-semibold mb-6">
                            Master Your Next Big Role.
                        </h2>

                        <p className="text-lg leading-7 text-[#b5cbc5]">
                            Practice with industry-specific AI personas,
                            get actionable feedback, and walk into your next
                            interview with quiet confidence.
                        </p>

                    </div>

                </div>

                {/* Footer */}
                <div className="relative z-10 text-[#b5cbc5] text-sm flex justify-between">

                    <span>
                        © 2026 Mockspire
                    </span>


                </div>

            </div>

        </div>
  )
}

export default Login
