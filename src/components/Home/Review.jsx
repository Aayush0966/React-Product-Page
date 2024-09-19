import React from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

function Review({ review }) {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md mb-6">
      {/* Review header */}
      <div className="flex flex-col md:flex-row items-start md:items-center mb-4">
        {/* Star Ratings */}
        <div className="flex mb-2 md:mb-0">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`text-lg ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        {/* User's Name */}
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {review.reviewerName}
          <FaCheckCircle className="text-green-500" />
        </h3>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-base leading-relaxed mb-4">
        {review.comment}
      </p>

      {/* Posted Date */}
      <div className="text-sm text-gray-500">
        Posted on {review.date}
      </div>
    </div>
  );
}

export default Review;
