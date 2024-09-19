import React, { useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../features/ProductSlice';
import { MdClose } from 'react-icons/md';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

  const getCart = useSelector(state => state.carts.CartItems);
  const numOfCarts = getCart.length;

  const handleCart = () => {
    navigate('/mycart');
  };

  const navItems = [
    { name: 'Mens', href: '#' },
    { name: 'Womens', href: '#' },
    { name: 'New Arrivals', href: '#' },
    { name: 'My Favourites', href: '#' }
  ];

  const handleSearch = () => {
    if (searchValue.trim()) {
      dispatch(fetchProducts({ category: searchValue, type: 'search' }));
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-gray-800 mr-8">
            <Link to="/">LET'S SHOP</Link>
          </h1>
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center bg-gray-100 rounded-full px-3 py-2">
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-transparent focus:outline-none text-gray-700 w-full"
            />
            {searchValue && (
              <MdClose 
                onClick={handleClearSearch}
                className="cursor-pointer text-gray-500 mr-2"
              />
            )}
            <FaSearch onClick={handleSearch} className="cursor-pointer text-gray-500" />
          </div>
          <FaUser className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl" aria-label="User" />
          <div className="relative">
            <FaShoppingCart 
              onClick={handleCart}
              className="text-gray-600 hover:text-gray-800 cursor-pointer text-xl"
              aria-label="Cart"
            />
            {numOfCarts > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {numOfCarts}
              </span>
            )}
          </div>
          <button
            className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <nav className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-gray-800 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
            <div className="relative flex items-center bg-gray-100 rounded-full px-3 py-2">
              <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="Search"
                className="bg-transparent focus:outline-none text-gray-700 w-full"
              />
              {searchValue && (
                <MdClose 
                  onClick={handleClearSearch}
                  className="cursor-pointer text-gray-500 mr-2"
                />
              )}
              <FaSearch onClick={handleSearch} className="cursor-pointer text-gray-500" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
