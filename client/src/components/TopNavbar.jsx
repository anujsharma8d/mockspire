import {CircleHelp, LogOut} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TopNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between border-b border-[#c2c8c5] bg-[#f8f9ff] px-6">

      <h2 className="text-lg font-semibold text-[#051916]">
        Welcome back, {user?.name || "User"}
      </h2>

      <div className="flex items-center gap-4">

        <button className="rounded-full p-2 text-[#424846] hover:bg-[#eff4ff]"
          onClick={() => navigate("/faq")}
        >
          <CircleHelp size={20} />
        </button>

        <div className="relative">
  <button
    type="button"
    onClick={() => setProfileOpen((prev) => !prev)}
    className="ml-2 h-8 w-8 flex items-center justify-center overflow-hidden rounded-full border border-[#c2c8c5] bg-white text-sm font-semibold text-[#051916] hover:bg-[#eff4ff] transition-colors"
  >
    {user?.name?.charAt(0).toUpperCase() || "U"}
  </button>

  {profileOpen && (
    <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-[#c2c8c5] bg-white shadow-lg">

      {/* User Info */}
      <div className="border-b border-[#e5e7e6] px-4 py-3">
        <p className="text-sm font-semibold text-[#051916]">
          {user?.name || "User"}
        </p>

        <p className="mt-1 truncate text-xs text-[#727876]">
          {user?.email || "No email available"}
        </p>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("token");
          setProfileOpen(false);
          navigate("/login");
        }}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>

    </div>
  )}
</div>

      </div>
    </header>
  );
};

export default TopNavbar;