/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoTrashOutline, IoWarningOutline } from "react-icons/io5";
import Modal from "../../Reusable/Modal/Modal";
import { useState } from "react";
import { useDeleteAccountMutation } from "../../../redux/Features/User/userApi";
import toast from "react-hot-toast";
import { logout } from "../../../redux/Features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const [
    isDeleteAccountConfirmationModalOpen,
    setIsDeleteAccountConfirmationModalOpen,
  ] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount({}).unwrap();
      if (response?.success) {
        dispatch(logout());
        navigate("/");
        toast.success(response?.message || "Account deleted successfully!");
      }
    } catch (err: any) {
      console.error("Error deleting account:", err);
      toast.error(err?.data?.message || "Failed to delete account");
    }
  };
  return (
    <>
      <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
              Account Settings
            </h3>
            <p className="text-sm text-neutral-10 font-Satoshi mt-1">
              Manage your account status and data privacy
            </p>
          </div>
        </div>

        {/* Danger Zone Card */}
        <div>
          {/* Subtle Background Warning Pattern */}
          <div className="absolute top-0 right-0 text-red-500/5 rotate-12">
            <IoWarningOutline size={120} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shadow-sm">
                <IoTrashOutline size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-5 text-lg">
                  Danger Zone
                </h4>
                <p className="text-xs text-red-400 uppercase tracking-widest">
                  Permanent Action
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-neutral-5 font-semibold">
                  Before you delete your account, please note:
                </p>
                <ul className="space-y-2">
                  {[
                    "All your booking history with astrologers will be removed.",
                    "Any remaining balance in your wallet will be forfeited.",
                    "Your saved addresses and personal data will be permanently deleted.",
                    "You will not be able to reactivate this account later.",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-neutral-10 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-200 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-neutral-20/50">
                <button
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-red-100 text-red-500 rounded-2xl text-sm font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95 shadow-sm"
                  onClick={() => {
                    setIsDeleteAccountConfirmationModalOpen(true);
                  }}
                >
                  <IoTrashOutline size={18} />
                  Delete Account Permanently
                </button>
                <p className="mt-4 text-[11px] text-neutral-25 font-Satoshi italic">
                  By clicking the button above, you agree that you understand
                  the consequences of deleting your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isModalOpen={isDeleteAccountConfirmationModalOpen}
        setIsModalOpen={setIsDeleteAccountConfirmationModalOpen}
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <IoWarningOutline className="w-10 h-10 text-red-500" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-Satoshi font-bold text-neutral-5">
            Sad to see you go!
          </h2>

          {/* Description */}
          <p className="text-sm font-GeneralSans text-neutral-10 mt-2 max-w-sm">
            Are you sure you want to delete your account? This action cannot be
            undone and all your data will be permanently lost.
          </p>

          {/* Warning List */}
          <div className="w-full mt-4 p-4 bg-red-50/50 rounded-xl text-left space-y-2">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">
              ⚠️ You will lose:
            </p>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2 text-xs text-neutral-10">
                <span className="text-red-400 mt-0.5">•</span>
                All booking history with astrologers
              </li>
              <li className="flex items-start gap-2 text-xs text-neutral-10">
                <span className="text-red-400 mt-0.5">•</span>
                Any remaining wallet balance
              </li>
              <li className="flex items-start gap-2 text-xs text-neutral-10">
                <span className="text-red-400 mt-0.5">•</span>
                Saved addresses and personal data
              </li>
              <li className="flex items-start gap-2 text-xs text-neutral-10">
                <span className="text-red-400 mt-0.5">•</span>
                Account cannot be reactivated
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full mt-6">
            <button
              onClick={() => setIsDeleteAccountConfirmationModalOpen(false)}
              className="flex-1 px-4 py-3 bg-neutral-30 hover:bg-neutral-35 text-neutral-10 rounded-xl font-medium transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDeleteAccount();
              }}
              className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                "Please wait..."
              ) : (
                <span className="flex gap-1 items-center">
                  <IoTrashOutline className="w-4 h-4" />
                  Yes, Delete Account
                </span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountSettings;
