/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
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
import { Link, useLocation } from "react-router-dom";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../redux/Features/User/userApi";
import { formatDate } from "../../../utils/formatDate";
import toast from "react-hot-toast";

const ProfileTab = () => {
  const { data, refetch } = useGetMeQuery({});
  const [updateProfile, { isLoading: isUploading }] =
    useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profile = data?.data?.profile || {};
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

  const handleProfilePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await updateProfile(formData).unwrap();

      if (response?.success) {
        toast.success("Profile picture updated successfully!");
        refetch(); // Refetch user data to update the UI
      }
    } catch (err: any) {
      console.error("Error updating profile picture:", err);
      toast.error(err?.data?.message || "Failed to update profile picture");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="lg:w-1/3 space-y-6 font-GeneralSans sticky top-26 h-fit">
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <img
              src={profile?.profilePicture || "https://via.placeholder.com/128"}
              className="w-32 h-32 rounded-3xl object-cover ring-4 ring-primary-5/10"
              alt="Profile"
            />

            {/* Upload Button */}
            <button
              onClick={handleEditClick}
              disabled={isUploading}
              className="absolute -bottom-2 -right-2 p-2 border border-primary-5/50 bg-white text-primary-5 hover:text-white rounded-xl shadow-lg hover:bg-primary-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <div className="z-20 animate-spin h-4 w-4 border-2 border-primary-5 border-t-transparent rounded-full" />
              ) : (
                <HiPencil size={18} />
              )}
            </button>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-neutral-5">
            {profile?.fullName ||
              profile?.firstName + " " + profile?.lastName ||
              "User"}
          </h2>
          <p className="text-neutral-10 text-sm mt-1">
            Joined: {formatDate(profile?.createdAt)}
          </p>

          {/* Upload Status */}
          {isUploading && (
            <p className="text-xs text-primary-5 mt-2">Uploading...</p>
          )}
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
