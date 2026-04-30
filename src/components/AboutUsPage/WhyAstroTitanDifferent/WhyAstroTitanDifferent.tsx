import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import HighlightCard from "../../Reusable/HighlightCard/HighlightCard";

const WhyAstroTitanDifferent = () => {
  const whyAstroTitanDifferent = [
    {
      id: 1,
      icon: ICONS.insights,
      title: "Intent-based insights",
      description: "Astrology aligned with what actually matters in your life",
    },
    {
      id: 2,
      icon: ICONS.pauseOrRethink,
      title: "Action-focused guidance",
      description:
        "Not just predictions, but clear direction on what to do next",
    },
    {
      id: 3,
      icon: ICONS.evolvingGuidance,
      title: "Built for everyday decisions",
      description: "Simple, practical, and easy to use",
    },
  ];
  return (
    <div className="py-14 bg-primary-25 relative">
      <Container>
        <h2 className="heading text-center">
          What makes AstroTitan different?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12 relative z-10">
          {whyAstroTitanDifferent?.map((item) => (
            <HighlightCard key={item?.id} item={item} />
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

export default WhyAstroTitanDifferent;
