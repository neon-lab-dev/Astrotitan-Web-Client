import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddressCard from "./AddressCard";

const MyAddresses = () => {
  // Mock Data matching your schema
  const [addresses] = useState([
    {
      _id: "1",
      type: "home",
      addressLine1: "Flat 402, Royal Residency",
      addressLine2: "Near City Park",
      city: "Kolkata",
      state: "West Bengal",
      pinCode: "700001",
      country: "India",
      alternativePhoneNumber: "+91 98765 43211",
    },
    {
      _id: "2",
      type: "office",
      addressLine1: "Sector V, Infinity Benchmark",
      addressLine2: "12th Floor, Suite 1204",
      city: "Salt Lake",
      state: "West Bengal",
      pinCode: "700091",
      country: "India",
      alternativePhoneNumber: "+91 98765 43222",
    },
  ]);

  return (
    <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header - Styled as requested */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
            My Addresses
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Manage your saved locations for deliveries and consultations
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-20 rounded-xl text-sm font-medium text-neutral-5 hover:text-white hover:bg-primary-5 hover:shadow-sm transition-all group">
          <IoAdd
            className="text-primary-5 group-hover:text-white group-hover:scale-110 transition-transform"
            size={18}
          />
          Add New Address
        </button>
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <AddressCard key={address._id} address={address} />
        ))}
      </div>
    </div>
  );
};

export default MyAddresses;
