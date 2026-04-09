import { ICONS } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const Navbar = () => {
  return (
    <div>
      <Container>
        <div>
          <img src={ICONS.astrotitanLogo} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
