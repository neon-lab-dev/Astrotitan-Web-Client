import Container from "../../Reusable/Container/Container";

const ContactUsHero = () => {
  return (
    <Container>
      <div className="pt-12 pb-12 md:pb-20 xl:pb-30">
        <h1 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 text-center max-w-282 mx-auto">
          We’re here to help
        </h1>
        <p className="text-base md:text-[21px] font-GeneralSans leading-7.75 text-center max-w-282 mx-auto mt-3">
          Have a question, need support, or want guidance? Reach out — we’ll get
          back to you as soon as possible.
        </p>
      </div>
    </Container>
  );
};

export default ContactUsHero;
