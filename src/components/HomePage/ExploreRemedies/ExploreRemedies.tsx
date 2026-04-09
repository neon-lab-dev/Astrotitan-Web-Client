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
      subDescription="Intent-based recommendations • Zodiac-specific suggestions • Trusted by the community"
      images={[IMAGES.remediesImg1, IMAGES.remediesImg2]}
    />
  );
};

export default ExploreRemedies;
