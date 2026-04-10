import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const ContactDetails = () => {
  return (
    <div className="py-14">
      <Container>
        <h2 className="heading text-center">Contact Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-12">
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

            <p className="description mt-3">
              Available during support hours
            </p>

            <a
              className="font-Satoshi font-semibold text-[28px] md:text-[37px] leading-9 text-neutral-5 text-center mt-3"
            >
              Mon–Sat, 10 AM–7 PM
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactDetails;
