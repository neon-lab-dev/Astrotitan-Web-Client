import Container from "../../Reusable/Container/Container";

const AboutUsHero = () => {
  return (
    <Container>
      <div className="pt-12 pb-12 md:pb-20 xl:pb-30">
        <h1 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 text-center max-w-282 mx-auto">
          Built to bring clarity to your decisions
        </h1>
        <p className="text-base md:text-[21px] font-GeneralSans leading-7.75 text-center max-w-282 mx-auto mt-3">
          AstroTitan is designed to help you make better decisions using
          personalized astrology. By combining your birth details with your
          current intentions, we provide guidance that’s relevant, actionable,
          and easy to understand.
        </p>
      </div>
    </Container>
  );
};

export default AboutUsHero;
