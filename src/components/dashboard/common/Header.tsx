import { Bell, Menu, UserCircle, X } from "lucide-react";

const Header = ({isOpen, setIsOpen} : any) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="flex items-center justify-between px-4 py-3 text-white border-b-[1px] border-gray-700 bg-black shadow-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden cursor-pointer">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="text-lg font-bold">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          {/* Example notification dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <UserCircle className="w-6 h-6 text-gray-600" />
          <span className="text-sm">mdboniamin...</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
