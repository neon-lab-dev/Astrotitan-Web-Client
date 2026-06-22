import { FaOm, FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../Reusable/Button/Button";
import Modal from "../../Reusable/Modal/Modal";
import BookPujaForm from "../BookPujaForm/BookPujaForm";
import { useState } from "react";
import type { TPuja } from "../../../types/puja.type";

const PujaCard = ({ puja }: { puja: TPuja }) => {
  const [isBookPujaModalOpen, setIsBookPujaModalOpen] =
    useState<boolean>(false);
  const renderStars = (rating: number = 0) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400" />
        ))}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
      </div>
    );
  };
  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 hover:border-primary-5/30 flex flex-col md:flex-row font-GeneralSans    ">
        {/* Image Section - Left side */}
        <div className="relative md:w-80 shrink-0">
          <img
            src={puja?.imageUrls[0]}
            alt={puja?.name}
            className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden"></div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <div className="px-3 py-1 bg-primary-5 text-white text-xs font-medium rounded-full flex items-center gap-1.5 shadow-lg">
              <FaOm className="w-3 h-3" />
              {puja?.category}
            </div>
          </div>
        </div>

        {/* Content Section - Right side */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Title & Intent */}
            <div className="flex items-start justify-between">
              <div>
                <Link to={`/puja/${puja?._id}`}>
                  <h3 className="text-xl font-semibold text-neutral-5 hover:text-primary-5 transition-colors">
                    {puja?.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-primary-10 bg-purple-50 px-2.5 py-0.5 rounded-full">
                    {puja?.intent}
                  </span>
                  <span className="text-xs text-neutral-10 bg-gray-50 px-2.5 py-0.5 rounded-full">
                    {puja?.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {puja?.discountedPrice && (
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {Math.round(
                      ((puja?.basePrice - puja?.discountedPrice) /
                        puja?.basePrice) *
                        100,
                    )}
                    % OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-10 mt-3 leading-relaxed">
              {puja?.description}
            </p>

            {/* Benefits */}
            <span className="text-xs text-primary-10 bg-purple-50/50 px-2.5 py-1 rounded-full border border-purple-100">
              ✦ {puja?.howThisPujaPerformed}
            </span>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                {renderStars(puja?.rating)}
                <span className="text-sm font-medium text-gray-700">
                  {puja?.rating}
                </span>
              </div>
              <span className="w-px h-4 bg-gray-300"></span>
              <span className="text-sm text-neutral-10">
                {puja?.reviews?.length} review{puja?.reviews?.length > 1 && "s"}
              </span>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div>
              {puja?.discountedPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary-5">
                    ₹{puja?.discountedPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{puja?.basePrice}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-primary-5">
                  ₹{puja?.basePrice}
                </span>
              )}
              <span className="text-xs text-gray-400 block">
                Inclusive of all taxes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link to={`/puja/${puja?._id}`}>
                <Button variant="secondary" label="View Details" />
              </Link>
              <Button
                onClick={() => setIsBookPujaModalOpen(true)}
                label="Book Now"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isModalOpen={isBookPujaModalOpen}
        setIsModalOpen={setIsBookPujaModalOpen}
      >
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
          Book Puja
        </h2>
        <p className="text-sm font-GeneralSans text-center mt-1 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, beatae!
        </p>
        <BookPujaForm pujaId={puja._id} />
      </Modal>
    </>
  );
};

export default PujaCard;
