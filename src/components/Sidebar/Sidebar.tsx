import { IMAGES } from "../../assets";

const Sidebar = () => {
  return (
    <div className="top-0 left-0 hidden xl:block">
      <div className="w-[230px] 2xl:w-[270px] h-full bg-neutral-15 p-5 font-Nunito flex flex-col gap-5 justify-between">
        <div className="flex flex-col items-center text-center text-neutral-5">
          <img src={IMAGES.logo} alt="" className="size-40" />
          <h2 className="text-xl font-bold font-Satoshi mt-6">
            Astrology, Made Clear
          </h2>
          <p className="font-GeneralSans mt-2">
            Personalized insights designed for real-life decisions.
          </p>
        </div>
        <hr className="border border-neutral-50/30" />
        {/* <div className="flex flex-col gap-4 h-full xl:h-[380px] 2xl:h-[600px] overflow-y-auto custom-scrollbar-sidebar">
          <RoleBasedNavlinks />

          <hr className="border border-neutral-50/30" />
          <OtherLinks user={user} />
        </div> */}

        {/* <button
          onClick={handleLogout}
          className={`text-lg flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 text-white font-semibold cursor-pointer`}
        >
          <TbLogout2 className="text-xl" />
          Sign Out
        </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
