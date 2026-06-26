/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "../../../../assets";
import { useGetMyNotificationsQuery } from "../../../../redux/Features/Notification/notificationApi";
import NotificationCard from "./NotificationCard";
import NoNotification from "./NoNotification";
import { connectSocket, disconnectSocket } from "../../../../utils/socket";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../../redux/Features/Auth/authSlice";

const Notification = () => {
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [activeTab, setActiveTab] = useState<string>("Unread");
  const tabButtons = ["Unread", "All"];
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownVariants: any = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -45,
      y: -15,
      x: 15,
      transformOrigin: "top right",
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      y: 0,
      x: 0,
      transformOrigin: "top right",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const { data: myNotifications } = useGetMyNotificationsQuery({});

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (myNotifications?.data) {
      const sorted = [...myNotifications.data].sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setNotifications(sorted);
    }
  }, [myNotifications?.data]);

  // --- Socket for live notifications ---

  useEffect(() => {
    if (!user?._id) {
      console.log("⚠️ No user, skipping socket connection");
      return;
    }

    console.log("🔌 Connecting socket for user:", user._id);

    // ✅ Create and connect socket
    const socket = connectSocket(user._id);
    console.log("📡 Socket instance:", socket);
    console.log("📡 Socket connected:", socket?.connected);

    if (!socket) {
      console.error("❌ Failed to create socket");
      return;
    }

    // ✅ Set up event listeners
    const onConnect = () => {
      console.log("🔌 Socket connected:", socket.id);
    };

    const onNotification = (data: any) => {
      console.log("🔔 New notification:", data);
      setNotifications((prev) => [data, ...prev]);
    };

    const onOnlineUsers = (users: string[]) => {
      console.log("👥 Online users:", users);
    };

    socket.on("connect", onConnect);
    socket.on("new-notification", onNotification);
    socket.on("onlineUsers", onOnlineUsers);

    // ✅ If socket is already connected, log it
    if (socket.connected) {
      console.log("✅ Socket already connected:", socket.id);
    }

    return () => {
      console.log("🧹 Cleaning up socket listeners");
      socket.off("connect", onConnect);
      socket.off("new-notification", onNotification);
      socket.off("onlineUsers", onOnlineUsers);
      disconnectSocket();
    };
  }, [user?._id]);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "Unread") {
      return !notification.isRead;
    }
    return true; // Show all for "All" tab
  });

  // Calculate unread count
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setIsNotificationOpen((prev) => !prev)}
        className="size-8 rounded-full border border-primary-5 hover:bg-neutral-20 text-primary-5 hover:text-white transition-all flex items-center justify-center"
      >
        <img
          src={ICONS.notification}
          alt="notification-icon"
          className="size-5"
        />
        <div className="bg-gradient-to-r from-rose-400 to-red-500 size-4 rounded-full flex items-center justify-center text-xs text-white absolute -top-1 -right-[2px]">
          {unreadCount}
        </div>
      </button>

      <div style={{ perspective: "1000px" }} className="z-50">
        <AnimatePresence>
          {isNotificationOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="absolute top-full -right-10 md:right-0 mt-2 w-[300px] md:w-[350px] bg-white rounded-lg shadow-lg z-10 border border-gray-200"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Notifications
                </h3>

                <div className="flex items-center gap-5 border-b border-neutral-30/20 relative">
                  {tabButtons?.map((tab, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(tab)}
                      className={`relative pb-2 px-1 transition-colors duration-200 cursor-pointer ${
                        activeTab === tab
                          ? "text-primary-10 font-semibold"
                          : "text-neutral-10"
                      }`}
                    >
                      {tab}

                      {activeTab === tab && (
                        <motion.span
                          layoutId="tab-underline"
                          className="absolute bottom-[-1px] left-0 w-full border-b-2 border-primary-10"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="max-h-80 overflow-y-auto mt-3">
                  {filteredNotifications.length > 0 ? (
                    <ul className="space-y-2">
                      {filteredNotifications.map((notification) => (
                        <NotificationCard
                          key={notification?._id}
                          notification={notification}
                          setNotifications={setNotifications}
                        />
                      ))}
                    </ul>
                  ) : (
                    <NoNotification activeTab={activeTab} />
                  )}
                </div>

                {filteredNotifications.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                      {activeTab === "Unread"
                        ? `${unreadCount} Unread Notification${
                            unreadCount !== 1 ? "s" : ""
                          }`
                        : `Total ${notifications.length} Notification${
                            notifications.length !== 1 ? "s" : ""
                          }`}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notification;
