/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMAGES } from "../../../assets";
import Button from "../Button/Button";
import Container from "../Container/Container";
type TButtons = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};
type TFeatureSectionProps = {
  title: string;
  description: string;
  subDescription?: string;
  buttons?: TButtons[];
  images?: any;
  direction?: string;
};
const FeatureSection: React.FC<TFeatureSectionProps> = ({
  title,
  description,
  subDescription,
  buttons,
  images,
  direction = "leftContent",
}) => {
  return (
    <Container>
      <div
        className={`py-10 ${direction === "leftContent" ? "flex" : "flex flex-row-reverse"} items-center justify-between`}
      >
        {/* Left side */}
        <div className={`text-left w-1/2  `}>
          <img src={IMAGES.linnerShape2} alt="" className="w-1/2 md:w-2/6" />
          <h2 className="heading max-w-130">{title}</h2>
          <p className="description max-w-133 mt-3">{description}</p>

          <div className="flex mt-6">
            {buttons?.map((button: TButtons) => (
              <Button
                onClick={button?.onClick}
                variant={button?.variant}
                label={button?.label}
              />
            ))}
          </div>

          {subDescription && (
            <p className="text-xs font-GeneralSans text-center mt-3">
              {subDescription}
            </p>
          )}

          <img src={IMAGES.linnerShape2} alt="" className="w-1/2 md:w-2/6" />
        </div>

        {/* Right side - Images */}
        {/* className="w-full overflow-x-auto flex items-center xl:justify-center gap-3 md:gap-14 mt-12" */}
        <div className="relative flex items-center justify-center w-1/2">
          <img
            src={IMAGES.featureSectionBg}
            alt=""
            className="absolute top-0 bottom-0 right-0 -left-5 w-full"
          />
          {images.slice(0, 1)?.map((image: any) => (
            <img
              src={image}
              alt=""
              className="w-1/2 md:w-2/5 2xl:w-fit relative z-10"
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeatureSection;
