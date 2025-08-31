
import { CiWarning } from "react-icons/ci";
import { Link } from "react-router";

const UserAlreadyDeleted = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className=" text-white rounded border border-gray-400/90 shadow-lg p-8 max-w-md w-full text-center space-y-6">
        {/* Optional icon */}
        <div className="flex justify-center">
          <CiWarning size={50}/>
        </div>

        <h1 className="text-2xl font-bold">Account Deleted</h1>
        <p className="text-gray-400">
          Your account has been deleted. Google login is not allowed.
        </p>

        <Link
          to="/auth/signup"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-200"
        >
          Create New Account
        </Link>

        <p className="text-gray-500 text-sm">
          Or{" "}
          <Link to="/auth/login" className="text-red-400 hover:underline">
            login with a different account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserAlreadyDeleted;
