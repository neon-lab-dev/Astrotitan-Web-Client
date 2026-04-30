import { IMAGES } from "../../../assets";
import FeatureSection from "../../Reusable/FeatureSection/FeatureSection";

const ExploreRemedies = () => {
  return (
    <FeatureSection
      title="Don’t just know — take action to improve outcomes"
      description="Explore remedies, pooja services, and expert-recommended products tailored to your zodiac and intentions."
      buttons={[
        {
          label: "Explore Remedies",
          variant: "primary",
          onClick: () => {},
        },
      ]}
      images={[IMAGES.remediesImg1, IMAGES.remediesImg2]}
      direction="rightContent"
    />
  );
};

export default ExploreRemedies;
