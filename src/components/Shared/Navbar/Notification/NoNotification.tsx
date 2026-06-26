import { FaRegBell } from "react-icons/fa";

const NoNotification = ({ activeTab }: { activeTab: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
      <FaRegBell className="text-[56px] md:text-[76px] mb-3 opacity-60" />
      <p className="text-lg font-medium text-gray-500">No notifications</p>
      <p className="text-sm text-gray-400 mt-1">
        {activeTab === "Unread"
          ? "You're all caught up!"
          : "No notifications yet"}
      </p>
    </div>
  );
};

export default NoNotification;
