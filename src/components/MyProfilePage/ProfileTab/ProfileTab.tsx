import { BsChatRightDots } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import {
  IoSettingsOutline,
  IoCardOutline,
  IoLocationOutline,
  IoChevronForward,
  IoCalendarOutline,
  IoBagOutline,
} from "react-icons/io5";
import { IMAGES } from "../../../assets";
import { Link, useLocation } from "react-router-dom";

const ProfileTab = () => {
  const pathname = useLocation().pathname;
  const profileNavigationLinks = [
    {
      path: "/dashboard/user/profile",
      label: "Profile Info",
      icon: <FaUserEdit />,
    },
    {
      path: "/dashboard/user/session-history",
      label: "Session History",
      icon: <BsChatRightDots />,
    },
    {
      path: "/dashboard/user/subscriptions",
      label: "Subscription",
      icon: <IoCardOutline />,
    },
    {
      path: "/dashboard/user/addresses",
      label: "My Addresses",
      icon: <IoLocationOutline />,
    },
    {
      path: "/dashboard/user/my-orders",
      label: "My Orders",
      icon: <IoBagOutline />,
    },
    {
      path: "/dashboard/user/puja-bookings",
      label: "Puja Bookings",
      icon: <IoCalendarOutline />,
    },
    {
      path: "/dashboard/user/account-settings",
      label: "Account Settings",
      icon: <IoSettingsOutline />,
    },
  ];
  const user = {
    accountId: "ACC123456",
    profilePicture: IMAGES.rahul,
    firstName: "Rahul",
    lastName: "Sutradhar",
    fullName: "Rahul Sutradhar",
    gender: "Male",
    dateOfBirth: "May 15, 1995",
    timeOfBirth: "08:30 AM",
    placeOfBirth: "Kolkata, West Bengal",
    intents: ["Career", "Education", "Health", "Relationships"],
    zodiacSign: "Pisces",
    country: "India",
    email: "rahul.sutradhar@example.com",
    phoneNumber: "+91 98765 43210",
  };
  return (
    <div className="lg:w-1/3 space-y-6 font-GeneralSans sticky top-26 h-fit">
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
          {profileNavigationLinks?.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-sm group ${
                pathname === link.path
                  ? "bg-primary-5 text-white shadow-lg shadow-primary-5/30 font-semibold"
                  : "text-neutral-10 hover:bg-slate-50 font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </div>
              <IoChevronForward
                className={
                  pathname === link.path
                    ? "opacity-100"
                    : "group-hover:opacity-100 opacity-0"
                }
              />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileTab;
