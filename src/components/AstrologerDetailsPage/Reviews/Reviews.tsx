import type { TAstrologerReview } from "../../../types/astrologer.type";
import { formatDate } from "../../../utils/formatDate";

type TReviewsProps = {
  rating: number;
  reviews: TAstrologerReview[];
  renderStars: (rating: number) => React.ReactNode;
};
const Reviews: React.FC<TReviewsProps> = ({ rating, reviews, renderStars }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-slate-900">User Reviews</h3>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900 leading-none">
              {rating}
            </p>
            <p className="text-xs text-slate-400 font-medium">
              {reviews?.length} review{reviews?.length > 1 && "s"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {reviews && reviews?.length > 0 ? (
          reviews?.map((review: TAstrologerReview, index: number) => (
            <div key={index} className="group">
              <div className="flex gap-4">
                <img
                  src={review?.user?.profilePicture}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                  alt=""
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">
                      {review?.user?.fullName}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {formatDate(review?.createdAt)}
                    </span>
                  </div>
                  <div className="mt-1 mb-2">{renderStars(review?.rating)}</div>
                  <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl group-hover:bg-slate-100/50 transition-colors">
                    {review?.review}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              No Reviews Yet
            </h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Be the first to share your experience and help others make
              informed decisions.
            </p>
          </div>
        )}
      </div>

      {reviews?.length > 4 && (
        <button className="w-full mt-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          View All Reviews
        </button>
      )}
    </div>
  );
};

export default Reviews;
