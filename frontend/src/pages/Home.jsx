import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { setWishlistIds } from "../redux/slices/wishlistSlice";
import HeartButton from "../components/HeartButton";
import CartButton from "../components/CartButton";
import axiosinstance from "../axios/axios";

const HomePage = () => {
            const [products, setProducts] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);
            const dispatch = useDispatch();
            const { searchProduct } = useSelector(state => state.cart);


            // Fetch products from backend
            useEffect(() => {
                        const fetchProducts = async () => {
                                    try {
                                                const { data } = await axiosinstance.get("/v1/user/product", { withCredentials: true })
                                                setProducts(data.product);
                                                console.log(data)
                                    } catch (err) {
                                                setError(err.message);
                                    } finally {
                                                setLoading(false);
                                    }
                        };

                        fetchProducts();
            }, []);

            useEffect(() => {
                        const fetchWishlist = async () => {
                                    const { data } = await axiosinstance.get("/v1/user/wishlistid", { withCredentials: true });
                                    dispatch(setWishlistIds(data.wishlistIds))
                        }
                        fetchWishlist();
            }, [])

            const hanldeAddToCart = (id) => {
                        dispatch(addToCart(id))
            }



            return (
                        <div
                                    className="p-6">
                                    <h1 className="text-3xl font-bold mb-4 text-center">🛍️ All Products</h1>

                                    {/* {loading && (
                                                <div className="flex justify-center items-center">
                                                            <span className="loading loading-spinner loading-lg text-primary"></span>
                                                </div>
                                    )} */}

                                    {error && (
                                                <div className="alert alert-error shadow-lg mt-4">
                                                            <span>❌ {error}</span>
                                                </div>
                                    )}

                                    <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.1 }}
                                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                                                {!loading &&
                                                            !error &&
                                                            searchProduct.map((product) => (
                                                                        <div key={product._id} className="card bg-base-100 shadow-xl border border-black/20">
                                                                                    <figure className="border m-1 border-black/10">
                                                                                                <img
                                                                                                            src={product.productImage || product.productUrl}
                                                                                                            alt={product.productName}
                                                                                                            className="h-48 w-full "
                                                                                                />
                                                                                                {console.log(product.productUrl)}
                                                                                    </figure>
                                                                                    <div className="card-body">
                                                                                                <h2 className="card-title w-fit bg-button-light text-white rounded-2xl px-2 ">{product.productName}</h2>
                                                                                                <p className="text-sm">{product.productDescription}</p>
                                                                                                <div className="card-actions justify-between items-center mt-2">
                                                                                                            <span className="text-lg font-semibold text-primary">
                                                                                                                        ₹{product.productPrice}
                                                                                                            </span>
                                                                                                            <div className="flex items-center gap-2">
                                                                                                                        <HeartButton productId={product._id} />
                                                                                                                        <CartButton productId={product._id} hanldeAddToCart={hanldeAddToCart} />
                                                                                                            </div>
                                                                                                </div>
                                                                                    </div>
                                                                        </div>
                                                            ))
                                                }
                                    </motion.div >
                        </div >
            );
};

export default HomePage;
