import Navbar from "../../components/ui/Navbar";
import GoogleIcon from "../../assets/icons/login/google.svg";
import AppleIcon from "../../assets/icons/login/apple.svg";
import AuthBanner from "../../assets/images/login/auth_poster.png";
import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate(); // ✅ hook initialize

  const [login, { isLoading, isError, error, isSuccess, data }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap(); // 🔥 unwrap করলে সরাসরি response পাবে
      console.log("Login success:", res);
 
      // উদাহরণ: token লোকালস্টোরেজে রাখতে চাইলে
      if (res?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }

           setTimeout(() => {
        navigate("/dashboard"); // 2 সেকেন্ড পরে login page এ চলে যাবে
      }, 2000); // 2000 ms = 2 seconds

    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleGoogleLogin = () => {

    alert("Google Login Success!");
  };

  const handleAppleLogin = () => {

    alert("Apple Login Success!");
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

            <button
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#27272A] hover:bg-[#3F3F46] text-white py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <img src={AppleIcon} alt="Apple logo" className="w-5 h-5" />

              <span>Continue with Apple</span>

            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-[#9B9EA3] text-sm">

              or continue with email

            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div className="space-y-4">
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
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-4 py-3 text-white placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isLoading ? "Logging in..." : "Login"}
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
                  <p className="text-sm">• {"data" in error && (error.data as any)?.message ? (error.data as any).message : "Registration failed"}</p>
                )}
              </div>
            )}
            {isSuccess && <p className="text-green-400">{data.message}!</p>}
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-[#9B9EA3] space-y-2">
            <p>
              By continuing, you agree to Opus's{" "}
              <a href="/terms" className="text-white hover:underline">
                Terms of Service
              </a>
              . Read our{" "}
              <a href="/privacy" className="text-white hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <p>
              Don't have an account?{" "}
              <a
                href="/auth/signup"
                className="text-white font-medium hover:underline"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>

        {/* Right Column - Banner */}
        <div className="w-full max-w-md text-center hidden lg:block">
          <div className="space-y-4">
            <span className="inline-block text-[#3DD68C] font-semibold">
              #1 Video Editing Software for Real Estate Pros
            </span>
            <h2 className="text-3xl font-bold text-white">
              Trusted by <span className="text-[#FF5BE4]">10M+</span> creators
              and businesses worldwide
            </h2>
            <img
              src={AuthBanner}
              alt="Happy creators using our platform"
              className="rounded-xl mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
