import HomePageNav from "../../components/ui/HomePageNav";
import videoframe from "../../assets/frontpage-1.mp4";
import herobackground from "../../assets/images/hero/herobackground.png";
import Draganddropsection from "../../components/ui/Draganddropsection";
import herobackgroundrightanimationpic from "../../assets/images/hero/backgroundrightanimation.svg";
import herobackgroundleftanimationpic from "../../assets/images/hero/backgroundleftanimation.svg";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Rotating Images - Placed first with lower z-index */}
      <div className="absolute left-0 top-0 -z-100 h-full opacity-50">
        <img
          src={herobackgroundleftanimationpic}
          alt="left decoration"
          className="h-full object-contain animate-spin"
          style={{ animationDuration: '30s' }}
        />
      </div>
      <div className="absolute right-0 top-0 -z-100 h-full opacity-35">
        <img
          src={herobackgroundrightanimationpic}
          alt="right decoration"
          className="h-full object-contain animate-spin"
          style={{ animationDuration: '20s' }}
        />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 -z-5 flex justify-center pointer-events-none bg-[#1a1a1a]/90">
        <img
          src={herobackground}
          alt="hero background"
          className="w-full h-full md:block hidden max-w-none object-cover"
        />
      </div>

      {/* Content */}
      <HomePageNav />
      <div className="flex flex-col gap-5 px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex justify-center my-2">
          <p className="p-1 px-3 border border-[#D31027] rounded-4xl bg-black text-white text-sm sm:text-base text-center">
            #1 Video Editing Software for Real Estate Pros
          </p>
        </div>

        <div className="flex items-center justify-center">
          <h1 className="font-bold text-3xl sm:text-3xl lg:text-5xl text-white max-w-[90%] sm:max-w-[70%] text-center leading-tight">
            Turn Market Updates into Viral Reels in One Click
          </h1>
        </div>

        <div className="flex items-center justify-center">
          <p className="text-white text-center text-sm sm:text-base px-2 md:max-w-6/12">
            Powered by AI, our video clipping software finds the best moments
            from your video and turns them into short viral clips for social
            media.
          </p>
        </div>

        <Draganddropsection />

        {/* Enhanced Video Frame */}
        <div className="flex justify-center mt-12 mb-8 px-4">
          <div className="relative w-full max-w-5xl group">
            {/* Optional: subtle border/glow container */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D31027]/20 via-purple-600/10 to-transparent rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            
            {/* Main video container */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm">
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-10"></div>
              
              <video
                src={videoframe}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Enhanced shadow & inner highlight */}
            <div className="absolute inset-0 rounded-3xl shadow-2xl ring-1 ring-white/20 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
