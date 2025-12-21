/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../../components/ui/Navbar";
import GoogleIcon from "../../assets/icons/login/google.svg";
import { useRegisterMutation } from "../../features/auth/authApi";
import { useState, useEffect } from "react";

const SignUpPage = () => {
    const [register, { isLoading, isError, error, isSuccess, data }] = useRegisterMutation();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [passwordError, setPasswordError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const validatePassword = (password: string): string => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    useEffect(() => {
        const isAllFieldsFilled = 
            form.firstName.trim() !== "" && 
            form.lastName.trim() !== "" && 
            form.email.trim() !== "" && 
            form.password.trim() !== "";
        
        const hasNoPasswordError = passwordError === "";
        
        setIsFormValid(isAllFieldsFilled && hasNoPasswordError);
    }, [form, passwordError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === "password") {
            const error = validatePassword(value);
            setPasswordError(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Final validation check before submission
        const passwordValidationError = validatePassword(form.password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (!isFormValid) {
            return;
        }

        console.log(form);
        try {
            const res = await register(form).unwrap();
            console.log(res);
        } catch (err: any) {
            console.log(err);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google`;
    };

    return (
        <div className="min-h-screen bg-[#18181B]">
            <Navbar />

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row justify-center items-center gap-12">
                {/* Left Column - Login Form */}
                <div className="w-full max-w-md bg-[#18181B] p-8 rounded-xl border border-[#27272A]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-semibold text-white mb-2">
                            Finish signing up to get your free clips
                        </h1>
                        <p className="text-[#A1A1AA]">
                            Free plan available. No credit card required.
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-4 mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 bg-[#27272A] hover:bg-[#3F3F46] text-white py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            <img src={GoogleIcon} alt="Google logo" className="w-5 h-5" />
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-600"></div>
                        <span className="mx-4 text-[#9B9EA3] text-sm">or continue with email</span>
                        <div className="flex-grow border-t border-gray-600"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                placeholder="First Name"
                                value={form.firstName}
                                onChange={handleChange}
                                className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
                            />
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                placeholder="Last Name"
                                value={form.lastName}
                                onChange={handleChange}
                                className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
                            />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="Enter email address"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
                            />
                            <div className="space-y-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`w-full bg-[#27272A] border rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 ${
                                        passwordError && form.password ? "border-red-500 focus:ring-red-500" : "border-[#3F3F46] focus:ring-[#3DD68C]"
                                    }`}
                                />
                                {passwordError && form.password && (
                                    <p className="text-red-400 text-sm">{passwordError}</p>
                                )}
                                {form.password && !passwordError && (
                                    <p className="text-green-400 text-sm">✓ Password meets all requirements</p>
                                )}
                                {!form.password && (
                                    <p className="text-[#A1A1AA] text-sm">
                                        Password must contain: 8+ characters, uppercase, lowercase, number, special character
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !isFormValid}
                            className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${
                                isLoading || !isFormValid
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-white hover:bg-gray-100 text-black cursor-pointer"
                            }`}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>

                        {isError && error && (
                            <div className="text-red-400 space-y-1">
                                {"data" in error && error.data && Array.isArray((error.data as any)?.message) ? (
                                    (error.data as any).message.map((msg: string, index: number) => (
                                        <p key={index} className="text-sm">
                                            • {msg}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-sm">• {"data" in error && (error.data as any)?.message[0] ? (error.data as any).message : "Registration failed"}</p>
                                )}
                            </div>
                        )}
                        {isSuccess && <p className="text-green-400">{data.message}</p>}
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 text-center text-sm text-[#9B9EA3] space-y-2">
                        <p>
                            Already have an account?{" "}
                            <a href="/auth/login" className="text-white font-medium hover:underline">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;