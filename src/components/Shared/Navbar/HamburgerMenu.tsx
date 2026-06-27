import { Link, useLocation } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import { useEffect, useState, useRef } from "react";
import { navLinks } from "./navlinks";
import { RxCross2 } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import { FaStar, FaGem, FaComments } from "react-icons/fa";
import Button from "../../Reusable/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";

const HamburgerMenu = () => {
  const user = useSelector(useCurrentUser);
  const location = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      label: "Kundli",
      path: "/services/kundli",
      description: "Get your detailed birth chart analysis",
      icon: FaStar,
    },
    {
      label: "Remedies",
      path: "/services/remedies",
      description: "Personalized astrological remedies",
      icon: FaGem,
    },
    {
      label: "Connect with Astrologer",
      path: "/services/connect",
      description: "Chat with expert astrologers",
      icon: FaComments,
    },
  ];

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const closestDropdown = target.closest(".hamburgerMenu");
      if (isHamburgerOpen && closestDropdown === null) {
        setIsHamburgerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isHamburgerOpen]);

  // Prevent body scroll when hamburger menu is open
  useEffect(() => {
    if (isHamburgerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isHamburgerOpen]);

  return (
    <div className="relative hamburgerMenu flex lg:hidden">
      <button
        className="bg-white py-2 px-3 border border-primary-10 cursor-pointer w-fit rounded-lg flex items-center justify-center"
        onClick={toggleHamburgerMenu}
      >
        <img src={ICONS.menu} alt="menu-icon" />
      </button>

      {/* Background Overlay */}
      <div
        onClick={toggleHamburgerMenu}
        className={`fixed inset-0 bg-black/50 z-50 h-screen transition-opacity duration-300 ${
          isHamburgerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Side Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-9999 bg-white w-77 h-screen py-8 px-6 overflow-y-auto transition-transform duration-300 transform flex flex-col items-start justify-between ${
          isHamburgerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10 w-full">
          {/* Header */}
          <div className="flex justify-between items-center gap-5 w-full border-b border-neutral-10/50 pb-4">
            <Link to="/" onClick={toggleHamburgerMenu}>
              <img src={IMAGES.logo} alt="Logo" className="size-16" />
            </Link>
            <button onClick={toggleHamburgerMenu}>
              <RxCross2 className="text-neutral-10 text-2xl" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleHamburgerMenu}
                className={`transition ${
                  location.pathname === link.path
                    ? "text-primary-5 font-medium"
                    : "text-neutral-10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown for Mobile */}
            <div className="flex flex-col">
              <button
                onClick={toggleServices}
                className={`flex items-center justify-between w-full transition ${
                  isServicesOpen ? "text-primary-5" : "text-neutral-10"
                }`}
              >
                Services
                <motion.div
                  animate={{ rotate: isServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IoChevronDown className="text-base" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="flex flex-col gap-2">
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          to={service.path}
                          onClick={toggleHamburgerMenu}
                          className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary-5/5 transition-all duration-200 group"
                        >
                          <p className="text-sm font-medium text-neutral-10 group-hover:text-primary-5 transition-colors">
                            {service.label}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        {user ? (
          <a href={`/`} className="w-full">
            <Button label="Dashboard" className="w-full" />
          </a>
        ) : (
          <div className="flex gap-3 w-full text-center">
            <a href={`/`} className="w-full">
              <Button variant="secondary" label="Sign In" className="w-full" />
            </a>
            <a href={`/`} className="w-full">
              <Button label="Sign Up" className="w-full" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
