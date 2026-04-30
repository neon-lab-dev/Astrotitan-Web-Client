import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const ContactUsHero = () => {
  return (
    <Container>
      <div className="">
        <div className="relative">
          <img
            src={IMAGES.featureSectionBg}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
          />
          <img src={IMAGES.linnerShape2} alt="" className="w-1/2 md:w-2/6" />
          <img
            src={IMAGES.linnerShape2}
            alt=""
            className="w-1/2 md:w-2/6 absolute top-0 right-0"
          />
          <h1 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 text-center">
            We’re here to help
          </h1>
          <p className="font-GeneralSans leading-7.75 text-center max-w-282 mx-auto mt-3">
           Have a question, need support, or want guidance? Reach out — we’ll get back to you as soon as possible.
          </p>

          <img src={IMAGES.linnerShape2} alt="" className="w-1/2 md:w-2/6" />
          <img
            src={IMAGES.linnerShape2}
            alt=""
            className="w-1/2 md:w-2/6 absolute bottom-0 right-0"
          />
        </div>
      </div>
    </Container>
  );
};

export default ContactUsHero;
