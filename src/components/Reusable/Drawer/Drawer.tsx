/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type TDrawerProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: string;
  bgColor?: string;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
};

const Drawer: React.FC<TDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  children,
  position = "right",
  width = "w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%]",
  bgColor = "bg-white",
  closeOnBackdropClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  closeButtonClassName = "",
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent body scroll when drawer is open
    if (isDrawerOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isDrawerOpen, closeOnEsc, setIsDrawerOpen]);

  // Animation variants
  const backdropVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const drawerVariants: any = {
    hidden: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 250,
        duration: 0.4,
      },
    },
    exit: {
      x: position === "right" ? "100%" : "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 250,
        duration: 0.3,
      },
    },
  };

  const positionClasses = {
    left: "left-0",
    right: "right-0",
  };
  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          className="fixed inset-0 z-1000 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => closeOnBackdropClick && setIsDrawerOpen(false)}
        >
          <motion.div
            className={`${width} ${positionClasses[position]} h-full fixed top-0 ${bgColor} shadow-2xl overflow-y-auto`}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            {showCloseButton && (
              <button
                className={`absolute top-5.5 right-4 z-10 p-1.5 rounded-full hover:bg-gray-100 transition-colors ${closeButtonClassName}`}
                onClick={() => setIsDrawerOpen(false)}
              >
                <RxCross1 className="text-lg cursor-pointer text-gray-500 hover:text-gray-700" />
              </button>
            )}

            {/* Content */}
            <div className="p-4 md:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
