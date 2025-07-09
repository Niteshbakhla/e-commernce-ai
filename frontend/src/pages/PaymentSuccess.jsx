import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
            return (
                        <div className="min-h-[80vh] flex items-center justify-center bg-green-50 px-4">
                                    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">

                                                {/* Success Icon */}
                                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full">
                                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                </div>

                                                {/* Title */}
                                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>

                                                {/* Description */}
                                                <p className="text-gray-600 mb-6">
                                                            Thank you for your purchase. Your payment was processed successfully.
                                                </p>

                                                {/* Continue Shopping Button */}
                                                <Link
                                                            to={"/"}
                                                            // Replace with your actual route
                                                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                                                >
                                                            Continue Shopping
                                                </Link>
                                    </div>
                        </div>
            );
};

export default PaymentSuccess;
