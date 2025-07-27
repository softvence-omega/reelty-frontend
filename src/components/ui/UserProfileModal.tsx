import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { closeUserProfileModal } from '../../features/ui/components/modalSlice';
import logoCircle from '../../assets/images/dashboard/home/homecircle.png';

const UserProfileModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.userProfileModel);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <div className="bg-gray-900 rounded-lg p-6 w-[90%] max-w-md shadow-2xl relative border border-gray-800">
        <button
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          onClick={() => dispatch(closeUserProfileModal())}
        >
          ✕
        </button>
        <div className="flex items-center gap-4 mb-6">
          <img src={logoCircle} alt="Logo" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold text-white">Profile</h2>
            <p className="text-gray-400 text-sm">User Name</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Name</span>
            <span className="text-white">John Korinn Doe</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Email</span>
            <span className="text-white">john@gmail.com</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Subscription</span>
            <span className="text-yellow-400">Free</span>
          </div>
        </div>
        <button className="w-full mt-6 bg-white text-black font-medium py-2 rounded-full hover:bg-gray-200 transition-colors">
          Upgrade
        </button>
        <div className="mt-4 text-center text-red-400 text-sm">
          Delete Account
          <br />
          Once you delete your account, your data, files, projects, and compositions will be gone forever.
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;