/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import HighlightCard from "../../Reusable/HighlightCard/HighlightCard";

const Benefits = ({ heading, benefits }: any) => {
  return (
    <div className="py-14 bg-primary-25 relative">
      <Container>
        <h2 className="heading text-center">{heading}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12 relative z-10">
          {benefits?.map((item: any) => (
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

export default Benefits;
