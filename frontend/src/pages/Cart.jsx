import { useDispatch, useSelector } from "react-redux";// assuming this exists
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchCart } from "../redux/slices/cartSlice";
import { motion } from "framer-motion";
import { useRazorpay } from "react-razorpay"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosinstance from "../axios/axios";
import { LoaderCircle } from "lucide-react";

const Cart = () => {
            const dispatch = useDispatch();
            const navigate = useNavigate();
            const cartItems = useSelector((state) => state.cart.cartItems);
            const [isLoading, setIsLoading] = useState(false)


            const { Razorpay } = useRazorpay();

            const handleBuyNow = async (productInfo) => {
                        setIsLoading(true)
                        try {
                                    const { data } = await axiosinstance.post("/v1/create-order", productInfo, { withCredentials: true })
                                    const { amount, currency, id, notes: { mongoOrderId } } = data.order;
                                    const RazorpayOrderOptions = {
                                                key: "rzp_test_jsP25tWjtceUAz",
                                                amount,
                                                currency,
                                                name: "ShopBroo",
                                                description: "Test Transaction",
                                                order_id: id,
                                                // callback_url: "http://localhost:5173/payment",
                                                handler: async function (response) {

                                                            const orderInfo = { ...response, ...productInfo, mongoOrderId };
                                                            const { data } = await axiosinstance.post("/v1/verify-payment", orderInfo, { withCredentials: true });
                                                            if (data.success) {
                                                                        toast.success("Thanks for purchasing")
                                                                        dispatch(fetchCart())
                                                                        navigate("/payment");

                                                            }
                                                },
                                                prefill: {
                                                            name: "Nitesh",
                                                            email: "nitesh@gmail.com",
                                                            contact: "999999999"
                                                },
                                                theme: {
                                                            color: '#F37254'
                                                }
                                    }

                                    const rzp = new Razorpay(RazorpayOrderOptions);
                                    rzp.open();
                                    setIsLoading(false)

                        } catch (error) {
                                    console.error("Payment error:", error);
                                    toast.error("Failed to initiate payment. Please try again.");
                                    setIsLoading(false);
                        }
            }

            const deleteCart = async (id) => {
                        try {
                                    const { data } = await axiosinstance.delete(`/v1/user/product/${id}`, { withCredentials: true })

                                    dispatch(fetchCart());
                                    toast.success(data.message)
                        } catch (error) {

                                    toast.error(error.response.data.message)
                                    console.log(error)
                        }
            }

            useEffect(() => {
                        dispatch(fetchCart())
            }, [])

            return (
                        <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.1 }}
                                    className="p-4 min-h-screen bg-base-200">
                                    <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

                                    {cartItems && cartItems?.length === 0 ? (
                                                <div className="text-center text-xl">
                                                            Cart is empty! <Link to="/" className="text-blue-500">Go Shopping</Link>
                                                </div>
                                    ) : (
                                                <div className="grid md:grid-cols-3 gap-6">
                                                            {/* Cart Items */}
                                                            <div className="md:col-span-2 space-y-4">
                                                                        {cartItems && cartItems.item?.map((item) => (
                                                                                    <div
                                                                                                key={item._id}
                                                                                                className="bg-white shadow-md rounded p-4 flex items-center justify-between"
                                                                                    >
                                                                                                {/* {item} */}
                                                                                                <div className="flex gap-4 items-center">
                                                                                                            <img
                                                                                                                        src={item.image}
                                                                                                                        alt={item.title}
                                                                                                                        className="w-20 h-20 object-cover rounded"
                                                                                                            />
                                                                                                            <div>
                                                                                                                        <h2 className="text-lg font-semibold">{item.title}</h2>
                                                                                                                        <p className="text-sm text-gray-600">₹{item.price}</p>

                                                                                                                        {/* Quantity Controller */}
                                                                                                                        <div className="mt-2 flex items-center gap-2">
                                                                                                                                    <button
                                                                                                                                                className="btn btn-xs btn-outline"
                                                                                                                                                onClick={() =>
                                                                                                                                                            dispatch(updateQuantity({ id: item.id, type: "decrease" }))
                                                                                                                                                }
                                                                                                                                    >
                                                                                                                                                -
                                                                                                                                    </button>
                                                                                                                                    <span>{item.quantity}</span>
                                                                                                                                    <button
                                                                                                                                                className="btn btn-xs btn-outline"
                                                                                                                                                onClick={() => { dispatch(addToCart(item.productId)), dispatch(fetchCart()) }}
                                                                                                                                    >
                                                                                                                                                +
                                                                                                                                    </button>
                                                                                                                        </div>
                                                                                                            </div>
                                                                                                </div>

                                                                                                {/* Remove Item */}
                                                                                                <button
                                                                                                            className="btn  bg-red-500"
                                                                                                            onClick={() => (deleteCart(item._id))}
                                                                                                >
                                                                                                            Remove
                                                                                                </button>
                                                                                    </div>
                                                                        ))}
                                                            </div>

                                                            {/* Summary Section */}
                                                            <div className="bg-white shadow-md rounded p-4">
                                                                        <h3 className="text-xl font-bold mb-4">Price Summary</h3>
                                                                        <div className="flex justify-between mb-2">
                                                                                    <span>Total Items:</span>
                                                                                    <span>{cartItems && cartItems.item?.length}</span>
                                                                        </div>
                                                                        <div className="flex justify-between mb-2">
                                                                                    <span>Total Price:</span>
                                                                                    <span>₹{cartItems?.bill ? cartItems.bill.toFixed(2) : " 0"}</span>
                                                                        </div>
                                                                        <div className="divider"></div>
                                                                        <button onClick={() => handleBuyNow(cartItems)} className="w-full bg-purple-600 mb-2 hover:bg-purple-700 active:scale-[0.9]  transition-colors text-white font-semibold py-3 rounded-md shadow-md transform flex justify-center hover:scale-105 duration-200">{isLoading ? <LoaderCircle className="animate-spin" /> : "Placer Order"}</button>
                                                                        <button
                                                                                    className="w-full   transition-colors cursor-pointer text-gray-600 border border-pink-300  font-semibold py-3 rounded-md shadow-md transform hover:scale-105 duration-200"
                                                                                    onClick={() => navigate("/")}
                                                                        >
                                                                                    Cancel Cart
                                                                        </button>
                                                            </div>
                                                </div>
                                    )}
                        </motion.div>
            );
};

export default Cart;
