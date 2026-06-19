import { useState } from "react";
import { IoReceiptOutline, IoFilterOutline } from "react-icons/io5";
import SessionHistoryCard from "./SessionHistoryCard";
const SessionHistory = () => {
  const [filter, setFilter] = useState("All");

  // Updated Mock Data with Ended status
  const bookings = [
    {
      id: "BK-9921",
      consultantName: "Pandit Rahul Sir",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      reason: "Career growth and job transition guidance",
      date: "Oct 24, 2024",
      status: "Accepted",
    },
    {
      id: "BK-8842",
      consultantName: "Acharya Sunita",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      reason: "Marriage compatibility and Kundli matching",
      date: "Oct 12, 2024",
      status: "Pending",
    },
    {
      id: "BK-7710",
      consultantName: "Dr. Vinay Bajpai",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
      reason: "Health and wellness consultation",
      date: "Sept 28, 2024",
      status: "Ended",
    },
  ];

  const filteredBookings =
    filter === "All" ? bookings : bookings.filter((b) => b.status === filter);
  return (
    <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
            My Bookings
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Manage your current and past consultations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <IoFilterOutline
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-10"
              size={16}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-neutral-20 rounded-xl text-sm font-semibold text-neutral-5 outline-none focus:border-primary-5 appearance-none cursor-pointer hover:bg-neutral-20/10 transition-colors"
            >
              <option value="All">All Bookings</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Ended">Ended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Session History List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <SessionHistoryCard key={booking.id} booking={booking} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <div className="py-24 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-primary-5 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-20">
            <IoReceiptOutline size={30} />
          </div>
          <h4 className="text-lg font-bold text-neutral-5">
            No {filter !== "All" ? filter.toLowerCase() : ""} bookings
          </h4>
          <p className="text-neutral-10 text-sm mt-1">
            Refine your filter or start a new consultation.
          </p>
          <button
            onClick={() => setFilter("All")}
            className="mt-6 text-sm font-bold text-primary-5 hover:underline"
          >
            Show all bookings
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
