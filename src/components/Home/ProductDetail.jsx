import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/CartSlice';

function ProductDetail() {
  const [notification, setNotification] = useState('');
  const { id } = useParams(); // Extract the id from the URL
  const data = useLoaderData(); // Get the fetched data from the loader
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews'); // Default active tab is "Reviews"
  const dispatch = useDispatch();
  const cart = useSelector(state => state.carts)
  // Ensure quantity does not go below 1
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const handleAddCart = () => {
    const newItem = {
      id: data.id,
      name: data.title,
      amt: quantity,
      img: data.thumbnail,
      price: data.price,
      discount: data.discountPercentage
    };
    dispatch(addToCart(newItem));
    setNotification('Item added to cart!');
    setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
  };
  

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
     {notification && (
      <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg">
        {notification}
      </div>
    )}
      <div className="flex  lg:text-left flex-col md:flex-row items-start md:items-center mx-4 md:mx-8 lg:mx-16 my-10">
        <img className="w-full md:w-1/3 bg-slate-200 rounded-lg mb-6 md:mb-0" src={data.thumbnail} alt={data.title} />
        <div className="md:pl-8 lg:ml-44 flex flex-col w-full md:w-2/3">
          <h1 className="text-2xl md:text-4xl font-mono font-extrabold uppercase mb-4">{data.title}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className={`text-lg ${index < data.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-sm text-gray-600">({data.rating})</span>
          </div>

          <p className="text-2xl md:text-3xl font-bold mb-2">${data.price}</p>

          <p className="text-green-600 font-semibold mb-2">
            {data.stock > 0 ? `In Stock: ${data.stock} available` : 'Out of Stock'}
          </p>

          <p className="text-slate-600 mb-4">{data.description}</p>

          <div className="border border-black/10 mb-4"></div>

          <p className="text-sm text-gray-500 font-medium mb-4">
            Category: <span className="text-black">{data.category}</span>
          </p>

          <p className="text-sm text-gray-500 font-medium mb-4">
            Shipping: <span className="text-black">Free Standard Shipping</span>
          </p>

          <p className="text-sm text-gray-500 font-medium mb-4">
            Estimated Delivery Time: <span className="text-black">{data.shippingInformation}</span>
          </p>

          <div className="border border-black/10 mb-4"></div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="bg-slate-200 w-full md:w-32 rounded-3xl p-2 text-center flex items-center justify-center">
              <button className="mx-3" onClick={handleDecrease}>-</button>
              <span className="mx-3">{quantity}</span>
              <button className="mx-3" onClick={handleIncrease}>+</button>
            </div>
            <button onClick={() => handleAddCart()} className="bg-black p-3 w-full md:w-96 rounded-2xl text-white hover:bg-gray-800 transition-colors">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="my-10 mx-4 md:mx-8 lg:mx-16">
        <div className="relative flex justify-center space-x-6 md:space-x-10">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`font-bold text-lg focus:outline-none transition-colors duration-300 pb-2 ${
              activeTab === 'reviews' ? 'text-black' : 'text-gray-500'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`text-lg focus:outline-none transition-colors duration-300 pb-2 ${
              activeTab === 'faqs' ? 'text-black' : 'text-gray-500'
            }`}
          >
            FAQs
          </button>

          {/* Gray line */}
        </div>

        {/* Active tab underline */}
        <div className="relative w-full flex justify-center mt-1">
          <div
            className={`absolute h-[2px] bg-black z-10 transition-all duration-300 ${
              activeTab === 'reviews' ? 'w-20 translate-x-[-60px]' : 'w-14 translate-x-[60px]'
            }`}
          ></div>
        </div>

        <div className="border border-black/10 mb-4"></div>

        {activeTab === 'reviews' && (
          <div className="px-4 py-6 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">
                All Reviews ({data.reviews.length})
              </h2>
              
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {data.reviews.map((review, index) => (
                <Review key={index} review={review} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-lg font-medium">
              No FAQs are available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;

// Loader function to fetch product data
export const getProductDetails = async ({ params }) => {
  const { id } = params; // Extract id from params in the loader
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
};
