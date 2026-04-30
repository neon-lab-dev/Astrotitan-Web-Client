import { ICONS, IMAGES } from "../../assets";
import ContactDetails from "../../components/ContactUsPage/ContactDetails/ContactDetails";
import ContactUsForm from "../../components/ContactUsPage/ContactUsForm/ContactUsForm";
import ContactUsHero from "../../components/ContactUsPage/ContactUsHero/ContactUsHero";
import Benefits from "../../components/HomePage/Benefits/Benefits";
import FAQ from "../../components/Shared/FAQ/FAQ";

const ContactUs = () => {
  const benefits = [
    {
      id: 1,
      icon: ICONS.pauseOrRethink,
      title: "Personalized Support",
      description:
        "Tailored responses based on your situation — not generic answers.",
    },
    {
      id: 2,
      icon: ICONS.personalizedLife,
      title: "Real Experts",
      description:
        "Connect with experienced astrologers and a thoughtful support team.",
    },
    {
      id: 4,
      icon: ICONS.privacy,
      title: "Private & Secure",
      description: "Your information is handled with complete confidentiality.",
    },
  ];
  return (
    <div>
      <ContactUsHero />
      <Benefits
        heading={"Trusted by thousands seeking clarity in everyday decisions"}
        benefits={benefits}
      />
      <ContactUsForm />
      <ContactDetails />
      <div className="py-14 xl:py-30 relative">
        <img
          src={IMAGES.featureSectionBg}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 w-1/3"
        />
        <h2 className="heading max-w-332 mx-auto text-center">
          Your information is <strong>सुरक्षित</strong> and will only be used to respond to your query.
        </h2>
      </div>
      <FAQ />
    </div>
  );
};

export default ContactUs;
