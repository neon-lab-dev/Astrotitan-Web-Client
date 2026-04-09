import { ICONS } from "../../../assets";
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
    <div className="py-14">
      <Container>
        <h2 className="heading text-center">
          Trusted by thousands seeking clarity in everyday decisions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12">
          {features?.map((item) => (
            <HighlightCard key={item?.id} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TrustedBy;
