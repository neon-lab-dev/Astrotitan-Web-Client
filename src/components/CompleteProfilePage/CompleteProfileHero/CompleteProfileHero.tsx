import { IMAGES } from "../../../assets";
import CompleteProfileModal from "../../AuthComponents/CompleteProfileModal/CompleteProfileModal";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";

const CompleteProfileHero = () => {
  return (
    <>
      <div className="relative min-h-175 flex items-center justify-center">
        <Container>
          <div className="py-12 md:py-24">
            <h1 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 text-center max-w-282 mx-auto">
              Complete Your Profile for{" "}
              <span className="text-primary-5">Personalized Insights</span>
            </h1>
            <p className="text-base md:text-[21px] font-GeneralSans leading-7.75 text-center max-w-282 mx-auto mt-3">
              Tell us a little about yourself to unlock accurate astrological
              predictions tailored specifically to your life journey.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-6">
              <Button label="Start Your Journey" />
              <Button variant="secondary" label="Learn More" />
            </div>

            <p className="text-xs font-GeneralSans text-center mt-3">
              Your data is secure • Takes less than 2 minutes
            </p>
          </div>

          <img
            src={IMAGES.heroBg}
            alt="Background decoration"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-20"
          />
        </Container>
      </div>
      <CompleteProfileModal isModalOpen={true} />
    </>
  );
};

export default CompleteProfileHero;
