import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../redux/slices/userSlice";
import axiosinstance from "../axios/axios";
import { Loader } from "lucide-react";

const Login = () => {
            const [user, setUser] = useState({ email: "", password: "" });
            const navigate = useNavigate();
            const dispatch = useDispatch();
            const [isLoading, setIsLoading] = useState(false);

            const handleChange = (e) => {
                        setUser({ ...user, [e.target.name]: e.target.value });
            };

            const handleSubmit = async (e) => {
                        e.preventDefault();
                        setIsLoading(true);
                        try {
                                    const { data } = await axiosinstance.post("/auth/login", user, {
                                                withCredentials: true,
                                    });
                                    toast.success(data.message);
                                    setUser({ email: "", password: "" });
                                    dispatch(setIsLogin(true))
                                    navigate("/")
                                    setIsLoading(false);
                        } catch (err) {
                                    setIsLoading(false)
                                    console.log("Login error:", err);
                                    toast.error(err.response.data.message)
                        }
            };

            return (
                        <div className="h-[90vh] flex items-center justify-center ">
                                    <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.1 }}
                                                className="w-full max-w-sm shadow-xl bg-base-100 rounded p-6">
                                                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                                                <form onSubmit={handleSubmit}>
                                                            <div className="form-control mb-2">
                                                                        <label className="label">Email</label>
                                                                        <input
                                                                                    type="email"
                                                                                    value={user.email}
                                                                                    name="email"
                                                                                    onChange={handleChange}
                                                                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                                                        />
                                                            </div>
                                                            <div className="form-control mb-4">
                                                                        <label className="label">Password</label>
                                                                        <input
                                                                                    type="password"
                                                                                    value={user.password}
                                                                                    name="password"
                                                                                    onChange={handleChange}
                                                                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                                                        />
                                                            </div>
                                                            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md transform hover:scale-105 duration-200">
                                                                        {
                                                                                    isLoading ? <Loader className="animate-spin" /> : "Login"
                                                                        }
                                                            </button>
                                                </form>

                                                {/* 👇 New Customer Link */}
                                                <div className="mt-4 text-center">
                                                            <p className="text-sm">
                                                                        New customer?{" "}
                                                                        <Link to="/register" className="text-primary font-semibold hover:underline">
                                                                                    Create an account
                                                                        </Link>
                                                            </p>
                                                </div>
                                    </motion.div>
                        </div>
            );
};

export default Login;
