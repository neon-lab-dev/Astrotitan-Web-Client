import { ICONS, IMAGES } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import Container from "../../Reusable/Container/Container";

const GetMyPersonalizedInsights = () => {
  const steps = [
    {
      id: 1,
      icon: ICONS.calendar,
      step: "Step 1",
      title: "Enter your birth details",
      description:
        "Share your date, time, and place to create your personal profile",
    },
    {
      id: 2,
      icon: ICONS.focus,
      step: "Step 2",
      title: "Select what matters to you",
      description:
        "Choose your current focus — career, relationships, health, and more",
    },
    {
      id: 3,
      icon: ICONS.insights,
      step: "Step 3",
      title: "Get personalized insights",
      description:
        "Understand what's working, what to avoid, and what actions to take",
    },
  ];
  return (
    <div className="py-14 bg-primary-25 relative">
      <Container>
        <h2 className="heading text-center">Get clarity in 3 simple steps</h2>
        <p className="description text-center mt-3">
          No astrology knowledge needed. Just answer a few quick questions.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Button label="Get My Personalized Insights" />
        </div>

        <p className="text-xs font-GeneralSans text-center mt-3">
          Takes less than a minute
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 mt-12 relative z-10">
          {steps?.map((item) => (
            <div
              key={item?.id}
              className="bg-neutral-15 border border-primary-5 rounded-xl p-4 md:p-6 flex flex-col items-center text-center"
            >
              <div className="size-9 rounded-full bg-primary-25 flex items-center justify-center">
                <img src={item?.icon} alt="" className="size-6" />
              </div>
              <h2 className="text-neutral-10 font-Satoshi font-semibold text-[28px] leading-9 mt-6">
                {item?.step}
              </h2>
              <h3 className="font-Satoshi font-semibold text-[28px] leading-9 text-neutral-5 mt-3">
                {item?.title}
              </h3>
              <p className="description mt-3">{item?.description}</p>
            </div>
          ))}
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

export default GetMyPersonalizedInsights;
