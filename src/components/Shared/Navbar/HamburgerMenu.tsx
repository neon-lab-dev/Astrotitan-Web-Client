import { Link, useLocation } from "react-router-dom";
import { ICONS } from "../../../assets";
import { useEffect, useState } from "react";
import { navLinks } from "./navlinks";
import { RxCross2 } from "react-icons/rx";
import Button from "../../Reusable/Button/Button";

const HamburgerMenu = () => {
  const location = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

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

  const user = true;

  return (
    <div className="relative hamburgerMenu flex lg:hidden">
      <button
        onClick={toggleHamburgerMenu}
      >
        <img src={ICONS.menu} alt="menu-icon" />
      </button>

      {/* Background Overlay */}
      <div
        onClick={toggleHamburgerMenu}
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isHamburgerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 bg-white py-8 p-6 w-75 overflow-y-auto transition-all duration-300 transform flex flex-col items-start justify-between ${
          isHamburgerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-10 w-full"> 
          {/* Header */}
          <div className="flex justify-between items-center gap-5 w-full border-b border-neutral-10/50 pb-4">
            <Link to="/" onClick={toggleHamburgerMenu}>
              <img src={ICONS.astrotitanLogo} alt="Logo" className="size-16" />
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
                className={`text-lg font-semibold transition ${
                  location.pathname === link.path
                    ? "text-primary-40 font-bold"
                    : "text-neutral-10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        {!user ? (
          <a
            href={`/`}
            className="w-full"
          >
            <Button label="Dashboard" className="w-full" />
          </a>
        ) : (
          <div className="flex gap-3 w-full text-center">
            <a
              href={`/`}
              className="w-full"
            >
              <Button variant="secondary" label="Sign In" className="w-full" />
            </a>
            <a
              href={`/`}
              className="w-full"
            >
              <Button label="Sign Up" className="w-full" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
