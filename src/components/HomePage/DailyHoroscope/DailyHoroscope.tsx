import { IMAGES } from "../../../assets";
import FeatureSection from "../../Reusable/FeatureSection/FeatureSection";

const DailyHoroscope = () => {
  return (
    <FeatureSection
      title="Your life, mapped through your unique cosmic blueprint"
      description="Get daily guidance powered by your zodiac and current intent — so you
          know when to act, pause, or rethink."
      buttons={[
        {
          label: "See Today’s Insights",
          variant: "primary",
          onClick: () => {},
        },
      ]}
      images={[
        IMAGES.dailyHoroscopeImg1,
        IMAGES.dailyHoroscopeImg2,
        IMAGES.dailyHoroscopeImg3,
      ]}
    />
  );
};

export default DailyHoroscope;
