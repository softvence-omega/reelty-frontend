import { Link } from "react-router";
import logo from "../../assets/images/logos/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const HomePageNav = () => {
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  return (
    <div className="py-4">
      <div className="flex items-center justify-between gap-2 sm:gap-6">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-24 sm:w-36 object-contain" />

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {
            token !== null ? (
              <button
                onClick={() => dispatch(logout())}
                className="bg-white text-black hover:bg-[#D31027] hover:text-white flex items-center text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded-3xl gap-1.5 sm:gap-2 transition duration-300 group"
              >
                Logout
              </button>

            ) : (
              <Link to={"/auth/login"} className="bg-white text-black hover:bg-[#D31027] hover:text-white flex items-center text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded-3xl gap-1.5 sm:gap-2 transition duration-300 group">
                Login
              </Link>
            )
          }


          {/* <button className="bg-[#2C2C2C] text-white hover:bg-[#D31027] flex items-center text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded-3xl gap-1.5 sm:gap-2 transition duration-300 group">
            <span>Join Waitlist</span>
            <img
              src={navarrowicon}
              alt="arrow"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-45"
            />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePageNav;
