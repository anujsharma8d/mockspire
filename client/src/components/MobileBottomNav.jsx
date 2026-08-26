import { NavLink } from "react-router-dom";
import {
  Bot,
  LayoutDashboard,
  Video,
  ChartNoAxesColumn,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileBottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="md:hidden flex fixed left-0 bottom-0 z-50 w-screen flex-col gap-2 border-r border-[#c2c8c5] bg-[#f8f9ff] px-2 py-2">

      {/* Navigation */}
      <div className="flex gap-2 justify-between items-center">

        <NavLink
          to="/dashboard"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-2 py-2 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] text-[#00714d]"
                : "text-[#424846] hover:bg-[#e5eeff] hover:text-[#051916]"
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
                isActive? "border-2 border-[#00714d] text-[#00714d]"
                : "text-[#424846] hover:bg-[#e5eeff] hover:text-[#051916]"
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
          to="/analytics"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-2 py-2 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] text-[#00714d]"
                : "text-[#424846] hover:bg-[#e5eeff] hover:text-[#051916]"
            }`
        }
        >
            {({isActive})=>
            <div className="flex flex-col justify-center items-center">
          <ChartNoAxesColumn size={22} fill={isActive?"currentColor":"none"} />
          Analytics
            </div>
            }
        </NavLink>

        <NavLink
          to="/settings"
          className={({isActive})=>
            `flex items-center gap-3 rounded-lg px-2 py-2 font-semibold transition-colors ${
                isActive? "border-2 border-[#00714d] text-[#00714d]"
                : "text-[#424846] hover:bg-[#e5eeff] hover:text-[#051916]"
            }`
        }
        >
            {({isActive})=>
            <div className="flex flex-col justify-center items-center">
          <Settings size={22} fill={isActive?"currentColor":"none"} />
          Settings
            </div>
            }
        </NavLink>

      </div>
    </nav>
  );
};

export default MobileBottomNav;