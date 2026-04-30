import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const WhyAstroTitanExists = () => {
  return (
    <div className="py-14 xl:py-20">
      <Container>
        <div className="flex flex-col md:flex-row gap-10 xl:gap-0 items-center justify-between">
          <div>
            <h2 className="heading max-w-130">Why Astrotitan Exists</h2>
            <p className="description max-w-133 mt-3">
              Most astrology tells you what might happen. Astrotitan is built to
              help you decide what to do next. Instead of overwhelming
              predictions, we focus on clarity - so you can move forward with
              confidence.
            </p>
          </div>

          <img src={IMAGES.saturn} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default WhyAstroTitanExists;
