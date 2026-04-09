import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import HighlightCard from "../../Reusable/HighlightCard/HighlightCard";

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: ICONS.focus,
      title: "Choose your focus areas",
    },
    {
      id: 2,
      icon: ICONS.evolvingGuidance,
      title: "Dynamic, evolving guidance",
    },
    {
      id: 3,
      icon: ICONS.insights,
      title: "Personalized insights",
    },
  ];
  return (
    <div className="py-14">
      <Container>
        <h2 className="heading text-center">
          Astrology aligned with what matters to you
        </h2>
        <p className="description text-center mt-3">
          Whether it’s career, relationships, or health — see how planetary
          movements support your current priorities.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12">
          {benefits?.map((item) => (
            <HighlightCard key={item?.id} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Benefits;
