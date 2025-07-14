import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = ({ name = 'John' }) => {
            const [isOpen, setIsOpen] = useState(false);
            const dropdownRef = useRef(null);
            const cartItems = useSelector((state) => state.cart.cartItems);
            const toggleDropdown = () => setIsOpen(!isOpen);

            const handleClickOutside = (event) => {
                        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                                    setIsOpen(false);
                        }
            };

            useEffect(() => {
                        document.addEventListener('mousedown', handleClickOutside);
                        return () => document.removeEventListener('mousedown', handleClickOutside);
            }, []);

            const initial = name.charAt(0).toUpperCase();

            return (
                        <div className="relative inline-block text-left" ref={dropdownRef}>
                                    <button
                                                onClick={toggleDropdown}
                                                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold hover:bg-blue-700 transition duration-200"
                                    >
                                                {initial}
                                    </button>

                                    {isOpen && (
                                                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                                            <div className="py-1">
                                                                        <Link to={"/cart"} className="w-full text-left inline-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                                                    🛒 Cart <span className="w-4 h-4 inline-block  text-center pb-5 rounded-full text-white bg-red-600">{cartItems?.item?.length || 0}</span>
                                                                        </Link>
                                                                        <button
                                                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                                    onClick={() => alert('Go to Wishlist')}
                                                                        >
                                                                                    ❤️ Wishlist
                                                                        </button>
                                                                        <Link to={"/order"}
                                                                                    className="w-full text-left px-4  py-2 text-sm text-gray-700 hover:bg-gray-100"

                                                                        >
                                                                                    📥 Your order
                                                                        </Link>
                                                            </div>
                                                </div>
                                    )}
                        </div>
            );
};

export default UserMenu;
