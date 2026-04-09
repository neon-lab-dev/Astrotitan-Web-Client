import AboutUsHero from "../../components/AboutUsPage/AboutUsHero/AboutUsHero";
import WhyAstroTitanDifferent from "../../components/AboutUsPage/WhyAstroTitanDifferent/WhyAstroTitanDifferent";
import CTA from "../../components/Shared/CTA/CTA";

const AboutUs = () => {
  return (
    <div>
      <AboutUsHero />
      <WhyAstroTitanDifferent />
      <div className="py-14 xl:py-20">
        <h2 className="heading">
          Your data is handled with care and privacy. We aim to provide guidance
          that supports your decisions — not replaces them.
        </h2>
      </div>
      <CTA />
    </div>
  );
};

export default AboutUs;
