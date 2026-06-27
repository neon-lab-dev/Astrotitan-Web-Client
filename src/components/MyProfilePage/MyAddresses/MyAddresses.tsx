import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import AddressCard from "./AddressCard";
import { useGetMyAddressesQuery } from "../../../redux/Features/Address/addressApi";
import Drawer from "../../Reusable/Drawer/Drawer";
import AddOrEditAddressForm from "./AddOrEditAddressForm";
import type { TAddress } from "../../../types/address.type";
import Loader from "../../Shared/Loader/Loader";

const MyAddresses = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"add" | "edit">("add");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const { data, isLoading } = useGetMyAddressesQuery({});
  const addresses = data?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-150 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header - Styled as requested */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 justify-between mb-10">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-neutral-5/80 tracking-tight">
            My Addresses
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Manage your saved locations for deliveries and consultations
          </p>
        </div>
        <button
          onClick={() => {
            setActionType("add");
            setIsDrawerOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-20 rounded-xl text-sm font-medium text-neutral-5 hover:text-white hover:bg-primary-5 hover:shadow-sm transition-all group"
        >
          <IoAdd
            className="text-primary-5 group-hover:text-white group-hover:scale-110 transition-transform"
            size={18}
          />
          Add New Address
        </button>
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses?.map((address: TAddress) => (
          <AddressCard
            key={address._id}
            address={address}
            onEdit={(id: string) => {
              setActionType("edit");
              setIsDrawerOpen(true);
              setSelectedAddressId(id);
            }}
          />
        ))}
      </div>

      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        position="right"
        width="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%]"
        bgColor="bg-white"
      >
        <div>
          <h2 className="text-neutral-5/90 font-semibold text-lg leading-snug">
            Add New Address
          </h2>
          <AddOrEditAddressForm
            actionType={actionType}
            addressId={selectedAddressId}
            onCancel={() => setIsDrawerOpen(false)}
            onSuccess={() => setIsDrawerOpen(false)}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default MyAddresses;
