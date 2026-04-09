import Hero from "../../components/HomePage/Hero/Hero";
import TrustedBy from "../../components/HomePage/TrustedBy/TrustedBy";
import TalkToAstrologer from "../../components/HomePage/TalkToAstrologer/TalkToAstrologer";
import DailyHoroscope from "../../components/HomePage/DailyHoroscope/DailyHoroscope";
import GenerateInsights from "../../components/HomePage/GenerateInsights/GenerateInsights";
import Benefits from "../../components/HomePage/Benefits/Benefits";
import ExploreRemedies from "../../components/HomePage/ExploreRemedies/ExploreRemedies";
import ExploreBlogs from "../../components/HomePage/ExploreBlogs/ExploreBlogs";
import GetMyPersonalizedInsights from "../../components/HomePage/GetMyPersonalizedInsights/GetMyPersonalizedInsights";
import CTA from "../../components/Shared/CTA/CTA";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <DailyHoroscope />
      <GenerateInsights />
      <Benefits/>
      <TalkToAstrologer />
      <ExploreRemedies />
      <GetMyPersonalizedInsights/>
      <ExploreBlogs/>
      <CTA/>
    </div>
  );
};

export default Home;
