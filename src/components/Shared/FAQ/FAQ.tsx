import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const FAQ = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<number | null>(0);

  const handleClick = (index: number) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  type FAQItem = {
    title: string;
    description: string | React.ReactNode;
  };

  const faqs: FAQItem[] = [
    {
      title: "Q1. Do I need exact birth time?",
      description:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis sit repellat vero adipisci ab non amet, esse doloribus? Officia hic, eaque corrupti quae iure delectus ea distinctio quisquam, veritatis accusamus minima repellendus eius quo dignissimos laboriosam eum reprehenderit doloribus iste! Corporis ab ut officia non officiis quisquam fuga nulla architecto!",
    },
    {
      title: "Q2: Is my data सुरक्षित?",
      description:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis sit repellat vero adipisci ab non amet, esse doloribus? Officia hic, eaque corrupti quae iure delectus ea distinctio quisquam, veritatis accusamus minima repellendus eius quo dignissimos laboriosam eum reprehenderit doloribus iste! Corporis ab ut officia non officiis quisquam fuga nulla architecto!",
    },
    {
      title: "Q3: Is this only for astrology believers?",
      description:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis sit repellat vero adipisci ab non amet, esse doloribus? Officia hic, eaque corrupti quae iure delectus ea distinctio quisquam, veritatis accusamus minima repellendus eius quo dignissimos laboriosam eum reprehenderit doloribus iste! Corporis ab ut officia non officiis quisquam fuga nulla architecto!",
    },
  ];

  return (
    <Container>
      <div className="py-14">
        <h2 className="heading text-center">
          FAQs (Frequently Asked Questions)
        </h2>
        <motion.div
          className="flex gap-6 flex-col w-full text-neutral-5 mt-12"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {faqs?.map((according, index) => (
            <motion.article
              key={index}
              className={`bg-neutral-15 rounded-xl border border-primary-5 p-4 md:p-6 transform duration-300`}
              variants={itemVariants}
              layout
            >
              <motion.div
                className="flex gap-2 cursor-pointer items-center justify-between w-full"
                onClick={() => handleClick(index)}
              >
                <h2
                  className={`font-Satoshi font-semibold text-[28px] leading-9 ${
                    isAccordingOpen === index && "text-primary-5"
                  }`}
                >
                  {according.title}
                </h2>
                <img
                  src={ICONS.arrowDown}
                  alt=""
                  className={`size-6 transition duration-300 ${
                    isAccordingOpen === index && "rotate-180 text-primary-10"
                  }`}
                />
              </motion.div>

              <AnimatePresence initial={false}>
                {isAccordingOpen === index && (
                  <motion.section
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: "16px" },
                      collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <p className="font-GeneralSans">{according.description}</p>
                  </motion.section>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Container>
  );
};

export default FAQ;
