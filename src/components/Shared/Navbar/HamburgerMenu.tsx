/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import { useEffect, useState, useRef } from "react";
import { navLinks } from "./navlinks";
import { RxCross2 } from "react-icons/rx"; // Added hamburger icon
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
      icon: FaStar,
    },
    {
      label: "Remedies",
      path: "/services/remedies",
      icon: FaGem,
    },
    {
      label: "Connect with Astrologers",
      path: "/astrologer",
      icon: FaComments,
    },
  ];

  const toggleHamburgerMenu = () => setIsHamburgerOpen(!isHamburgerOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsHamburgerOpen(false);
      }
    };
    if (isHamburgerOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isHamburgerOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsHamburgerOpen(false);
  }, [location]);

  return (
    <div className="relative lg:hidden" ref={menuRef}>
      {/* Toggle Button */}
      <button
        className="bg-white p-2 border border-primary-10 cursor-pointer rounded-lg flex items-center justify-center transition-colors hover:bg-gray-50"
        onClick={toggleHamburgerMenu}
        aria-label="Toggle Menu"
      >
        {isHamburgerOpen ? (
          <RxCross2 className="text-2xl text-neutral-10" />
        ) : (
          <img src={ICONS.menu} alt="menu" className="w-6 h-6" />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isHamburgerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+12px)] right-0 w-[90vw] md:w-80 bg-white shadow-2xl rounded-2xl border border-neutral-10/10 overflow-hidden z-[999] origin-top-right"
          >
            <div className="p-5 flex flex-col gap-6">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-primary-5"
                        : "text-neutral-10 hover:text-primary-5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Services Nested Dropdown */}
                <div className="flex flex-col border-t border-neutral-10/5 pt-4">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center justify-between w-full text-neutral-10 font-medium"
                  >
                    Services
                    <motion.div
                      animate={{ rotate: isServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoChevronDown />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-1 mt-3 pl-3 border-l-2 border-primary-5/20">
                          {services.map((service, idx) => (
                            <Link
                              key={idx}
                              to={service.path}
                              className="py-2 text-sm text-neutral-10/80 hover:text-primary-5 transition-colors"
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>

              {/* Auth Buttons */}
              <div className="pt-4 border-t border-neutral-10/5">
                {user ? (
                  <div className="flex flex-col space-y-3">
                    <Link to="/dashboard/user/profile" className="w-full">
                      <Button
                        variant="secondary"
                        label="My Profile"
                        className="w-full"
                      />
                    </Link>
                    <Link to="/dashboard" className="w-full">
                      <Button label="Dashboard" className="w-full" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" className="w-full">
                      <Button
                        variant="secondary"
                        label="Sign In"
                        className="w-full"
                      />
                    </Link>
                    <Link to="/signup" className="w-full">
                      <Button label="Sign Up" className="w-full" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
