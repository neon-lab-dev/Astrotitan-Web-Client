import { IoFlowerOutline, IoFlameOutline } from "react-icons/io5";
import PujaBookingCard from "./PujaBookingCard";
import { Link } from "react-router-dom";

const PujaBookings = () => {
  // Mock Data matching your requirements
  const pujaBookings = [
    {
      id: "PJ-102",
      pujaName: "Maha Mrityunjaya Jaap",
      pujaBookedFor: "Rahul Sutradhar",
      preferredDate: "Nov 12, 2024",
      purposeOfPuja: "For health recovery and longevity of family members.",
      status: "Confirmed", // Pending, Confirmed, Completed
      adminNotes:
        "Please ensure you have a clean copper vessel and fresh flowers ready before the priest joins virtually.",
    },
    {
      id: "PJ-098",
      pujaName: "Ganesh Lakshmi Puja",
      pujaBookedFor: "Sutradhar Family",
      preferredDate: "Oct 31, 2024",
      purposeOfPuja: "Prosperity and removal of obstacles in new business.",
      status: "Completed",
      adminNotes: null, // Test case for no notes
    },
    {
      id: "PJ-115",
      pujaName: "Satyanarayan Katha",
      pujaBookedFor: "Rahul Sutradhar",
      preferredDate: "Dec 05, 2024",
      purposeOfPuja: "Monthly spiritual gratitude and peace.",
      status: "Pending",
      adminNotes:
        "We are currently assigning a senior priest for your preferred slot.",
    },
  ];

  return (
    <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
            Puja Bookings
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Track and manage your scheduled spiritual ceremonies
          </p>
        </div>
        <Link
          to="/puja"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-20 rounded-xl text-sm font-medium text-neutral-5 hover:text-white hover:bg-primary-5 hover:shadow-sm transition-all group"
        >
          <IoFlameOutline
            className="text-primary-5 group-hover:text-white group-hover:scale-110 transition-transform"
            size={18}
          />
          Explore More
        </Link>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {pujaBookings.map((puja) => (
          <PujaBookingCard key={puja.id} puja={puja} />
        ))}
      </div>

      {/* Empty State */}
      {pujaBookings.length === 0 && (
        <div className="py-24 text-center bg-white rounded-4xl border border-dashed border-neutral-20">
          <div className="w-20 h-20 bg-primary-5/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-5/30">
            <IoFlowerOutline size={40} />
          </div>
          <h4 className="text-lg font-bold text-neutral-5">No Puja Bookings</h4>
          <p className="text-neutral-10 text-sm mt-1">
            Your requested spiritual ceremonies will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default PujaBookings;
