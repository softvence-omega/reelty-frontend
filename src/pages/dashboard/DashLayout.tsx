import { Outlet } from "react-router";
import Sidebar from "../../components/dashboard/common/Sidebar";
import Header from "../../components/dashboard/common/Header";
import { useState } from "react";
import UserProfileModal from "../../components/ui/UserProfileModal";

const DashLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
     <div className="h-screen flex overflow-hidden">
      {/* question */}
      {/* <button className="py-2 px-4 rounded text-white font-semibold border border-white/10 shadow fixed right-5 bottom-5">Questions?</button> */}
      {/* Sidebar: fixed width on desktop */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right content area */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">
          <Outlet />
        </div>
      </div>
    <UserProfileModal/>
    </div>
  );
};

export default DashLayout;