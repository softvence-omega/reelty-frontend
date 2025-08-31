import { useState } from "react";
import { useResetPassMutation } from "../../features/auth/authApi";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resetPass] = useResetPassMutation()

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate an API call for email submission
        try {
            // Assuming we have an API endpoint to request a reset link
            const response = await resetPass({ email }).unwrap()
            if (response.success) {
                toast.success(response?.message)
            }
        } catch (error: any) {
            toast.error((error?.data?.message as string) || "Something wrong!")
        }

        setIsLoading(false);
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="w-full  max-w-md bg-[#18181B] p-8 rounded-xl mx-auto my-auto border border-[#27272A]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-white mb-2">Reset Your Password</h1>
                    <p className="text-[#A1A1AA]">Enter your email to receive a reset password link.</p>
                </div>

                {/* Reset Password Request Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#dd2626]"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ResetPassword;