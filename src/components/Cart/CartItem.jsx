import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteItem, updateAmount } from '../../features/CartSlice';

function CartItem({ id, productName, productImg, productAmount, productPrice, productDiscount, isLastItem }) {
  const [amount, setAmount] = useState(productAmount);
  const dispatch = useDispatch();

  // Log updated amount when it changes
  useEffect(() => {
    console.log(amount, id);
    dispatch(updateAmount({ id: id, newAmount: amount }));
  }, [amount, id, dispatch]);

  const increment = () => {
    setAmount(prevAmount => prevAmount + 1);
  };

  const decrement = () => {
    setAmount(prevAmount => (prevAmount > 1 ? prevAmount - 1 : prevAmount));
  };

  const removeItem = () => {
    dispatch(deleteItem({id}))
  }

  return (
    <>
      <div className="flex w-full items-center gap-4 p-4 bg-white rounded-2xl max-w-4xl mx-auto">
        {/* Product Image */}
        <div className="h-36 w-36 bg-[#f0eeed] rounded-lg flex justify-center items-center">
          <img className="w-20 h-28 object-cover rounded-lg" src={productImg} alt={productName} />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col text-left justify-between">
          <div>
            <h3 className="text-gray-800 text-xl font-semibold">{productName}</h3>
            <p className="text-base text-gray-500 mt-1">Quantity: {amount}</p>
          </div>
          <div className="text-2xl font-bold text-gray-800">${productPrice}</div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col justify-between items-end">
          <button onClick={() => removeItem()} className="w-12 h-12 rounded-full mb-10 hover:bg-gray-200 flex items-center justify-center">
            <img src="https://img.icons8.com/color/48/delete-forever.png" alt="Delete" />
          </button>

          <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
            <button onClick={decrement} className="w-8 h-8 text-gray-600 flex justify-center items-center hover:bg-gray-300 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <span className="text-gray-800 text-base">{amount}</span>
            <button onClick={increment} className="w-8 h-8 text-gray-600 flex justify-center items-center hover:bg-gray-300 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gray Line */}
      {!isLastItem && <hr className="border-gray-400 my-4 mx-auto w-full max-w-3xl" />}
    </>
  );
}

export default CartItem;
