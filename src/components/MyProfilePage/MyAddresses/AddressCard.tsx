import {
  IoBusinessOutline,
  IoCallOutline,
  IoHomeOutline,
  IoLocationOutline,
  IoMapOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import type { TAddress } from "../../../types/address.type";
import { useDeleteAddressMutation } from "../../../redux/Features/Address/addressApi";

type TAddressCardProps = {
  address: TAddress;
  onEdit: (id: string) => void;
};

const AddressCard: React.FC<TAddressCardProps> = ({ address, onEdit }) => {
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  const handleDeleteAddress = async (id:string) => {
    try {
      await deleteAddress(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "home":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "office":
        return "bg-purple-50 text-purple-600 border-purple-100";
      default:
        return "bg-neutral-20 text-neutral-10 border-neutral-30";
    }
  };

  return (
    <div className="group bg-white border border-neutral-20 rounded-3xl p-6 hover:shadow-xl hover:shadow-neutral-20/40 hover:border-primary-5/20 transition-all duration-300 relative font-Satoshi">
      {/* Type Badge & Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${getTypeColor(
              address.type,
            )}`}
          >
            {getTypeIcon(address.type)}
            {address.type}
          </div>
        </div>

        <div className="flex gap-2 transition-opacity">
          <button
            onClick={() => onEdit(address._id)}
            className="p-2 bg-neutral-20/50 hover:bg-primary-5 hover:text-white text-neutral-10 rounded-lg transition-all"
            title="Edit"
          >
            <HiOutlinePencil size={16} />
          </button>
          <button
            onClick={() => handleDeleteAddress(address?._id)}
            className="p-2 bg-neutral-20/50 hover:bg-red-500 hover:text-white text-neutral-10 rounded-lg transition-all"
            title="Delete"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-primary-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <HiOutlineTrash size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Full Name */}
      <div className="flex items-center gap-2 mb-2">
        <IoPersonOutline className="text-primary-5" size={16} />
        <h4 className="text-neutral-5 font-bold text-base leading-snug">
          {address.fullName}
        </h4>
      </div>

      {/* Address Details */}
      <div className="space-y-1 ml-6">
        <p className="text-neutral-10 text-sm font-medium">
          {address.addressLine1}
        </p>
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

      {/* Phone Numbers */}
      <div className="mt-4 pt-4 border-t border-neutral-20/50 space-y-2">
        {/* Primary Phone */}
        <div className="flex items-center gap-2 text-neutral-10 group-hover:text-neutral-5 transition-colors">
          <IoCallOutline className="text-primary-5" size={16} />
          <span className="text-sm font-medium">
            {address.phoneNumber}
            <span className="text-xs text-neutral-35 font-normal ml-2">
              (Primary)
            </span>
          </span>
        </div>

        {/* Alternative Phone */}
        {address.alternativePhoneNumber && (
          <div className="flex items-center gap-2 text-neutral-10 group-hover:text-neutral-5 transition-colors">
            <IoCallOutline className="text-neutral-35" size={16} />
            <span className="text-sm font-medium">
              {address.alternativePhoneNumber}
              <span className="text-xs text-neutral-35 font-normal ml-2">
                (Alternate)
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Created At (Optional) */}
      {address.createdAt && (
        <div className="mt-3 pt-3 border-t border-neutral-20/30">
          <p className="text-[10px] text-neutral-35">
            Added on{" "}
            {new Date(address.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
