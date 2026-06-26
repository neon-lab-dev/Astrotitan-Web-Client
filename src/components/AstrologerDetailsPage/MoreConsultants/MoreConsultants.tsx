import { LuUserRoundCheck } from "react-icons/lu";
import AstrologerListCard from "../../AstrologerPage/AstrologerListCard/AstrologerListCard";
import type { TAstrologer } from "../../../types/astrologer.type";

const MoreConsultants = ({ data }: { data: TAstrologer[] }) => {
  return (
    <>
      <p className="text-neutral-5 font-Satoshi font-medium mb-4">
        <LuUserRoundCheck className="inline mb-0.5 mr-1" /> More Verified
        Consultants
      </p>
      <div className="space-y-5">
        {data?.map((astrologer: TAstrologer) => (
          <AstrologerListCard
            key={astrologer?._id}
            astrologer={astrologer}
            isActionButtonsVisible={false}
          />
        ))}
      </div>
    </>
  );
};

export default MoreConsultants;
