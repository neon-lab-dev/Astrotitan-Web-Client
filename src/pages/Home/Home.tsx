import Hero from "../../components/HomePage/Hero/Hero";
import TalkToAstrologer from "../../components/HomePage/TalkToAstrologer/TalkToAstrologer";
import DailyHoroscope from "../../components/HomePage/DailyHoroscope/DailyHoroscope";
import GenerateInsights from "../../components/HomePage/GenerateInsights/GenerateInsights";
import Benefits from "../../components/HomePage/Benefits/Benefits";
import ExploreRemedies from "../../components/HomePage/ExploreRemedies/ExploreRemedies";
import ExploreBlogs from "../../components/HomePage/ExploreBlogs/ExploreBlogs";
import GetMyPersonalizedInsights from "../../components/HomePage/GetMyPersonalizedInsights/GetMyPersonalizedInsights";
import CTA from "../../components/Shared/CTA/CTA";
import FAQ from "../../components/Shared/FAQ/FAQ";
import { ICONS } from "../../assets";

const Home = () => {
  const benefits = [
    {
      id: 1,
      icon: ICONS.personalizedLife,
      title: "Personalized for your life & priorities",
    },
    {
      id: 2,
      icon: ICONS.pauseOrRethink,
      title: "Know when to act, pause, or rethink",
    },
    {
      id: 3,
      icon: ICONS.privacy,
      title: "Your data stays private & secure",
    },
  ];

  const benefits2 = [
    {
      id: 1,
      icon: ICONS.focus,
      title: "Choose your focus areas",
    },
    {
      id: 2,
      icon: ICONS.evolvingGuidance,
      title: "Dynamic, evolving guidance",
    },
    {
      id: 3,
      icon: ICONS.insights,
      title: "Personalized insights",
    },
  ];

  return (
    <div>
      <Hero />
      <Benefits
        heading={"Trusted by thousands seeking clarity in everyday decisions"}
        benefits={benefits}
      />
      <DailyHoroscope />
      <GenerateInsights />
      <Benefits
        heading={"Astrology aligned with what matters to you"}
        benefits={benefits2}
      />
      <TalkToAstrologer />
      <ExploreRemedies />
      <GetMyPersonalizedInsights />
      <ExploreBlogs />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;
