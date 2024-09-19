import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { Spinner } from 'react-bootstrap';

function Products() {
  const { productsData, status, error } = useSelector((state) => state.products);
  const [sortBy, setSortBy] = useState('');
  const [applySorting, setApplySorting] = useState(false);

  useEffect(() => {
    setApplySorting(true);
  }, [sortBy]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg ml-60 w-80">
          <Spinner animation="border" variant="indigo" />
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg relative ml-40 w-80" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // Sort the products based on the sortBy state only if applySorting is true
  const sortedProducts = applySorting
    ? [...productsData].sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'most-popular-asc':
            return a.rating - b.rating;
          case 'most-popular-desc':
            return b.rating - a.rating;
          default:
            return 0;
        }
      })
    : productsData;

  return (
    <div>
      <h2 className='lg:mt-20 mt-10 mb-10 text-3xl font-bold text-left ml-5 text-gray-800'>Products</h2>
      <div className='mb-2 flex justify-end items-center'>
        <h2 className='font-bold text-right text-gray-800 mr-4'>
          Sort by
        </h2>
        <select
          name="sort"
          id="sort"
          onChange={(e) => setSortBy(e.currentTarget.value)}
          className='mr-12 p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150'
        >
          <option value="">Select Sorting</option>
          <option value="most-popular-asc">Most Popular - Ascending</option>
          <option value="price-asc">Price - Ascending</option>
          <option value="most-popular-desc">Most Popular - Descending</option>
          <option value="price-desc">Price - Descending</option>
        </select>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mr-20'>
        {sortedProducts.slice(0, 9).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Products;
