import { IMAGES } from "../../../assets";
import FeatureSection from "../../Reusable/FeatureSection/FeatureSection";

const TalkToAstrologer = () => {
  return (
    <FeatureSection
      title="Need deeper clarity? Talk to real astrologers"
      description="Connect with verified experts for personalized advice when you need more than insights."
      buttons={[
        {
          label: "Talk To An Astrologer",
          variant: "primary",
          onClick: () => {},
        },
      ]}
      subDescription="Available via chat & call"
      images={[
        IMAGES.talkToAstorlogerImg1,
        IMAGES.talkToAstorlogerImg2,
        IMAGES.talkToAstorlogerImg3,
      ]}
    />
  );
};

export default TalkToAstrologer;
