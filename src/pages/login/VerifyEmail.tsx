import { useState } from "react";
import { useNavigate } from "react-router";
import { useVerifyEmailMutation } from "../../features/auth/authApi";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [verifyEmail, { data, isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();
  const [clicked, setClicked] = useState(false);

  const handleVerify = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      setClicked(true);
      verifyEmail(token);
    }
  };

  if (isSuccess) {
    setTimeout(() => navigate("/auth/login"), 3000);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br ">
      <div className="max-w-md w-full p-8 rounded-2xl shadow-xl text-center ">
        <h1 className="text-2xl font-bold text-white mb-4">
          Email Verification
        </h1>
        <p className="text-gray-400 mb-6">
          Please verify your email address to continue.
        </p>

        {!clicked && (
          <button
            onClick={handleVerify}
            className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Verify Email
          </button>
        )}

        {isLoading && (
          <div className="mt-6 text-gray-300">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p>Verifying your email...</p>
          </div>
        )}

        {isSuccess && (
          <div className="mt-6 text-green-400">
            <p className="text-xl font-semibold mb-2">✅ Success</p>
            <p>{data?.message || "Email verified successfully!"}</p>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to login page...
            </p>
          </div>
        )}

        {isError && (
          <div className="mt-6 text-red-500">
            <p className="text-xl font-semibold mb-2">❌ Verification Failed</p>
            <p>{(error as any)?.data?.message || "Something went wrong"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
