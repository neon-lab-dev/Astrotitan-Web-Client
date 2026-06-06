import { Link } from "react-router-dom";
import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";
import { navLinks } from "./navlinks";
import HamburgerMenu from "./HamburgerMenu";
import Modal from "../../Reusable/Modal/Modal";
import Login from "../../AuthComponents/Login/Login";
import { useState, useRef, useEffect } from "react";
import VerifyOtp from "../../AuthComponents/VerifyOtp/VerifyOtp";
import Signup from "../../AuthComponents/Signup/Signup";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { FaStar, FaGem, FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";

export type TAuthModalType = "login" | "verifyOtp" | "signup";

const Navbar = () => {
  const user = useSelector(useCurrentUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<TAuthModalType>("login");
  const [verifyOtpFor, setVerifyOtpFor] = useState<"login" | "signup" | null>(
    null,
  );
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getModalContent = () => {
    switch (authModalType) {
      case "login":
        return {
          heading: "Welcome back",
          description: "Please enter your details to sign in to your account",
        };
      case "signup":
        return {
          heading: "Create an account",
          description: "Get started with your free account today",
        };
      case "verifyOtp":
        return {
          heading: "Verify OTP",
          description: "Enter the 4-digit code sent to your email address",
        };
    }
  };

  const { heading, description } = getModalContent();

  return (
    <div>
      <div className="py-6 bg-background-5 font-Satoshi">
        <Container>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={IMAGES.logo} alt="" className="size-9" />
              <p className="text-primary-5 text-[28px] font-bold">Astrotitan</p>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks?.map((item, index) => (
                <Link
                  key={index}
                  to={item?.path}
                  className="relative text-neutral-5 pb-1 group text-lg"
                >
                  {item?.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-5 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              {/* Services Dropdown */}
              <div ref={dropdownRef} className="relative">
                <div
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className="relative text-neutral-5 pb-1 group text-lg cursor-pointer flex items-center gap-1"
                >
                  Services
                  <motion.div
                    animate={{ rotate: isServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <IoChevronDown className="text-sm mt-0.5" />
                  </motion.div>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-5 transition-all duration-300 group-hover:w-full"></span>
                </div>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      className="absolute top-full left-0 w-80 p-4 bg-white rounded-xl shadow-lg border border-neutral-35/30 overflow-hidden z-50"
                    >
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          to={service.path}
                          className="flex transition-all duration-200 group"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="flex-1">
                            <div className="text-neutral-5 group-hover:text-primary-10 transition-colors">
                              {service.label}
                            </div>
                            <div className="text-xs text-neutral-50">
                              {service.description}
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1">
                            <svg
                              className="w-4 h-4 text-primary-10"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {user ? (
                <Link to="/dashboard">
                  <Button label="Dashboard" />
                </Link>
              ) : (
                <Button
                  onClick={() => {
                    setAuthModalType("login");
                    setIsAuthModalOpen(true);
                  }}
                  label="Login"
                />
              )}
            </div>
            <HamburgerMenu />
          </div>
        </Container>
      </div>

      <Modal isModalOpen={isAuthModalOpen} setIsModalOpen={setIsAuthModalOpen}>
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
          {heading}
        </h2>
        <p className="text-sm font-GeneralSans text-center mt-1 mb-8">
          {description}
        </p>
        {authModalType === "login" && (
          <Login
            setAuthModalType={setAuthModalType}
            setVerifyOtpFor={setVerifyOtpFor}
          />
        )}
        {authModalType === "signup" && (
          <Signup
            setAuthModalType={setAuthModalType}
            setVerifyOtpFor={setVerifyOtpFor}
          />
        )}
        {authModalType === "verifyOtp" && (
          <VerifyOtp verifyOtpFor={verifyOtpFor} />
        )}
      </Modal>
    </div>
  );
};

export default Navbar;
