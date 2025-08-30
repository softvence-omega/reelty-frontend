import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useResetPassWithNewPassMutation } from "../../features/auth/authApi";
import { toast } from "react-toastify";

const ResetPasswordWithToken = () => {
    const location = useLocation();

    // Use URLSearchParams to parse the query string
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');  // Extract the token    
    const [password, setPassword] = useState(""); // To store the new password
    const [message, setMessage] = useState(""); // To show success or error messages
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // To navigate to different routes if needed

    const [resetPassWithNewPass] = useResetPassWithNewPassMutation(); // Hook to call the reset password API

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value); // Update password value
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!token) {
            setMessage("Invalid or expired token.");
            setIsLoading(false);
            return;
        }

        try {
            // Call the reset password API with token and new password
            const response = await resetPassWithNewPass({ token, password }).unwrap();
            if (response.success) {
                toast.success(response?.message)
                navigate("/auth/login")
            }
        } catch (error: any) {
            toast.error((error?.data?.message as string) || "Something wrong!")
        }


        setIsLoading(false);
    };

    return (
        <div className="flex h-screen items-center justify-center">

            <div className="w-full max-w-md bg-[#18181B] p-8 rounded-xl border border-[#27272A]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-white mb-2">Reset Your Password</h1>
                    <p className="text-[#A1A1AA]">Enter your new password.</p>
                </div>

                {/* Password Reset Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        required
                        placeholder="Enter new password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                {message && <p className="text-[#A1A1AA] text-center mt-4">{message}</p>}
            </div>
        </div>


    );
};

export default ResetPasswordWithToken;
