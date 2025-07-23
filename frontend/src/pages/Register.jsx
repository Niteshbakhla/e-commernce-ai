import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import toast from "react-hot-toast";
import axiosinstance from "../axios/axios";
import axios from "axios";

const Register = () => {
            const [user, setUser] = useState({ name: "", email: "", password: "", role: "user" });
            const navigate = useNavigate();

            const handleChange = (e) => {
                        setUser({ ...user, [e.target.name]: e.target.value });
            };

            const handleSubmit = async (e) => {
                        e.preventDefault();
                        try {
                                    const res = await axiosinstance.post("/auth/register", user);
                                    toast.success(res.data.message);
                                    navigate("/login")
                        } catch (err) {
                                    console.log("Register error:", err)
                                    toast.error(err.response?.data.message || "Some went wrong")
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
                                                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                                                <form onSubmit={handleSubmit}>
                                                            <div className="form-control mb-2">
                                                                        <label className="label">Name</label>
                                                                        <input required type="text" name="name" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                                            </div>
                                                            <div className="form-control mb-2">
                                                                        <label className="label">Email</label>
                                                                        <input required type="email" name="email" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                                            </div>
                                                            <div className="form-control mb-4">
                                                                        <label className="label">Password</label>
                                                                        <input required type="password" name="password" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
                                                            </div>
                                                            <div className="form-control mb-4">
                                                                        <label className="label">Role</label>
                                                                        {/* <input required type="password" name="password" onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" /> */}
                                                                        <select name="role" className="w-full py-2 mt-1" onChange={handleChange}>
                                                                                    <option value="user">User</option>
                                                                                    <option value="seller">Seller</option>
                                                                        </select>
                                                            </div>
                                                            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 rounded-md shadow-md transform hover:scale-105 duration-200">Register</button>
                                                </form>

                                                <div className="mt-4 text-center">
                                                            <p className="text-sm">
                                                                        Already have an account?{" "}
                                                                        <Link to="/login" className="text-primary font-semibold hover:underline">
                                                                                    Login
                                                                        </Link>
                                                            </p>
                                                </div>
                                    </motion.div>


                        </div>
            );
};

export default Register;
