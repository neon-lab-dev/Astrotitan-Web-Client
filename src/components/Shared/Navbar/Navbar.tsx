import { Link } from "react-router-dom";
import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";
import { navLinks } from "./navlinks";
import HamburgerMenu from "./HamburgerMenu";
import Modal from "../../Reusable/Modal/Modal";
import Login from "../../../pages/AuthPages/Login/Login";
import { useState } from "react";
import VerifyOtp from "../../../pages/AuthPages/VerifyOtp/VerifyOtp";
import Signup from "../../../pages/AuthPages/Signup/Signup";
export type TAuthModalType = "login" | "verifyOtp" | "signup";
const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalType, setAuthModalType] = useState<TAuthModalType>("login");
  const [verifyOtpFor, setVerifyOtpFor] = useState<"login" | "signup" | null>(
    null,
  );

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
              <img src={ICONS.astrotitanLogo} alt="" className="size-9" />
              <p className="text-primary-5 text-[28px] font-bold">Astrotitan</p>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
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

              <Button
                onClick={() => {
                  setAuthModalType("login");
                  setIsAuthModalOpen(true);
                }}
                label="Login"
              />
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
          <Signup setAuthModalType={setAuthModalType} />
        )}
        {authModalType === "verifyOtp" && (
          <VerifyOtp verifyOtpFor={verifyOtpFor} />
        )}
      </Modal>
    </div>
  );
};

export default Navbar;
