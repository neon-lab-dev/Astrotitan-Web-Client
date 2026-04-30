import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const ContactDetails = () => {
  return (
    <div className="py-14 xl:py-32 bg-primary-25 relative">
      <Container>
        <h2 className="heading text-center">Reach to us at</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-12 relative z-10">
          <div className="bg-neutral-15 border border-primary-5 rounded-xl p-6 flex flex-col items-center">
            <img src={ICONS.mail} alt="" className="size-12" />
            <h3 className="font-Satoshi font-semibold text-[28px] leading-9 text-neutral-5 text-center mt-6">
              Email Us
            </h3>

            <p className="description mt-3">
              For detailed queries, feedback, or assistance
            </p>

            <a
              href="mailto:support@astrotitan.com"
              className="font-Satoshi font-semibold text-[28px] md:text-[37px] leading-9 text-neutral-5 text-center mt-3"
            >
              support@astrotitan.com
            </a>
          </div>
          <div className="bg-neutral-15 border border-primary-5 rounded-xl p-6 flex flex-col items-center">
            <img src={ICONS.call} alt="" className="size-12" />
            <h3 className="font-Satoshi font-semibold text-[28px] leading-9 text-neutral-5 text-center mt-6">
              Talk To Us
            </h3>

            <p className="description mt-3">Available during support hours</p>

            <a className="font-Satoshi font-semibold text-[28px] md:text-[37px] leading-9 text-neutral-5 text-center mt-3">
              Mon–Sat, 10 AM–7 PM
            </a>
          </div>
        </div>
      </Container>

      <img
        src={IMAGES.linnerShape}
        alt=""
        className="absolute left-0 bottom-0"
      />
      <img
        src={IMAGES.linnerShape}
        alt=""
        className="absolute top-0 right-0 rotate-180"
      />
    </div>
  );
};

export default ContactDetails;
