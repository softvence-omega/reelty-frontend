import logo from "../../assets/images/logos/logo.png";
import fb from "../../assets/images/homepage/Facebook.png";
import insta from "../../assets/images/homepage/Instagram.png";
import x from "../../assets/images/homepage/X.png";
import linkin from "../../assets/images/homepage/LinkedIn.png";
import youtube from "../../assets/images/homepage/Youtube.png";
const Footer = () => {
  return (
    <div className="bg-black flex flex-col pt-20 mt-30 justify-center items-center text-white gap-8">
      <h4 className="max-w-3xl text-6xl text-center">
        Turn Market Updates into Viral Reels in One Click
      </h4>
      <p className="opacity-55 max-w-2xl text-center">
        Powered by AI, our video clipping software finds the best moments from
        your video and turns them into short viral clips for social media.
      </p>
      <button className="border-1 border-red-500 py-2 px-4 bg-white text-black rounded-full">
        Try For Free
      </button>
      <img src={logo} className="w-30" alt="" />
      <p className="text-sm opacity-45 mb-10">
        Reelty is not affiliated with Instagram, Meta, or any real estate brand
      </p>

      <div className="flex justify-center items-center gap-5 py-3">
        <img src={fb} alt="" />
        <img src={insta} alt="" />
        <img src={x} alt="" />
        <img src={linkin} alt="" />
        <img src={youtube} alt="" />
      </div>

      {/* footer bottom */}

      <div className="py-5 text-center text-white border-t-2 border-t-amber-50 w-full">© 2024 Reelty. All rights reserved.</div>
    </div>
  );
};

export default Footer;
