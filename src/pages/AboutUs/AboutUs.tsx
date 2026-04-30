import { IMAGES } from "../../assets";
import AboutUsHero from "../../components/AboutUsPage/AboutUsHero/AboutUsHero";
import WhyAstroTitanDifferent from "../../components/AboutUsPage/WhyAstroTitanDifferent/WhyAstroTitanDifferent";
import WhyAstroTitanExists from "../../components/AboutUsPage/WhyAstroTitanExists/WhyAstroTitanExists";
import Container from "../../components/Reusable/Container/Container";
import CTA from "../../components/Shared/CTA/CTA";

const AboutUs = () => {
  return (
    <div>
      <AboutUsHero />
      <WhyAstroTitanExists />
      <WhyAstroTitanDifferent />
      <div className="py-14 xl:py-20 relative">
        <img
          src={IMAGES.featureSectionBg}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 w-1/3"
        />
        <img src={IMAGES.linnerShape2} alt="" className="absolute left-0" />
        <h2 className="heading max-w-332 mx-auto text-center">
          Your data is handled with care and privacy. We aim to provide guidance
          that supports your decisions — not replaces them.
        </h2>
        <img
          src={IMAGES.linnerShape2}
          alt=""
          className="absolute top-0 right-0"
        />
      </div>

      <div className="py-14 xl:py-24">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-10 xl:gap-0 justify-between">
            <img src={IMAGES.zodiacSign} alt="" />

            <div>
              <h2 className="heading max-w-160">We believe clarity comes from understanding - not prediction</h2>
            </div>
          </div>
        </Container>
      </div>
      <CTA />
    </div>
  );
};

export default AboutUs;
