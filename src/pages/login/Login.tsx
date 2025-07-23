import Navbar from "../../components/ui/Navbar";
import Google from "../../assets/icons/login/google.svg";
import Apple from "../../assets/icons/login/apple.svg";

import AuthBanner from "../../assets/images/login/auth_poster.png";

const LoginPage = () => {
    const handleGoogle = () => {
        alert("Google Login Success!");
    }
    return (
        <div >
            <Navbar />

            <div className="flex justify-center items-center gap-12">
                <div className="flex flex-col items-center justify-center gap-6 text-center bg-[#18181B] p-8">
                    <h1 className="text-[#FAFAFA] text-3xl font-semibold">Finish signing up to get your
                        <br />free clips</h1>
                    <h6 className="text-[#A1A1AA] text-base font-normal">Free plan available. No credit card required.</h6>

                    {/* google login button */}
                    <button className="flex justify-between items-center gap-4 w-[384px] h-[44px] bg-[#27272A] px-[16px] py-[6px]  rounded-lg text-white cursor-pointer"
                        onClick={() => handleGoogle()}><img src={Google} alt="" /> Continue with Google <div></div></button>

                    {/* apple login button */}
                    <button className="flex justify-between items-center gap-4 w-[384px] h-[44px] bg-[#27272A] px-[16px] py-[6px]  rounded-lg text-white cursor-pointer"
                        onClick={() => handleGoogle()}><img src={Apple} alt="" />Continue with Apple <div></div></button>

                    <div className="flex justify-center items-center gap-8">
                        <div className="w-20 h-[1px] bg-gray-400">
                        </div>
                        <span className="text-[#9B9EA3] ">or continue with email</span>
                        <div className="w-20 h-[1px] bg-gray-400"></div>
                    </div>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        className="rounded-lg bg-[#27272A] w-[384px] h-[44px] px-[16px] py-[6px]  placeholder:text-gray-400 sm:text-sm/6"
                    />

                    <button className="w-[384px] h-[44px] bg-white px-[16px] py-[6px]  rounded-lg text-black cursor-pointer font-medium"
                        onClick={() => handleGoogle()}>Continue with email</button>

                    <p className="text-[#9B9EA3] font-medium">By continuing, you agree to Opus's Terms of Service. <br /> Read our Privacy Policy</p>

                    <p className="font-medium text-[#9B9EA3]">Already have an account <a href="/" className="text-white underline">Login here</a></p>
                </div>
                <div className="flex flex-col  items-center justify-center gap-2 text-center ">
                    <h6 className="text-[#3DD68C] font-semibold">#1 Video Editing Software for Real Estate Pros</h6>
                    <h1 className="text-white text-3xl font-bold mb-4">Trusted by <span className="text-[#FF5BE4]">10M+</span> creators and <br />
                        businesses worldwide</h1>
                    <img src={AuthBanner} alt="" />


                </div>
            </div>
        </div >
    )
}

export default LoginPage;