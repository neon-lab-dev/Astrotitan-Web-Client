import ContactDetails from "../../components/ContactUsPage/ContactDetails/ContactDetails";
import ContactUsForm from "../../components/ContactUsPage/ContactUsForm/ContactUsForm";
import ContactUsHero from "../../components/ContactUsPage/ContactUsHero/ContactUsHero";

const ContactUs = () => {
    return (
        <div>
            <ContactUsHero/>
            <ContactDetails/>
            <ContactUsForm/>
        </div>
    );
};

export default ContactUs;