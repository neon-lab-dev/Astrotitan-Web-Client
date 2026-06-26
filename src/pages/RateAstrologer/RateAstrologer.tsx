import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import Container from "../../components/Reusable/Container/Container";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Button from "../../components/Reusable/Button/Button";
import Textarea from "../../components/Reusable/TextArea/TextArea";
import toast from "react-hot-toast";
import { useGetSingleAstrologerByIdQuery } from "../../redux/Features/Astrologer/astrologerApi";
import LogoLoader from "../../components/Reusable/LogoLoader/LogoLoader";
import { useAddReviewMutation } from "../../redux/Features/Consultation/consultationApi";

const RateAstrologer = () => {
  const { consultationId, astrologerId } = useParams<{
    consultationId: string;
    astrologerId: string;
  }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [addReview, { isLoading: isSubmitting }] = useAddReviewMutation();

  const { data, isLoading } = useGetSingleAstrologerByIdQuery(astrologerId);
  const astrologerData = data?.data || {};

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const payload = {
        rating,
        review,
      };
      const response = await addReview({
        id: consultationId,
        data: payload,
      }).unwrap();
      if (response?.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            {star <= (hoveredRating || rating) ? (
              <FaStar className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            ) : (
              <FaRegStar className="w-8 h-8 text-gray-300" />
            )}
          </button>
        ))}
      </div>
    );
  };

  if (isSuccess) {
    return (
      <Container>
        <div className="max-w-lg mx-auto flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <IoCheckmarkCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-5">Thank You! 🙏</h2>
          <p className="text-neutral-10 mt-2">
            We appreciate your feedback! Thank you for your valuable feedback..
          </p>
          <Link to="/dashboard/user/session-history">
            <Button
              label="View Session History"
              variant="primary"
              className="w-full mt-6"
            />
          </Link>
        </div>
      </Container>
    );
  }

  if (isLoading) {
    return <LogoLoader />;
  }

  return (
    <div className="min-h-screen bg-neutral-20/30 py-8 font-Satoshi">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "My Sessions", path: "/sessions" },
            {
              label: "Rate Astrologer",
              path: `/rate/${astrologerData?.displayName}`,
              isActive: true,
            },
          ]}
        />

        <div className="max-w-2xl mx-auto mt-8">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-20 p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-5">
                Rate Your Session
              </h1>
              <p className="text-neutral-10 text-sm mt-1">
                Share your experience with the astrologer
              </p>
            </div>

            {/* Astrologer Info */}
            <div className="flex items-center gap-4 p-4 bg-neutral-20/30 rounded-xl mb-6">
              {astrologerData?.profilePicture ? (
                <img
                  src={astrologerData?.profilePicture}
                  alt={astrologerData?.displayName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-5/20"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-primary-5/10 flex items-center justify-center">
                  <FaUserCircle className="w-8 h-8 text-primary-5/60" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-neutral-5">
                  {astrologerData?.displayName}
                </h3>
                <p className="text-sm text-neutral-10">
                  {astrologerData?.experience} experience
                </p>
              </div>
            </div>

            {/* Rating Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-10 mb-3">
                How would you rate your experience?
                <span className="text-primary-5 ml-1">*</span>
              </label>
              {renderStars()}
              {rating > 0 && (
                <p className="text-sm text-neutral-10 mt-2">
                  You rated {rating} out of 5
                </p>
              )}
            </div>

            {/* Review Textarea */}
            <div className="mb-6">
              <Textarea
                label="Write your review (optional)"
                name="review"
                placeholder="Share your experience with the astrologer..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
                isRequired={false}
              />
              <p className="text-xs text-neutral-10 mt-1 text-right">
                {review.length}/500 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                label="Cancel"
                variant="secondary"
                className="flex-1"
                onClick={() => navigate(-1)}
              />
              <Button
                type="button"
                label="Submit Review"
                variant="primary"
                className="flex-1"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                isDisabled={isSubmitting || rating === 0}
              />
            </div>

            {/* Note */}
            <p className="text-xs text-neutral-10 text-center mt-4">
              Your feedback helps other users make informed decisions
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RateAstrologer;
