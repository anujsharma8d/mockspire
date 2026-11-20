import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Video,
  ChartNoAxesColumn,
  SettingsIcon,
} from "lucide-react";
import Settings from "./Settings";

const MobileBottomNav = () => {
  const [showPopUp, setShowPopUp] = useState(false)

  return (
    <nav className="md:hidden flex fixed left-0 bottom-0 z-50 w-screen flex-col gap-2 border-r border-[#c2c8c5] dark:border-zinc-600 bg-[#f8f9ff] dark:bg-zinc-900 px-2 py-2">

      {/* Navigation */}
      <div className="flex gap-2 justify-between items-center">

        <NavLink
          to="/dashboard"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-2 py-2 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] dark:border-emerald-400 text-[#00714d] dark:text-emerald-400"
                : "text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
            }`
        }
        >
            {({isActive})=>
            <div className="flex flex-col justify-center items-center">
          <LayoutDashboard size={22} fill={isActive?"currentColor":"none"} />
          Home
            </div>
            }
        </NavLink>

        <NavLink
          to="/setup"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-2 py-2 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] dark:border-emerald-400 text-[#00714d] dark:text-emerald-400"
                : "text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
            }`
        }
        >
            {({isActive})=>
            <div className="flex flex-col justify-center items-center">
          <Video size={22} fill={isActive?"currentColor":"none"} />
          Interview
            </div>
            }
        </NavLink>

        <NavLink
          to="/recentactivity"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-2 py-2 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] dark:border-emerald-400 text-[#00714d] dark:text-emerald-400"
                : "text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
            }`
        }
        >
            {({isActive})=>
            <div className="flex flex-col justify-center items-center">
          <ChartNoAxesColumn size={22} fill={isActive?"currentColor":"none"} />
          Results
            </div>
            }
        </NavLink>

        <button
          onClick={()=> setShowPopUp(true)}
          className= "flex items-center gap-3 rounded-lg px-2 py-2 font-semibold transition-colors text-[#424846] dark:text-zinc-300 hover:bg-[#e5eeff] dark:hover:bg-zinc-700 hover:text-[#051916] dark:hover:text-zinc-100"
        >
            <div className="flex flex-col justify-center items-center">
          <SettingsIcon size={22} />
          Settings
            </div>
            
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

      </div>
    </nav>
  );
};

export default MobileBottomNav;