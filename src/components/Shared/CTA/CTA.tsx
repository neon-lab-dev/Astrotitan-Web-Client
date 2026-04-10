import { IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";

const CTA = () => {
  return (
    <div className="relative flex items-center py-24">
      <img
        src={IMAGES.ctaImg}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover hidden lg:block"
      />
      <img
        src={IMAGES.ctaImgMobile}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover block md:hidden"
      />
      <img
        src={IMAGES.ctaImgTab}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover hidden md:block lg:hidden"
      />
      <Container>
        <div className="flex flex-col items-center justify-center text-center relative">
          <h1 className="heading">
            Start making better decisions with clarity
          </h1>
          <p className="description mt-3">
            Personalized insights designed around your life and priorities
          </p>

          <div className="flex justify-center mt-6">
            <Button label={"Get My Personalized Insights"} />
          </div>

          <p className="text-xs font-GeneralSans text-center mt-3">
            Takes less than a minute to begin
          </p>
        </div>
      </Container>
    </div>
  );
};

export default CTA;
