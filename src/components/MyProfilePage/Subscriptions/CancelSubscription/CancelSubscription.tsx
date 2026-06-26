/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Textarea from "../../../Reusable/TextArea/TextArea";
import Button from "../../../Reusable/Button/Button";
import { useCancelSubscriptionMutation } from "../../../../redux/Features/Subscription/subscriptionApi";

type TFormdata = {
  cancelReason: string;
};
const CancelSubscription = ({
  setIsCancelSubscriptionModalOpen,
}: {
  setIsCancelSubscriptionModalOpen: any;
}) => {
  const [cancelSubscription, { isLoading }] = useCancelSubscriptionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormdata>();

  const handleCancelSubscription = async (data: TFormdata) => {
    try {
      const payload = {
        cancelReason: data.cancelReason,
      };
      const response = await cancelSubscription(payload).unwrap();
      if (response?.success) {
        setIsCancelSubscriptionModalOpen(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleCancelSubscription)}
      className="space-y-5 mt-8"
    >
      <Textarea
        label="Why do you want to cancel your subscription?"
        placeholder="Please enter the reason for cancellation"
        error={errors.cancelReason}
        rows={8}
        {...register("cancelReason", {
          required: "This field is required",
        })}
      />

      <div className="flex items-center gap-3 justify-end">
        <Button
          onClick={() => setIsCancelSubscriptionModalOpen(false)}
          variant="secondary"
          label="Cancel"
        />
        <Button type="submit" label="Submit" isLoading={isLoading} />
      </div>
    </form>
  );
};

export default CancelSubscription;
