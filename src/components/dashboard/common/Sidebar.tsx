import { Menu, X } from "lucide-react";
import logo from "../../../assets/images/logos/logo.png";
import homeicon from "../../../assets/images/dashboard/sidebar/homeicon.png";
import projecticon from "../../../assets/images/dashboard/sidebar/projecticon.png";
import brandicon from "../../../assets/images/dashboard/sidebar/brandicon.png";
import asseticon from "../../../assets/images/dashboard/sidebar/asseticon.png";
import { NavLink } from "react-router";

const Sidebar = ({ setIsOpen, isOpen }: any) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-black text-white w-64 h-screen border-r border-gray-700 fixed top-0 left-0 z-40 transform transition-transform md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:block`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between mb-6">
          <img src={logo} alt="Logo" className="w-24" />
          <button
            onClick={toggleSidebar}
            className="md:hidden cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Top Nav */}
        <nav className="flex flex-col gap-2 flex-grow">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 ${
                isActive ? "bg-[#27272A]" : ""
              }`
            }
          >
            <img src={homeicon} alt="Home Icon" className="w-5 h-5" />
            Home
          </NavLink>
          <NavLink
            to="/dashboard/brand-template"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 ${
                isActive ? "bg-[#27272A]" : ""
              }`
            }
          >
            <img src={brandicon} alt="Brand Icon" className="w-5 h-5" />
            Brand Template
          </NavLink>
          <NavLink
            to="/dashboard/asset-library"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 ${
                isActive ? "bg-[#27272A]" : ""
              }`
            }
          >
            <img src={asseticon} alt="Asset Icon" className="w-5 h-5" />
            Asset Library
          </NavLink>
          <NavLink
            to="/dashboard/project-history"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 ${
                isActive ? "bg-[#27272A]" : ""
              }`
            }
          >
            <img src={projecticon} alt="Project Icon" className="w-5 h-5" />
            Project History
          </NavLink>
        </nav>

        {/* Bottom Nav - Sticky at bottom */}
        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-gray-700">
          <NavLink
            to="/dashboard/subscription"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 ${
                isActive ? "bg-[#27272A]" : ""
              }`
            }
          >
            <img src={homeicon} alt="Subscription Icon" className="w-5 h-5" />
            Subscription
          </NavLink>
          <NavLink
            to="/dashboard/learning-center"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md hover:text-gray-400 ${
                isActive ? "bg-[#27272A]" : ""
              }`
            }
          >
            <img src={homeicon} alt="Learning Icon" className="w-5 h-5" />
            Learning Center
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
