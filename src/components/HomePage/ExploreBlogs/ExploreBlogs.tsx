import { IMAGES } from "../../../assets";
import FeatureSection from "../../Reusable/FeatureSection/FeatureSection";

const ExploreBlogs = () => {
  return (
    <FeatureSection
      title="Understand the “why” behind your experiences"
      description="Explore daily insights, astrology guides, and deeper explanations of planetary effects."
      buttons={[
        {
          label: "Explore Insights",
          variant: "primary",
          onClick: () => {},
        },
      ]}
      images={[IMAGES.blogImg1, IMAGES.blogImg2]}
    />
  );
};

export default ExploreBlogs;
