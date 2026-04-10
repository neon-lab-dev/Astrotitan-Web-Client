import ContactDetails from "../../components/ContactUsPage/ContactDetails/ContactDetails";
import ContactUsForm from "../../components/ContactUsPage/ContactUsForm/ContactUsForm";
import ContactUsHero from "../../components/ContactUsPage/ContactUsHero/ContactUsHero";
import FAQ from "../../components/Shared/FAQ/FAQ";

const ContactUs = () => {
  return (
    <div>
      <ContactUsHero />
      <ContactDetails />
      <ContactUsForm />
      <div className="py-14 md:py-28 xl:py-26">
        <h2 className="heading">
          Your information is सुरक्षित and will only be used to respond to your query.
        </h2>
      </div>
      <FAQ/>
    </div>
  );
};

export default ContactUs;
