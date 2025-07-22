import Draganddropsection from "../../components/ui/Draganddropsection";
import MaxWidthWrapper from "../../components/wrappers/MaxWidthWrapper";
import Accordion from "./Accordion";
import ChoosePlan from "./ChoosePlan";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";

const HomePage = () => {
  return (
    <div>
      <MaxWidthWrapper>
        <div className="flex flex-col gap-20 space-y-20">
          {" "}
          {/* Add vertical gap here */}
          <HeroSection />
          <HowItWorks />
          <ChoosePlan />
          <Accordion />
          <Draganddropsection />
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default HomePage;
