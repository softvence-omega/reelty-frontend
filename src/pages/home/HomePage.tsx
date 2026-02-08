import Draganddropsection from "../../components/ui/Draganddropsection";
import MaxWidthWrapper2 from "../../components/wrappers/MaxWidthWrapper2";
import ChoosePlan from "./ChoosePlan";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";

const HomePage = () => {
  return (
    <div>
      <MaxWidthWrapper2>
        <div className="flex flex-col gap-20 space-y-12">
          {" "}
          {/* Add vertical gap here */}
          <HeroSection />
          <HowItWorks />
          <ChoosePlan />
          {/* <Accordion /> */}
          <Draganddropsection />
        </div>
      </MaxWidthWrapper2>
      <Footer />
    </div>
  );
};

export default HomePage;
