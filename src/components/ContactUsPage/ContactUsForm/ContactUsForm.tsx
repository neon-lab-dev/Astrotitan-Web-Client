import { useForm } from "react-hook-form";
import Container from "../../Reusable/Container/Container";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import Button from "../../Reusable/Button/Button";

const ContactUsForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div className="py-14">
      <Container>
        <h2 className="heading text-center">Contact Us</h2>

        <form className="space-y-8.25 flex items-center flex-col w-full mt-12 lg:mt-24.75">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8.25 w-full">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.fullName}
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            <TextInput
              label="Email Address"
              placeholder="Enter your email address"
              error={errors.email}
              {...register("email", {
                required: "Email address is required",
              })}
            />
          </div>
          <Textarea
            label="Message"
            placeholder="Write your message here...."
            error={errors.message}
            rows={8}
            {...register("message", {
              required: "This field is required",
            })}
          />

          <Button label="Send Message" type="submit" />
        </form>
        <p className="text-xs font-GeneralSans text-center mt-6">
          We usually respond within 24 hours
        </p>
      </Container>
    </div>
  );
};

export default ContactUsForm;
