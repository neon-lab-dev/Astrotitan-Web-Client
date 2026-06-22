import Container from "../../components/Reusable/Container/Container";
import AstrologerListCard from "../../components/AstrologerPage/AstrologerListCard/AstrologerListCard";
import Filters from "../../components/AstrologerPage/Filters/Filters";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { IoSearchOutline } from "react-icons/io5";
import { useGetAllAstrologersQuery } from "../../redux/Features/Astrologer/astrologerApi";
import type { TAstrologer } from "../../types/astrologer.type";
import { useState } from "react";

const Astrologer = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [areaOfPractice, setAreaOfPractice] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Relevance");

  const { data } = useGetAllAstrologersQuery({
    keyword,
    limit: 10,
    page: 1,
    skip: 0,
    gender,
    areaOfPractice,
    consultLanguages: language,
    sortBy,
  });
  const astrologers = data?.data?.astrologers || [];
  return (
    <Container>
      <div className="pt-10 pb-14">
        <Breadcrumb
          items={[{ label: "Astrologer", path: "/astrologer", isActive: true }]}
        />

        <div className="flex gap-8 font-GeneralSans mt-5">
          {/* Filters Sidebar - Sticky */}
          <div className="w-[35%] sticky top-26 h-fit max-h-[calc(100vh-100px)] overflow-y-auto">
            <Filters
              setGender={setGender}
              setAreaOfPractice={setAreaOfPractice}
              setLanguage={setLanguage}
              setSortBy={setSortBy}
              sortBy={sortBy}
              gender={gender}
              areaOfPractice={areaOfPractice}
              language={language}
            />
          </div>

          {/* Main Content */}
          <div className="w-[65%] space-y-6">
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                className="w-full pl-10 pr-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-5 transition duration-300 bg-white border-neutral-40/30"
                placeholder="Find astrologer by name"
              />
            </div>
            {astrologers?.map((astrologer: TAstrologer) => (
              <AstrologerListCard
                key={astrologer?._id}
                astrologer={astrologer}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Astrologer;
