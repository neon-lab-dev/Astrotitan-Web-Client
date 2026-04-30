/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  images?: string[];
  direction?: "leftContent" | "rightContent";
};

const FeatureSection: React.FC<TFeatureSectionProps> = ({
  title,
  description,
  subDescription,
  buttons,
  images = [],
  direction = "leftContent",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 3500);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  return (
    <Container>
      <div
        className={`py-10 flex flex-col items-center justify-between gap-14 lg:gap-0 ${
          direction === "leftContent" ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Left side */}
        <div className="text-left w-full lg:w-1/2 relative">
          <img
            src={IMAGES.linnerShape2}
            alt=""
            className="w-1/2 md:w-2/6 hidden lg:block"
          />
          <img
            src={IMAGES.linnerShape2}
            alt=""
            className="w-1/2 md:w-2/6 absolute top-0 right-0"
          />
          <h2 className="heading max-w-130">{title}</h2>
          <p className="description max-w-133 mt-3">{description}</p>

          <div className="flex mt-6 gap-4">
            {buttons?.map((button, i) => (
              <Button
                key={i}
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
          <img
            src={IMAGES.linnerShape2}
            alt=""
            className="w-1/2 md:w-2/6 hidden lg:block"
          />
        </div>

        {/* Right side - Replicated UI Card Positioning */}
        <div className="relative flex items-center justify-center w-full xl:w-1/2 min-h-[450px] md:min-h-[500px] lg:min-h-[650px] overflow-hidden">
          {/* Background decorative shape */}
          <img
            src={IMAGES.featureSectionBg}
            alt=""
            className="absolute inset-0 -left-12 w-full h-full object-contain opacity-50"
          />

          <div className="relative w-full h-full flex items-center justify-center">
            {images.length > 1 ? (
              <AnimatePresence mode="wait">
                {/* Background Card */}
                <motion.div
                  key={`bg-${(index + 1) % images.length}`}
                  initial={{ opacity: 0, x: -30, y: 10, rotate: -5 }}
                  animate={{
                    opacity: 1,
                    // Smaller offset on mobile (xs), larger on tablet (md+)
                    x: window.innerWidth < 768 ? -40 : -80,
                    y: window.innerWidth < 768 ? 15 : 30,
                    rotate: -8,
                  }}
                  exit={{ opacity: 0, x: -60 }}
                  // Responsive width: 55% on mobile, fixed on tablet+
                  className="absolute z-0 w-[55%] md:w-[280px] aspect-[9/19]"
                >
                  <img
                    src={images[(index + 1) % images.length]}
                    className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-lg border-2 md:border-4 border-white/10"
                    alt="next-card"
                  />
                </motion.div>

                {/* Main Foreground Card */}
                <motion.div
                  key={`main-${index}`}
                  initial={{ opacity: 0, x: 30, scale: 0.9, rotate: 5 }}
                  animate={{
                    opacity: 1,
                    x: window.innerWidth < 768 ? 15 : 20,
                    scale: 1,
                    rotate: 0,
                  }}
                  exit={{ opacity: 0, x: -30, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  // Responsive width
                  className="relative z-10 w-[55%] md:w-[280px] aspect-[9/19]"
                >
                  <img
                    src={images[index]}
                    className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-2 md:border-4 border-white/20"
                    alt="active-card"
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              /* Single Image Logic */
              images[0] && (
                <div className="w-[60%] md:w-[280px] aspect-[9/19] z-10">
                  <img
                    src={images[0]}
                    alt="feature"
                    className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-xl"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeatureSection;
