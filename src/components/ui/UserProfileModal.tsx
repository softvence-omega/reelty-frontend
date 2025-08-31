import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { closeUserProfileModal } from "../../features/ui/components/modalSlice";
import logoCircle from "../../assets/images/dashboard/home/homecircle.png";
import { useGetProfileDataQuery, useUserSelfDeleteMutation } from "../../features/user/userApi";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const UserProfileModal = () => {
const { data } = useGetProfileDataQuery("");


  const [userSelfDelete] = useUserSelfDeleteMutation();
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.modal.userProfileModel
  );

  if (!isOpen) return null;



  const handleDelete = async (id: any) => {
    try {
      const res = await userSelfDelete(id).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message || "User deleted successfully")
        dispatch(logout())
      }



    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 px-4">
      <div className="relative w-full max-w-md bg-[#0f0f0f] rounded-2xl p-6 shadow-xl border border-gray-800">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logoCircle}
            alt="Logo"
            className="w-14 h-14 rounded-full -mt-12 mb-2 shadow-md"
          />
          <div className="flex justify-between items-center w-full">
            <h2 className="text-xl font-semibold text-white/80">User Profile</h2>
            <button
              onClick={() => dispatch(closeUserProfileModal())}
              className="text-white/60 cursor-pointer hover:text-white transition-colors text-xl"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="text-white/60 text-sm mb-1">Name</label>
            <span className="text-white/80 text-sm">{data?.data?.firstName + " " + data?.data?.lastName}</span>
          </div>

          <div className="flex flex-col">
            <label className="text-white/60 text-sm mb-1">Email</label>
            <span className="text-white/80 text-sm">{data?.data?.email || ""}</span>
          </div>

          <div className="flex flex-col">
            <label className="text-white/60 text-sm mb-1">Subscription</label>
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">Free</span>
              <button className="ml-auto bg-white text-black font-medium py-2 px-4 rounded-full hover:bg-gray-200 transition">
                Upgrade
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="mt-8 border-t border-gray-700 pt-5 space-y-3">
          <h3 className="text-white text-sm font-semibold">Delete Account</h3>
          <p className="text-white/50 text-xs leading-relaxed">
            Once you delete your account, your data, files, projects, and compositions will be gone forever.
          </p>
          <button onClick={() => handleDelete(data.data.id)} className="text-red-600 cursor-pointer hover:text-red-400 text-sm underline underline-offset-2 transition">
            Permanently Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
