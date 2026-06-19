import {
  IoBusinessOutline,
  IoCallOutline,
  IoHomeOutline,
  IoLocationOutline,
  IoMapOutline,
} from "react-icons/io5";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const AddressCard = ({ address }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <IoHomeOutline size={18} />;
      case "office":
        return <IoBusinessOutline size={18} />;
      default:
        return <IoLocationOutline size={18} />;
    }
  };
  return (
    <div className="group bg-white border border-neutral-20 rounded-3xl p-6 hover:shadow-xl hover:shadow-neutral-20/40 hover:border-primary-5/20 transition-all duration-300 relative font-Satoshi">
      {/* Type Badge & Actions */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${
            address.type === "home"
              ? "bg-blue-50 text-blue-600 border-blue-100"
              : address.type === "office"
                ? "bg-purple-50 text-purple-600 border-purple-100"
                : "bg-neutral-20 text-neutral-10 border-neutral-30"
          }`}
        >
          {getTypeIcon(address.type)}
          {address.type}
        </div>

        <div className="flex gap-2 transition-opacity">
          <button
            className="p-2 bg-neutral-20/50 hover:bg-primary-5 hover:text-white text-neutral-10 rounded-lg transition-all"
            title="Edit"
          >
            <HiOutlinePencil size={16} />
          </button>
          <button
            className="p-2 bg-neutral-20/50 hover:bg-red-500 hover:text-white text-neutral-10 rounded-lg transition-all"
            title="Delete"
          >
            <HiOutlineTrash size={16} />
          </button>
        </div>
      </div>

      {/* addressess Details */}
      <div className="space-y-1">
        <h4 className="text-neutral-5 font-bold text-lg leading-snug">
          {address.addressLine1}
        </h4>
        {address.addressLine2 && (
          <p className="text-neutral-10 text-sm font-medium">
            {address.addressLine2}
          </p>
        )}
        <div className="flex items-center gap-2 text-neutral-10 text-sm font-medium mt-2">
          <IoMapOutline className="text-primary-5" size={14} />
          <span>
            {address.city}, {address.state} - {address.pinCode}
          </span>
        </div>
        <p className="text-neutral-10 text-xs font-bold uppercase tracking-widest mt-1">
          {address.country}
        </p>
      </div>

      {/* Phone Footer */}
      {address.alternativePhoneNumber && (
        <div className="mt-6 pt-4 border-t border-neutral-20/50 flex items-center gap-2 text-neutral-10 group-hover:text-neutral-5 transition-colors">
          <IoCallOutline className="text-primary-5" size={16} />
          <span className="text-xs font-bold">
            {address.alternativePhoneNumber}
          </span>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
