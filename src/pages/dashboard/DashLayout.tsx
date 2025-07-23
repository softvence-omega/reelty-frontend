import { Outlet } from "react-router";
import Sidebar from "../../components/dashboard/common/Sidebar";
import Header from "../../components/dashboard/common/Header";

const DashLayout = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
            <Header/>
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
