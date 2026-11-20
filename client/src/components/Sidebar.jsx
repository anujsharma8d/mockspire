import Settings from "./Settings";
import { NavLink } from "react-router-dom";
import {
  Bot,
  LayoutDashboard,
  Video,
  ChartNoAxesColumn,
  CircleHelp,
  LogOut,
  SettingsIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo"
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false)

  return (
    <nav className="hidden md:flex fixed left-0 top-0 z-50 h-screen w-64 flex-col gap-2 border-r border-[#c2c8c5] dark:border-zinc-600 bg-[#f8f9ff] dark:bg-zinc-900 px-6 py-12">

      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#006c49] dark:border-emerald-400 bg-[#dce9ff] dark:bg-zinc-700">
          <Logo size={32} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#051916] dark:text-zinc-100">
            Mockspire
          </h1>

          <p className="text-sm text-[#424846] dark:text-zinc-300">
            AI Mock Interview Platform
          </p>
        </div>
      </div>

      {/* Start Practice */}
      <button
        onClick={() => navigate("/setup")}
        className="mb-6 w-full rounded-lg bg-[#006c49] py-3 font-semibold text-white transition-all hover:opacity-90 active:scale-95"
      >
        Start Practice
      </button>

      {/* Navigation */}
      <div className="flex flex-grow flex-col gap-2">

        <NavLink
          to="/dashboard"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] dark:border-emerald-400 text-[#00714d] dark:text-emerald-400"
                : "text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
            }`
        }
        >
            {({isActive})=>
            <>
          <LayoutDashboard size={22} fill={isActive?"currentColor":"none"} />
          Home
            </>
            }
        </NavLink>

        <NavLink
          to="/setup"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] dark:border-emerald-400 text-[#00714d] dark:text-emerald-400"
                : "text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
            }`
        }
        >
            {({isActive})=>
            <>
          <Video size={22} fill={isActive?"currentColor":"none"} />
          Interview
            </>
            }
        </NavLink>

        <NavLink
          to="/recentactivity"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] dark:border-emerald-400 text-[#00714d] dark:text-emerald-400"
                : "text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
            }`
        }
        >
            {({isActive})=>
            <>
          <ChartNoAxesColumn size={22} fill={isActive?"currentColor":"none"} />
          Results
            </>
            }
        </NavLink>

      </div>


      <div className="mt-auto flex flex-col gap-1 border-t border-[#c2c8c5] dark:border-zinc-600 pt-4">
          
        <button onClick={()=>setShowPopUp(true)} className="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-colors text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100">
            <SettingsIcon size={22}/>
            Settings
          </button>

        {
          showPopUp
          && 
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 ">
            <div className="max-w-[90vw] relative rounded-xl border border-[#c2c8c5] dark:border-zinc-600 bg-white dark:bg-zinc-800 p-8 shadow-sm">
            
            <Settings />
             <button
              onClick={() => setShowPopUp(false)}
              className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow"
            >
              ✕
            </button>
            </div>
          </div>
        }

        <NavLink
          to="/faq"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-4 py-3 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] dark:border-emerald-400 text-[#00714d] dark:text-emerald-400"
                : "text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
            }`
        }
        >
            {({isActive})=>
            <>
          <CircleHelp size={22} fill={isActive?"currentColor":"none"} />
          FAQ's
            </>
            }
        </NavLink>

        <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-[#424846] dark:text-zinc-300 hover:bg-[#eff4ff] dark:hover:bg-zinc-700"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>

      </div>
    </nav>
  );
};

export default Sidebar;