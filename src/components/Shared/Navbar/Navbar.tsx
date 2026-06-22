import { Link, useLocation } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
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
import {
  IoChevronDown,
  IoGridOutline,
  IoPersonOutline,
  IoLogOutOutline,
  IoCalendarOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaStar, FaGem, FaComments } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useCurrentUser, logout } from "../../../redux/Features/Auth/authSlice";

export type TAuthModalType = "login" | "verifyOtp" | "signup";

const Navbar = () => {
  const pathname = useLocation().pathname;
  const user = useSelector(useCurrentUser);
  const dispatch = useDispatch();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<TAuthModalType>("login");
  const [verifyOtpFor, setVerifyOtpFor] = useState<"login" | "signup" | null>(
    null,
  );
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // User Menu State

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null); // User Menu Ref

  const services = [
    {
      label: "Kundli",
      path: "/services/kundli",
      description: "Birth chart analysis",
      icon: FaStar,
    },
    {
      label: "Remedies",
      path: "/services/remedies",
      description: "Astro remedies",
      icon: FaGem,
    },
    {
      label: "Connect",
      path: "/services/connect",
      description: "Chat with experts",
      icon: FaComments,
    },
  ];

  // User Menu Links
  const userMenuItems = [
    {
      label: "Dashboard",
      path: "/dashboard/user",
      icon: <IoGridOutline size={18} />,
    },
    {
      label: "My Profile",
      path: "/dashboard/user/profile",
      icon: <IoPersonOutline size={18} />,
    },
    {
      label: "Session History",
      path: "/dashboard/user/session-history",
      icon: <IoCalendarOutline size={18} />,
    },
    {
      label: "Settings",
      path: "/dashboard/user/account-settings",
      icon: <IoSettingsOutline size={18} />,
    },
    // {
    //   label: "Privacy Policy",
    //   path: "/privacy-policy",
    //   icon: <IoShieldCheckmarkOutline size={18} />,
    // },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

  const getModalContent = () => {
    switch (authModalType) {
      case "login":
        return {
          heading: "Welcome back",
          description: "Sign in to your account",
        };
      case "signup":
        return {
          heading: "Create an account",
          description: "Get started for free",
        };
      case "verifyOtp":
        return {
          heading: "Verify OTP",
          description: "Enter the code sent to your email",
        };
      default:
        return { heading: "", description: "" };
    }
  };

  const { heading, description } = getModalContent();

  return (
    <>
      <div className="py-6 bg-white/90 border-b border-neutral-10/15 font-Satoshi sticky top-0 z-50 backdrop-blur-md">
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
                <button
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className="text-neutral-5 pb-1 group text-lg flex items-center gap-1"
                >
                  Services
                  <IoChevronDown
                    className={`text-sm mt-0.5 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-5 transition-all duration-300 group-hover:w-full"></span>
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseLeave={() => setIsServicesOpen(false)}
                      className="absolute top-[calc(100%+10px)] left-0 w-64 p-2 bg-white rounded-2xl shadow-xl border border-neutral-35/20 z-50"
                    >
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          to={service.path}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-5/5 transition-all group"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          <div className="size-8 rounded-lg bg-primary-5/10 flex items-center justify-center text-primary-5">
                            <service.icon />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-5">
                              {service.label}
                            </p>
                            <p className="text-[10px] text-neutral-10 leading-tight">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Area */}
              <div className="flex items-center gap-3">
                {(pathname === "/products" || pathname === "/cart") && (
                  <Link
                    to="/cart"
                    className="size-10 rounded-full border border-primary-5 hover:bg-primary-5 text-primary-5 hover:text-white transition-all flex items-center justify-center"
                  >
                    <img
                      src={ICONS.cart}
                      className="size-5 brightness-0 group-hover:brightness-100"
                      alt=""
                    />
                  </Link>
                )}

                {user ? (
                  <div ref={userMenuRef} className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-3 p-1 rounded-full sm:rounded-xl sm:pr-3 hover:bg-neutral-20/50 transition-all duration-300 group"
                    >
                      <div className="relative size-9 shrink-0">
                        <img
                          src={IMAGES.rahul}
                          className="size-full rounded-full object-cover ring-2 ring-primary-5/10"
                          alt="Profile"
                        />
                        <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="hidden sm:block text-left leading-tight">
                        <h4 className="text-sm font-bold text-neutral-5">
                          {user?.userName}
                        </h4>
                        <p className="text-[10px] text-neutral-10">
                          {user?.email}
                        </p>
                      </div>
                      <IoChevronDown
                        className={`size-4 text-neutral-10 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-[calc(100%+15px)] right-0 w-56 bg-white rounded-2xl shadow-2xl border border-neutral-35/20 overflow-hidden z-60"
                        >
                          <div className="p-2">
                            {userMenuItems.map((item, idx) => (
                              <Link
                                key={idx}
                                to={item.path}
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl text-neutral-5 hover:bg-primary-5/5 hover:text-primary-5 transition-all font-medium text-sm"
                              >
                                {item.icon}
                                {item.label}
                              </Link>
                            ))}

                            <div className="h-px bg-neutral-10/10 my-2 mx-2" />

                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                            >
                              <IoLogOutOutline size={18} />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
            </div>
            <HamburgerMenu />
          </div>
        </Container>
      </div>

      <Modal isModalOpen={isAuthModalOpen} setIsModalOpen={setIsAuthModalOpen}>
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
          {heading}
        </h2>
        <p className="text-sm text-center mt-1 mb-8">{description}</p>
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
    </>
  );
};

export default Navbar;
