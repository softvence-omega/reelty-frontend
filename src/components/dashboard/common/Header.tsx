import { Bell, Languages, LogOut, Menu, UserCircle, X } from "lucide-react";
import arrowdown from "../../../assets/images/dashboard/header/arrowdown.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleUserProfileModal } from "../../../features/ui/components/modalSlice";
import { logout } from "../../../features/auth/authSlice";
import { useGetProfileDataQuery } from "../../../features/user/userApi";

const Header = ({ isOpen, setIsOpen }: any) => {
  const [isDropDownOpen, setIsOpenDropDown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const {data}  = useGetProfileDataQuery("")
  console.log("ddddd", data)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsOpenDropDown(!isDropDownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropDown(false);
      }
    };

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  return (
    <div className="flex items-center justify-between px-4 py-3 text-white border-b-[1px] border-gray-700 bg-black shadow-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden cursor-pointer">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="text-lg font-bold">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {/* <button className="relative"> */}
          {/* <Bell className="w-5 h-5 text-gray-600" /> */}
          {/* Example notification dot */}
          {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
        {/* </button> */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center gap-2 cursor-pointer "
          >
            <UserCircle className="w-6 h-6 text-gray-600" />
            <span className="text-sm">{data?.data?.firstName || ""}</span>
            <img src={arrowdown} alt="" />
          </div>
          {isDropDownOpen && (
            <div
              ref={dropdownRef}
              className="absolute transform  transition-opacity duration-300 z-30  right-0 cursor-pointer mt-2 w-64 bg-black text-white  rounded-md border border-white/20 shadow"
            >
              <div className="w-full px-4 py-2 border-b border-white/20 text-white/50 text-sm">
                Account
              </div>
              <div onClick={() => dispatch(toggleUserProfileModal())} className="w-full px-4 py-2  text-white/50 text-sm">
                <UserCircle className="inline w-4 h-4 mr-1" />
                {data?.data?.firstName || " User"}'s Profile
              </div>


              <div className="relative group w-full text-white/50 text-sm">
                {/* Trigger Area (hover over this to show the list) */}
                {/* <div className="flex items-center justify-between px-4 py-2 cursor-pointer">
                  <div className="flex items-center">
                    <Languages className="inline w-4 h-4 mr-1" />
                    Languages
                  </div>
                  <div className="flex items-center gap-1">
                    <div>{selectedLanguage}</div>
                    <img
                      src={arrowdown}
                      alt=""
                      className="inline ml-1 -rotate-90"
                    />
                  </div>
                </div> */}

                {/* Dropdown List (appears on hover of group) */}
                {/* <div className="absolute left-0 top-full w-full bg-black border border-white/20 rounded-md shadow-md z-50 hidden group-hover:block">
                  <div
                    onClick={() => setSelectedLanguage("English")}
                    className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                  >
                    English
                  </div>
                  <div
                    onClick={() => setSelectedLanguage("Bangla")}
                    className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                  >
                    Bangla
                  </div>
                  <div
                    onClick={() => setSelectedLanguage("Spanish")}
                    className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                  >
                    Spanish
                  </div>
                </div> */}
              </div>

              <div onClick={() => dispatch(logout())} className="w-full px-4 py-2 text-red-500 text-sm cursor-pointer   transition-colors">
                <LogOut className="inline w-4 h-4 mr-1" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
