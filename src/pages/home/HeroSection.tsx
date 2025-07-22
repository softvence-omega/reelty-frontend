import HomePageNav from "../../components/ui/HomePageNav";
import dropleftimage from "../../assets/images/hero/dropleftimg.png";
import fileupload from "../../assets/images/hero/fileupload.png";
import linkimage from "../../assets/images/hero/linkicon.png";
import videoframe from "../../assets/images/hero/bannervideotemp.png";
import herobackground from "../../assets/images/hero/herobackground.png";
import Draganddropsection from "../../components/ui/Draganddropsection";
// import herobackgroundrightanimationpic from "../../assets/images/hero/backgroundrightanimation.png";
// import herobackgroundleftanimationpic from "../../assets/images/hero/backgroundleftanimation.png";



const HeroSection = () => {
  return (
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-20 flex justify-center pointer-events-none">
          <img
            src={herobackground}
            alt="hero background"
            className="w-full h-full  md:block hidden  max-w-none"
            //   className="md:w-[1400px] md:h-[1150px]   max-w-none"
          />
        </div>

        
        <HomePageNav />
        <div className="flex flex-col gap-5 px-4 sm:px-6 lg:px-8">
          {/* Top Status */}
          <div className="flex justify-center my-2">
            <p className="p-1 px-3 border border-[#D31027] rounded-4xl bg-black text-white text-sm sm:text-base text-center">
              # 1 Video Editing Software for Real Estate Pros
            </p>
          </div>

          {/* Text Section */}
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-3xl sm:text-3xl lg:text-5xl text-white max-w-[90%] sm:max-w-[70%] text-center leading-tight">
              Turn Market Updates into Viral Reels in One Click
            </h1>
          </div>

          {/* Description */}
          <div className="flex items-center justify-center">
            <p className="text-white text-center text-sm sm:text-base px-2 md:max-w-6/12">
              Powered by AI, our video clipping software finds the best moments
              from your video and turns them into short viral clips for social
              media.
            </p>
          </div>

          {/* Drag & Drop Section */}
    <Draganddropsection/>

          {/* video frame section */}

          <div className=" flex justify-center">
            <img src={videoframe} alt="" className="w-11/12" />
          </div>
        </div>
      </div>
  );
};

export default HeroSection;
