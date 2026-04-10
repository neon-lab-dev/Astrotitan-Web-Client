import { Link } from "react-router-dom";
import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";
import { navLinks } from "./navlinks";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  return (
    <div className="pt-14 pb-6 bg-background-5 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src={ICONS.astrotitanLogo}
              alt=""
              className="size-13 xl:size-20"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks?.map((item, index) => (
              <Link
                key={index}
                to={item?.path}
                className="relative text-[21px] leading-7.75 text-neutral-5 pb-1 group"
              >
                {item?.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-5 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            <Link to={"/login"}>
              <Button label="Login" />
            </Link>
          </div>
          <HamburgerMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
