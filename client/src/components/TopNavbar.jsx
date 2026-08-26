import {
  Bell,
  CircleHelp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({user}) => {
    const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between border-b border-[#c2c8c5] bg-[#f8f9ff] px-6">

      <h2 className="text-lg font-semibold text-[#051916]">
        Welcome back, {user?.name || "User"}
      </h2>

      <div className="flex items-center gap-4">

        <button className="rounded-full p-2 text-[#424846] hover:bg-[#eff4ff]">
          <Bell size={20} />
        </button>

        <button className="rounded-full p-2 text-[#424846] hover:bg-[#eff4ff]"
            onClick={()=>navigate("/helpcenter")}
        >
          <CircleHelp size={20} />
        </button>

        <div className="ml-2 h-8 w-8 flex justify-center items-center overflow-hidden rounded-full border border-[#c2c8c5]">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          
        </div>

      </div>
    </header>
  );
};

export default TopNavbar;