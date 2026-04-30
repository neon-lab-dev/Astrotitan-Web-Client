import FeatureSection from "../../Reusable/FeatureSection/FeatureSection";
import { IMAGES } from "../../../assets";

const GenerateInsights = () => {
  return (
    <FeatureSection
      title="Know what today supports — before you act"
      description="Go beyond generic astrology. Get personalized insights with your kundli, planetary positions, and real-life interpretation."
      buttons={[
        {
          label: "Generate My Insights",
          variant: "primary",
          onClick: () => {},
        },
      ]}
      images={[IMAGES.kundliImg1, IMAGES.kundliImg2, IMAGES.kundliImg3]}
      direction="rightContent"
    />
  );
};

export default GenerateInsights;
