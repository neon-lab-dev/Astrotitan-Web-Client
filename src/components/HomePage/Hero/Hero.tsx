import { IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";

const Hero = () => {
  return (
    <Container>
      <div className="pt-24 pb-[149px]">
        <h1 className="text-[65px] font-Satoshi font-bold leading-17.75 text-center max-w-282 mx-auto">
          Clarity for your next move, powered by astrology
        </h1>
        <p className="text-[21px] font-GeneralSans leading-7.75 text-center max-w-282 mx-auto mt-3">
          Personalized insights based on your birth details and intent
          preferences — so you know what to do, not just what’s happening.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Button label="Get My Personalized Insights" />
          <Button variant="secondary" label="Explore Today’s Insights" />
        </div>

        <p className="text-xs font-GeneralSans text-center mt-3">
          Takes less than 60 seconds • No astrology knowledge needed
        </p>

        <div className="flex items-center justify-center gap-14 mt-12">
          <img src={IMAGES.heroImg1} alt="" />
          <img src={IMAGES.heroImg2} alt="" />
          <img src={IMAGES.heroImg3} alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
