import { X } from "lucide-react";
import logo from "../../../assets/images/logos/logo.png";
import homeicon from "../../../assets/images/dashboard/sidebar/homeicon.png";
import projecticon from "../../../assets/images/dashboard/sidebar/projecticon.png";
import brandicon from "../../../assets/images/dashboard/sidebar/brandicon.png";
import { Link, NavLink } from "react-router";
import { useActiveStatusQuery } from "../../../features/auth/authApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const Sidebar = ({ setIsOpen, isOpen }: any) => {
  const videoGenerate = useSelector((state: RootState) => state.video.loading);

  const { data, isLoading, isError, refetch } = useActiveStatusQuery();

  useEffect(() => {
    if (videoGenerate) {
      refetch();
    }
  }, [videoGenerate, refetch]);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`bg-black text-white w-64 h-screen border-r border-gray-700 fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:block`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard">
            <img src={logo} alt="Logo" className="w-24" />
          </Link>
          <button onClick={toggleSidebar} className="md:hidden cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top Navigation */}
        <nav className="flex flex-col gap-2 flex-grow">
          {[
            { to: "/dashboard/home", icon: homeicon, label: "Home" },
            { to: "/dashboard/brand-template", icon: brandicon, label: "Brand Template" },
            { to: "/dashboard/project-history", icon: projecticon, label: "Project History" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 transition-colors ${isActive ? "bg-[#27272A]" : ""
                }`
              }
            >
              <img src={item.icon} alt={`${item.label} Icon`} className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-gray-700">

          <NavLink
            to="/dashboard/subscription"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 transition-colors ${isActive ? "bg-[#27272A]" : ""
              }`
            }
          >
            <img src={homeicon} alt="Subscription Icon" className="w-5 h-5" />
            Subscription
          </NavLink>

          {/* 🔹 Active Subscription Card */}
          <div className=" border border-gray-700 rounded-xl p-4 text-sm shadow-lg mt-2">
            {isLoading && (
              <p className="text-gray-400 animate-pulse text-center">Loading subscription...</p>
            )}

            {isError || !data ? (
              <p className="text-gray-500 text-center">No active subscription</p>
            ) : (
              <div className="space-y-2">
                {/* Plan Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Plan</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${data.plan === "FREE"
                        ? "bg-gray-700 text-gray-200"
                        : data.plan === "PRO"
                          ? "bg-blue-600 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                  >
                    {data.plan}
                  </span>
                </div>

                {/* Credits */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Credits</span>
                  <span className="text-white font-semibold">{data.credits}</span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Status</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${data.status === "Active"
                        ? "bg-green-600 text-white"
                        : "bg-red-500 text-white"
                      }`}
                  >
                    {data.status}
                  </span>
                </div>

                {/* Billing Cycle */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">Billing Cycle</span>
                  <span className="text-white font-semibold">{data.billingCycle}</span>
                </div>

                {/* Current Period */}
                <div className="text-gray-400 text-xs mt-2">
                  Current Period:{" "}
                  {new Date(data.currentPeriodStart).toLocaleDateString()} -{" "}
                  {new Date(data.currentPeriodEnd).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
