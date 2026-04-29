import { IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";

const Hero = () => {
  return (
    <div className="relative h-[950px] md:h-[1250px] 2xl:h-[1400px]">
      <Container>
        <div className="pt-12 md:pt-24 pb-20 xl:pb-37.25">
          <h1 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 text-center max-w-282 mx-auto">
            Clarity for your next move, powered by astrology
          </h1>
          <p className="text-base md:text-[21px] font-GeneralSans leading-7.75 text-center max-w-282 mx-auto mt-3">
            Personalized insights based on your birth details and intent
            preferences — so you know what to do, not just what's happening.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-6">
            <Button label="Get My Personalized Insights" />
            <Button variant="secondary" label="Explore Today's Insights" />
          </div>

          <p className="text-xs font-GeneralSans text-center mt-3">
            Takes less than 60 seconds • No astrology knowledge needed
          </p>

          <div className="w-full overflow-x-auto flex items-center xl:justify-center gap-5 md:gap-14 mt-12 z-10 relative">
            <img
              src={IMAGES.heroImg1}
              alt=""
              className="w-1/2 md:w-2/5 xl:w-fit"
            />
            <img
              src={IMAGES.heroImg2}
              alt=""
              className="w-1/2 md:w-2/5 xl:w-fit"
            />
            <img
              src={IMAGES.heroImg3}
              alt=""
              className="w-1/2 md:w-2/5 xl:w-fit"
            />
          </div>
        </div>

        <img
          src={IMAGES.heroBg}
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        />
      </Container>
    </div>
  );
};

export default Hero;