import ThemeToggle from "../components/ThemeToggle";
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
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from "lucide-react";
import Logo from '../components/Logo';
import SEO from '../components/SEO';
import { toast } from 'react-toastify';


const Signup = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPasswordMismatch = Boolean(confirmPassword && password !== confirmPassword);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", checks: [] };

    const checks = [
      { id: "length", label: "8+ characters", met: pwd.length >= 8 },
      { id: "mixed", label: "Upper & lowercase letters", met: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) },
      { id: "number", label: "At least 1 number", met: /\d/.test(pwd) },
      { id: "symbol", label: "At least 1 symbol", met: /[^A-Za-z0-9]/.test(pwd) },
    ];

    const metCount = checks.filter((c) => c.met).length;

    let score = 1;
    let label = "Weak";

    if (pwd.length >= 8 && metCount >= 3) {
      score = metCount === 4 ? 3 : 2;
      label = metCount === 4 ? "Strong" : "Medium";
    } else if (pwd.length >= 6 && metCount >= 2) {
      score = 2;
      label = "Medium";
    }

    return { score, label, checks };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      toast.success(res.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <SEO
  title="Create Your Mockspire Account – Start Interview Practice"
  description="Create a Mockspire account to practice mock interviews, receive AI-powered feedback, and work toward your interview preparation goals."
  noindex
/>
    <div className="min-h-screen flex w-full bg-[#f8f9ff] dark:bg-slate-900 text-[#0b1c30] dark:text-slate-100 font-[Inter,sans-serif]">

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
        <div className="relative z-10 w-full max-w-lg mx-auto my-auto">

          <div className="bg-[#f8f9ff]/80 dark:bg-slate-800/80 backdrop-blur-md p-10 lg:p-12 rounded-xl border border-[#c2c8c5] dark:border-slate-600 shadow-xl">

            <h2 className="text-[32px] leading-10 font-semibold text-[#051916] dark:text-slate-100 mb-6">
              Master Your Next Interview.
            </h2>

            <p className="text-lg leading-7 text-[#424846] dark:text-slate-300 mb-10">
              Join Mockspire to practice with AI-powered interviews
              tailored to your target role, get detailed feedback,
              and improve your interview performance.
            </p>

            <ul className="space-y-6">

              {/* Personalized AI Interviews */}
              <li className="flex items-start gap-4">

                <div className="text-[#006c49] dark:text-emerald-400 bg-[#6cf8bb] dark:bg-emerald-950 p-2 rounded-full shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>

                <div>
                  <strong className="text-xs font-semibold text-[#0b1c30] dark:text-slate-100 uppercase tracking-wide block mb-1">
                    Personalized AI Interviews
                  </strong>

                  <span className="text-sm text-[#424846] dark:text-slate-300 block leading-6">
                    Practice with AI-generated questions tailored
                    to your selected role, interview type, and difficulty.
                  </span>
                </div>

              </li>

              {/* AI-Powered Performance Insights */}
              <li className="flex items-start gap-4">

                <div className="text-[#006c49] dark:text-emerald-400 bg-[#6cf8bb] dark:bg-emerald-950 p-2 rounded-full shrink-0">
                  <ChartNoAxesCombined className="w-5 h-5" />
                </div>

                <div>
                  <strong className="text-xs font-semibold text-[#0b1c30] dark:text-slate-100 uppercase tracking-wide block mb-1">
                    AI-Powered Performance Insights
                  </strong>

                  <span className="text-sm text-[#424846] dark:text-slate-300 block leading-6">
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
      <section className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-16 bg-[#f8f9ff] dark:bg-slate-900">

        <div className="w-full max-w-md">
          <div className="mb-4 flex justify-end"><ThemeToggle /></div>

          {/* Mobile Logo */}
          <div className="mb-12 lg:hidden">

            <Link
              to="/"
              className="font-semibold text-2xl text-[#051916] dark:text-slate-100 flex items-center gap-2"
              >
              <Logo/>

              Mockspire
            </Link>

          </div>


          {/* Heading */}
          <div className="mb-12">

            <h1 className="text-3xl md:text-[32px] leading-10 font-semibold text-[#051916] dark:text-slate-100 mb-1">
              Create your account
            </h1>

            <p className="text-base leading-6 text-[#424846] dark:text-slate-300">
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
                className="text-xs font-semibold text-[#0b1c30] dark:text-slate-100 uppercase tracking-wide"
                >
                Full Name
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User
                    size={20}
                    className="text-[#727876] dark:text-slate-400"
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
                  className="w-full pl-10 pr-3 py-3 bg-white dark:bg-slate-800 border border-[#c2c8c5] dark:border-slate-600 rounded focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all text-[#0b1c30] dark:text-slate-100 placeholder:text-[#727876] dark:placeholder:text-slate-400"
                  />

              </div>

            </div>


            {/* Email */}
            <div className="space-y-1">

              <label
                htmlFor="email"
                className="text-xs font-semibold text-[#0b1c30] dark:text-slate-100 uppercase tracking-wide"
                >
                Email
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    size={20}
                    className="text-[#727876] dark:text-slate-400"
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
                  className="w-full pl-10 pr-3 py-3 bg-white dark:bg-slate-800 border border-[#c2c8c5] dark:border-slate-600 rounded focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all text-[#0b1c30] dark:text-slate-100 placeholder:text-[#727876] dark:placeholder:text-slate-400"
                  />

              </div>

            </div>


            {/* Password */}
            <div className="space-y-1">

              <label
                htmlFor="password"
                className="text-xs font-semibold text-[#0b1c30] dark:text-slate-100 uppercase tracking-wide"
                >
                Password
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    size={20}
                    className="text-[#727876] dark:text-slate-400"
                    />
                </div>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  aria-describedby={password ? "password-strength-hint" : "password-hint"}
                  className="w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 border border-[#c2c8c5] dark:border-slate-600 rounded focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/20 transition-all text-[#0b1c30] dark:text-slate-100 placeholder:text-[#727876] dark:placeholder:text-slate-400"
                  />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#727876] dark:text-slate-400 hover:text-[#0b1c30] dark:hover:text-slate-100 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {!password ? (
                <p id="password-hint" className="text-xs text-[#727876] dark:text-slate-400 mt-1">
                  Suggested: 8+ characters with a mix of letters, numbers, or symbols.
                </p>
              ) : (
                <div id="password-strength-hint" className="mt-2 space-y-1.5" aria-live="polite">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#424846] dark:text-slate-300">
                      Password strength: <span className="font-semibold text-[#0b1c30] dark:text-slate-100">{strength.label}</span>
                    </span>
                    <span className="text-[11px] text-[#727876] dark:text-slate-400">
                      {strength.label === "Weak" && "Mix case, numbers, or symbols"}
                      {strength.label === "Medium" && "Good password"}
                      {strength.label === "Strong" && "Strong password"}
                    </span>
                  </div>

                  {/* Multi-segment strength bar */}
                  <div className="w-full bg-[#e2e8e5] dark:bg-slate-700 h-1.5 rounded-full overflow-hidden flex gap-1">
                    <div
                      className={`h-full flex-1 rounded-full transition-all duration-300 ${
                        strength.score >= 1
                          ? strength.score === 1
                            ? "bg-amber-500"
                            : strength.score === 2
                            ? "bg-blue-500"
                            : "bg-emerald-600"
                          : "bg-transparent"
                      }`}
                    />
                    <div
                      className={`h-full flex-1 rounded-full transition-all duration-300 ${
                        strength.score >= 2
                          ? strength.score === 2
                            ? "bg-blue-500"
                            : "bg-emerald-600"
                          : "bg-transparent"
                      }`}
                    />
                    <div
                      className={`h-full flex-1 rounded-full transition-all duration-300 ${
                        strength.score >= 3 ? "bg-emerald-600" : "bg-transparent"
                      }`}
                    />
                  </div>

                  {/* Accessible checklist: text + check icon ensures not color alone */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1 text-[11px]">
                    {strength.checks.map((check) => (
                      <div
                        key={check.id}
                        className={`flex items-center gap-1.5 ${
                          check.met
                            ? "text-emerald-700 dark:text-emerald-400 font-medium"
                            : "text-[#727876] dark:text-slate-400"
                        }`}
                      >
                        {check.met ? (
                          <Check size={12} className="shrink-0 stroke-[2.5]" aria-hidden="true" />
                        ) : (
                          <span className="w-3 h-3 rounded-full border border-current inline-block shrink-0" aria-hidden="true" />
                        )}
                        <span>{check.label}</span>
                        <span className="sr-only">{check.met ? "(met)" : "(not met)"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Confirm Password */}
            <div className="space-y-1">

              <label
                htmlFor="confirmPassword"
                className="text-xs font-semibold text-[#0b1c30] dark:text-slate-100 uppercase tracking-wide"
                >
                Confirm Password
              </label>

              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    size={20}
                    className="text-[#727876] dark:text-slate-400"
                    />
                </div>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-describedby={
                    isPasswordMismatch
                      ? "confirm-password-error"
                      : confirmPassword && !isPasswordMismatch
                      ? "confirm-password-match"
                      : undefined
                  }
                  className={`w-full pl-10 pr-10 py-3 bg-white dark:bg-slate-800 border ${
                    isPasswordMismatch
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[#c2c8c5] dark:border-slate-600 focus:border-[#006c49] focus:ring-[#006c49]/20"
                  } rounded focus:outline-none focus:ring-2 transition-all text-[#0b1c30] dark:text-slate-100 placeholder:text-[#727876] dark:placeholder:text-slate-400`}
                  />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#727876] dark:text-slate-400 hover:text-[#0b1c30] dark:hover:text-slate-100 focus:outline-none transition-colors"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {isPasswordMismatch && (
                <p
                  id="confirm-password-error"
                  role="alert"
                  className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center gap-1 font-medium"
                >
                  <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
                  Passwords do not match.
                </p>
              )}

              {confirmPassword && !isPasswordMismatch && (
                <p
                  id="confirm-password-match"
                  className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium"
                >
                  <Check size={14} className="shrink-0" aria-hidden="true" />
                  Passwords match.
                </p>
              )}

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isPasswordMismatch}
              className={`w-full flex justify-center items-center py-3 px-6 rounded-lg shadow-sm font-semibold text-xs tracking-wide text-white transition-colors uppercase gap-2 mt-6 ${
                loading || isPasswordMismatch
                  ? "bg-[#051916]/60 dark:bg-slate-700 cursor-not-allowed"
                  : "bg-[#051916] hover:bg-[#364b46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#051916] active:scale-95"
              }`}
              >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Account...
                </>
              ) : (
                <>
                Create Account
                <ArrowRight className="w-5 h-5" />
                </>
              ) 
            }


            </button>

          </form>


          {/* Divider */}
          <div className="mt-12">

            <div className="relative">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#c2c8c5] dark:border-slate-600" />
              </div>

            </div>

          </div>

          {/* Login Link */}
          <div className="mt-12 text-center">

            <p className="text-base text-[#424846] dark:text-slate-300">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#006c49] dark:text-emerald-400 hover:text-[#4edea3] transition-colors  ml-1"
                >
                Log in
              </Link>

            </p>

          </div>

        </div>

      </section>

    </div>
                </>
  )
}

export default Signup
