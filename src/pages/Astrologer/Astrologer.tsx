import Container from "../../components/Reusable/Container/Container";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import AstrologerListCard from "./AstrologerListCard";
import Filters from "./Filters";

const Astrologer = () => {
  return (
    <Container>
      <nav className="flex items-center gap-2 text-sm font-GeneralSans pt-10">
        <Link
          to="/"
          className="flex items-center gap-1 text-gray-500 hover:text-primary-5 transition-colors"
        >
          <IoHomeOutline className="w-4 h-4" />
          Home
        </Link>
        <MdNavigateNext className="w-4 h-4 text-gray-400" />
        <span className="text-primary-5 font-medium">Astrologer</span>
      </nav>

      <div className="flex gap-10 font-GeneralSans pb-14 mt-5">
        {/* Filters Sidebar - Sticky */}
        <div className="w-[35%] sticky top-4 h-fit max-h-[calc(100vh-100px)] overflow-y-auto">
          <Filters />
        </div>

        {/* Main Content */}
        <div className="w-[65%] space-y-6">
          <div className="relative w-full">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-5 transition duration-300 bg-white border-neutral-40/30"
              placeholder="Find astrologer by name"
            />
          </div>
          <AstrologerListCard />
          <AstrologerListCard />
          <AstrologerListCard />
          <AstrologerListCard />
          <AstrologerListCard />
          <AstrologerListCard />
          <AstrologerListCard />
          <AstrologerListCard />
        </div>
      </div>
    </Container>
  );
};

export default Astrologer;
