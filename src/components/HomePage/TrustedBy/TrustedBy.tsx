import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import HighlightCard from "../../Reusable/HighlightCard/HighlightCard";

const TrustedBy = () => {
  const features = [
    {
      id: 1,
      icon: ICONS.personalizedLife,
      title: "Personalized for your life & priorities",
    },
    {
      id: 2,
      icon: ICONS.pauseOrRethink,
      title: "Know when to act, pause, or rethink",
    },
    {
      id: 3,
      icon: ICONS.privacy,
      title: "Your data stays private & secure",
    },
  ];
  return (
    <div className="py-14 bg-primary-25 relative">
      <Container>
        <h2 className="heading text-center">
          Trusted by thousands seeking clarity in everyday decisions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12 relative z-10">
          {features?.map((item) => (
            <HighlightCard key={item?.id} item={item} />
          ))}
        </div>
      </Container>

      <img src={IMAGES.linnerShape} alt="" className="absolute left-0 bottom-0" />
      <img src={IMAGES.linnerShape} alt="" className="absolute top-0 right-0 rotate-180" />
    </div>
  );
};

export default TrustedBy;
