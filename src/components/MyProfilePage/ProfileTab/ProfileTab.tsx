/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsChatRightDots } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import {
  IoSettingsOutline,
  IoCardOutline,
  IoLocationOutline,
  IoChevronForward,
} from "react-icons/io5";

type TProfileTabProps = {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
const ProfileTab: React.FC<TProfileTabProps> = ({
  user,
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: "personal", label: "Profile Info", icon: <FaUserEdit /> },
    {
      id: "sessionHistory",
      label: "Session History",
      icon: <BsChatRightDots />,
    },
    { id: "subscription", label: "Subscription", icon: <IoCardOutline /> },
    {
      id: "myAddresses",
      label: "My Addresses",
      icon: <IoLocationOutline />,
    },
    { id: "myOrders", label: "My Orders", icon: <IoSettingsOutline /> },
  ];
  return (
    <div className="lg:w-1/3 space-y-6 font-GeneralSans">
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <img
              src={user.profilePicture}
              className="w-32 h-32 rounded-3xl object-cover ring-4 ring-primary-5/10"
              alt="Profile"
            />
            <button className="absolute -bottom-2 -right-2 p-2 border border-primary-5/50 bg-white text-primary-5 hover:text-white rounded-xl shadow-lg hover:bg-primary-5 transition-all">
              <HiPencil size={18} />
            </button>
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-neutral-5">
            {user.fullName}
          </h2>
          <p className="text-neutral-10 text-sm font-medium">
            ID: {user.accountId}
          </p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-sm group ${
                activeTab === tab.id
                  ? "bg-primary-5 text-white shadow-lg shadow-primary-5/30 font-semibold"
                  : "text-neutral-10 hover:bg-slate-50 font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </div>
              <IoChevronForward
                className={
                  activeTab === tab.id
                    ? "opacity-100"
                    : "group-hover:opacity-100 opacity-0"
                }
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileTab;
