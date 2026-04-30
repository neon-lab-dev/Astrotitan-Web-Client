import { IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";

const ExploreBlogs = () => {
  return (
    <div className="relative h-[950px] md:h-[1250px] 2xl:h-[1400px]">
      <Container>
        <div className="pt-12 md:pt-24 pb-20 xl:pb-37.25">
          <h2 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 text-center max-w-282 mx-auto">
            Understand the “why” behind your experiences
          </h2>
          <p className="text-base md:text-[21px] font-GeneralSans leading-7.75 text-center max-w-282 mx-auto mt-3">
           Explore daily insights, astrology guides, and deeper explanations of planetary effects.
          </p>

          <div className="flex justify-center mt-6">
            <Button label="Explore Insights" />
          </div>

          <p className="text-xs font-GeneralSans text-center mt-3">
            Takes less than 60 seconds • No astrology knowledge needed
          </p>

          <div className="w-full overflow-x-auto flex items-center xl:justify-center gap-5 md:gap-14 mt-12 z-10 relative">
            <img
              src={IMAGES.blogImg1}
              alt=""
              className="w-1/2 md:w-2/5 xl:w-fit"
            />
            <img
              src={IMAGES.blogImg2}
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

export default ExploreBlogs;
