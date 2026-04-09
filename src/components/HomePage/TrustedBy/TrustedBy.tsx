import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const TrustedBy = () => {
  const features = [
    {
      id: 1,
      icon: ICONS.personalizedLife,
      label: "Personalized for your life & priorities",
      alt: "Personalized life icon",
    },
    {
      id: 2,
      icon: ICONS.pauseOrRethink,
      label: "Know when to act, pause, or rethink",
      alt: "Pause or rethink icon",
    },
    {
      id: 3,
      icon: ICONS.privacy,
      label: "Your data stays private & secure",
      alt: "Privacy icon",
    },
  ];
  return (
    <div className="py-14">
      <Container>
        <h2 className="heading text-center">
          Trusted by thousands seeking clarity in everyday decisions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12">
          {features?.map((item) => (
            <div
              key={item?.id}
              className="bg-neutral-15 border border-primary-5 rounded-xl p-6 flex flex-col items-center gap-6"
            >
              <img src={item?.icon} alt="" className="size-12" />
              <h3 className="font-Satoshi font-bold text-[28px] leading-9 text-neutral-5 text-center">
                {item?.label}
              </h3>{" "}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TrustedBy;
