/* eslint-disable @typescript-eslint/no-explicit-any */
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
};
const FeatureSection: React.FC<TFeatureSectionProps> = ({
  title,
  description,
  subDescription,
  buttons,
  images,
}) => {
  return (
    <Container>
      <div className="pt-14 pb-25.5">
        <h2 className="heading text-center">{title}</h2>
        <p className="description mt-3">{description}</p>

        <div className="flex justify-center mt-10">
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

        <div className="w-full overflow-x-auto flex items-center xl:justify-center gap-3 md:gap-14 mt-12">
          {images?.map((image: any) => (
            <img src={image} alt="" className="w-1/2 md:w-2/5 xl:w-fit" />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeatureSection;
