import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/ProductSlice';
import { MdClose, MdMenu } from 'react-icons/md';

function Filter() {
  const dispatch = useDispatch();
  
  const [categoryItem, setCategoryItem] = useState('');
  const [expanded, setExpanded] = useState({
    Mens: false,
    Womens: false,
    Laptops: false,
    Beauty: false,
    Smartphones: false,
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State to handle filter visibility

  const handleFilter = (name, id) => {
    setCategoryItem(name);
    dispatch(fetchProducts({ category: id, type: 'fetch'})); // Dispatch the thunk to fetch products
  }

  const onClose = () => {
    dispatch(fetchProducts({ category: 'mens-watches', type: 'fetch'})); // Dispatch the thunk to fetch products

    setCategoryItem('');
  }

  const expandedOptions = {
    Mens: [
      { name: 'Shoes', id: 'mens-shoes' },
      { name: 'Shirts', id: 'mens-shirts' },
      { name: 'Watches', id: 'mens-watches' },
      { name: 'Perfumes', id: 'fragrances' },
    ],
    Womens: [
      { name: 'Bags', id: 'womens-bags' },
      { name: 'Dresses', id: 'womens-dresses' },
      { name: 'Jewellery', id: 'womens-jewellery' },
      { name: 'Shoes', id: 'womens-shoes' },
      { name: 'Watches', id: 'womens-watches' },
      { name: 'Tops', id: 'tops' }
    ],
    Laptops: [
      { name: 'Laptops', id: 'Laptops' }
    ],
    Beauty: [
      { name: 'Beauty', id: 'Beauty' }
    ],
    Smartphones: [
      { name: 'Smartphones', id: 'Smartphones' },
      { name: 'Tablets', id: 'tablets' },
      { name: 'Mobile accessories', id: 'mobile-accessories'}
    ]
  };

  useEffect(() => {
    dispatch(fetchProducts({ category: 'mens-watches', type: 'fetch'})); // Dispatch the thunk to fetch products
  }, [dispatch]);

  const handleToggleExpand = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="relative">
      <br />
      <button
        className="mt-24 ml-4 md:hidden p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 z-50"
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      >
        <MdMenu size={24} />
      </button>

      {/* Mobile Overlay Menu */}
      <div className={`fixed bottom-0 left-0 w-full bg-white z-50 p-6 transform transition-transform ${isFilterVisible ? 'translate-y-0' : 'translate-y-full'} md:hidden`} style={{ height: '80vh' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-black text-xl font-bold">Filters</h2>
          <button
            onClick={() => setIsFilterVisible(false)}
            className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <MdClose size={24} />
          </button>
        </div>
        <hr className="my-4 border-gray-200" />
        {/* Categories */}
        {['Mens', 'Womens', 'Laptops', 'Beauty', 'Smartphones'].map((category) => (
          <div key={category} className="w-full mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggleExpand(category)}
            >
              <span className="text-gray-600 text-base capitalize">
                {category}
              </span>
              <span className={`${expanded[category] ? 'rotate-180' : ''} transition-transform`}>
                &#9660;
              </span>
            </div>
            {expanded[category] && (
              <div className="flex flex-wrap gap-2 mt-3 text-gray-600">
                {expandedOptions[category].map((option) => (
                  <button 
                    onClick={() => handleFilter(option.name, option.id)} 
                    key={option.id} 
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-300 active:bg-gray-400 rounded shadow-sm transition duration-300 ease-in-out cursor-pointer focus:outline-none"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Menu */}
      <div className={`w-[295px] lg:ml-40 md:ml-10 mt-32 h-auto px-6 py-5 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-6  md:block hidden`}>
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-xl font-bold">Filters</h2>
          {categoryItem && (
            <span className='font-bold font-mono bg-slate-100 rounded-lg p-1 m-2 flex items-center'>
              <button 
                onClick={onClose}
                className='flex items-center justify-center m-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors'
              >
                <MdClose size={20} />
              </button>
              {categoryItem}
            </span>
          )}
        </div>
        <hr className="w-full border-gray-200" />
        {/* Categories */}
        {['Mens', 'Womens', 'Laptops', 'Beauty', 'Smartphones'].map((category) => (
          <div key={category} className="w-full mt-5">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggleExpand(category)}
            >
              <span className="text-gray-600 text-base capitalize">
                {category}
              </span>
              <span className={`${expanded[category] ? 'rotate-180' : ''} transition-transform`}>
                &#9660;
              </span>
            </div>
            {expanded[category] && (
              <div className="flex flex-wrap gap-2 mt-3 text-gray-600">
                {expandedOptions[category].map((option) => (
                  <button 
                    onClick={() => handleFilter(option.name, option.id)} 
                    key={option.id} 
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-300 active:bg-gray-400 rounded shadow-sm transition duration-300 ease-in-out cursor-pointer focus:outline-none"
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
