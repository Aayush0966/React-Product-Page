import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

function Cart() {
  // Fetch cart data from Redux store
  const cartData = useSelector((state) => state.carts.CartItems);
  // Calculate totals
  const subtotal = cartData.reduce((acc, item) => acc + item.productPrice * item.productAmount, 0);
  const discount = cartData.reduce((acc, item) => acc + item.productDiscount * item.productAmount, 0);
  const total = subtotal - discount;

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6 sm:mb-8">My Cart</h1>

      {cartData.length === 0 ? (
        <div className="flex justify-center items-center w-full min-h-screen">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">No items in cart</h2>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="flex-1">
            <div className="flex flex-col gap-6 w-full border-gray-200 border p-4 sm:p-5 rounded-lg sm:rounded-3xl overflow-x-auto">
              {cartData.map((item, index) => (
                <CartItem
                  key={item.productId} // Assuming each item has a unique id
                  id={item.productId}
                  productName={item.productName}
                  productImg={item.productImg}
                  productAmount={item.productAmount}
                  productPrice={item.productPrice}
                  productDiscount={item.productDiscount}
                  isLastItem={index === cartData.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full md:w-96 lg:w-80 bg-white p-4 sm:p-5 rounded-lg sm:rounded-2xl border border-gray-300">
            <h2 className="font-semibold text-2xl sm:text-3xl mb-6 sm:mb-8 text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-lg sm:text-xl mb-4 sm:mb-6 text-gray-700">
              <h3 className="font-medium">Subtotal</h3>
              <h3>${subtotal.toFixed(2)}</h3>
            </div>
            <div className="flex justify-between text-lg sm:text-xl mb-4 sm:mb-6 text-gray-700">
              <h3 className="font-medium">Discount</h3>
              <h3 className="text-red-600">-${discount.toFixed(2)}</h3>
            </div>
            <div className="flex justify-between text-lg sm:text-xl font-bold mb-6 sm:mb-8 border-t border-gray-300 pt-4 text-gray-800">
              <h3>Total</h3>
              <h3>${total.toFixed(2)}</h3>
            </div>
            <button className="w-full rounded-lg sm:rounded-3xl h-12 sm:h-14 bg-black text-white font-semibold hover:bg-gray-800 transition duration-300 text-base sm:text-lg">
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
