import { useState } from "react";
import Modal from "../../Reusable/Modal/Modal";
import Button from "../../Reusable/Button/Button";
import { intents } from "../../../constants/constants";
import { IoCallOutline, IoChatbubblesOutline } from "react-icons/io5";

type TBookAstrologerModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  astrologerId: string;
};
const BookAstrologerModal: React.FC<TBookAstrologerModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  astrologerId,
}) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<"chat" | "call" | null>(null);
  const [consultationFor, setConsultationFor] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBookAppointment = () => {
    const data = {
      astrologer: astrologerId,
      method,
      consultationFor,
      requestMessage,
    };
    console.log("Booking Data:", data);

    // Simulate API call
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Reset after modal closes
    setTimeout(() => {
      setStep(1);
      setMethod(null);
      setConsultationFor("");
      setRequestMessage("");
      setIsSuccess(false);
    }, 300);
  };

  const renderStep = () => {
    if (isSuccess) {
      return (
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-neutral-5">
            Booking Confirmed! 🎉
          </h3>
          <p className="text-sm text-neutral-10 mt-2">
            Your appointment has been booked successfully. We'll notify you
            shortly.
          </p>
          <Button
            label="Done"
            variant="primary"
            className="w-full mt-6"
            onClick={handleClose}
          />
        </div>
      );
    }

    if (step === 1) {
      return (
        <div>
          <h2 className="text-xl font-Satoshi font-semibold text-center text-neutral-5 mb-2">
            Choose Consultation Type
          </h2>
          <p className="text-sm text-neutral-10 text-center mb-6">
            Select how you'd like to connect with the astrologer
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMethod("call")}
              className={`p-6 rounded-xl border-2 transition-all ${
                method === "call"
                  ? "border-primary-5 bg-primary-5/10"
                  : "border-neutral-20 hover:border-primary-5/50"
              }`}
            >
              <IoCallOutline className="text-3xl mx-auto mb-2 text-primary-5" />
              <span className="font-medium text-neutral-5">Call</span>
              <p className="text-xs text-neutral-10 mt-1">Talk directly</p>
            </button>

            <button
              onClick={() => setMethod("chat")}
              className={`p-6 rounded-xl border-2 transition-all ${
                method === "chat"
                  ? "border-primary-5 bg-primary-5/10"
                  : "border-neutral-20 hover:border-primary-5/50"
              }`}
            >
              <IoChatbubblesOutline className="text-3xl mx-auto mb-2 text-primary-5" />
              <span className="font-medium text-neutral-5">Chat</span>
              <p className="text-xs text-neutral-10 mt-1">Text-based</p>
            </button>
          </div>

          <Button
            label="Next"
            variant="primary"
            className="w-full mt-6"
            onClick={() => setStep(2)}
            isDisabled={!method}
          />
        </div>
      );
    }

    if (step === 2) {
      return (
        <div>
          <button
            onClick={() => setStep(1)}
            className="text-sm text-neutral-10 hover:text-neutral-5 transition-colors mb-4 flex items-center gap-1"
          >
            ← Back
          </button>

          <h2 className="text-xl font-Satoshi font-semibold text-center text-neutral-5 mb-2">
            What brings you here?
          </h2>
          <p className="text-sm text-neutral-10 text-center mb-6">
            Select an intent and share any additional details
          </p>

          <div className="grid grid-cols-3 gap-3">
            {intents?.map((intent) => (
              <button
                key={intent.label}
                onClick={() => setConsultationFor(intent.label)}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                  consultationFor === intent.label
                    ? "border-primary-5 bg-primary-5/10"
                    : "border-neutral-20 hover:border-primary-5/50"
                }`}
              >
                <img src={intent.icon} alt={intent.label} className="w-6 h-6" />
                <span className="text-xs font-medium text-neutral-5 mt-1">
                  {intent.label}
                </span>
              </button>
            ))}
          </div>

          <textarea
            placeholder="Optional: Share more details about your concern..."
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
            rows={3}
            className="w-full mt-4 p-3 rounded-xl border border-neutral-35/60 focus:outline-none focus:border-primary-5 resize-none text-sm"
          />

          <Button
            label="Book Appointment"
            variant="primary"
            className="w-full mt-4"
            onClick={handleBookAppointment}
            isDisabled={!consultationFor}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={handleClose}>
      {renderStep()}
    </Modal>
  );
};

export default BookAstrologerModal;
