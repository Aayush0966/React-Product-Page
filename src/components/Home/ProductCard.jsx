import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate, useNavigation } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/product/${product.id}`);
  }

  return (
    <div onClick={() => handleNavigation()} className="cursor-pointer max-w-xs ml-5 w-full h-auto    rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl">
    {/* Image Section */}
    <div className="relative h-96 rounded-3xl bg-gray-200"> 
      <img
        className="w-50 h-full object-cover"
        src={product.images[0]}
        alt={product.title}
      />
    </div>

    {/* Content Section */}
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2 text-center">
        {product.title}
      </h2>
      <div className="flex justify-between sm:flex-wrap items-center">
        <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
        <div className="flex items-center ">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className="text-yellow-400" />
          ))}
          <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
