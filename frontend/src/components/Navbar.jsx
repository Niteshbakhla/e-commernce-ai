import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setIsLogin } from "../redux/slices/userSlice";
import UserMenu from "./UserButton";
import { useState, useEffect } from "react";
import { setSearchProduct } from "../redux/slices/cartSlice";
import axiosinstance from "../axios/axios";


const Navbar = () => {
            const [searchItem, setSearchItem] = useState("");
            const { isLogin, userName } = useSelector((state) => state.user);
            const dispatch = useDispatch()
            const navigate = useNavigate();
            const location = useLocation();
            const path = ["/login", "/register", "/seller"];

            const logoutHandler = async () => {
                        try {
                                    const { data } = await axiosinstance.get("/auth/logout", { withCredentials: true })
                                    toast.success(data.message)
                                    dispatch(setIsLogin(false))
                                    navigate("/login")
                        } catch (error) {
                                    console.log("Logout error:", error)
                                    toast.error(error.response.data.message);
                        }
            }


            useEffect(() => {
                        const fetchSearchProduct = async () => {
                                    try {
                                                const { data } = await axiosinstance.get("/v1/user/product/search", {
                                                            params: { searchItem },
                                                            withCredentials: true
                                                });

                                                dispatch(setSearchProduct(data.products));
                                    } catch (error) {
                                                console.log(error)
                                    }
                        }
                        const delayDebounce = setTimeout(() => {
                                    fetchSearchProduct();
                        }, 300)

                        return () => clearTimeout(delayDebounce)
            }, [searchItem]);

            return (
                        <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-10 flex gap-2">
                                    {/* Left - Logo */}
                                    <div className="flex-1">
                                                <Link to="/" className="text-xl font-bold text-primary">
                                                            ShopBrro
                                                </Link>
                                    </div>

                                    {/* Center - Search Bar (visible on md and above) */}
                                    {
                                                !path.includes(location.pathname) && <div className="flex-none w-1/2 max-w-xl mx-4 hidden md:flex">
                                                            <input
                                                                        onChange={(e) => setSearchItem(e.target.value)}
                                                                        type="text"
                                                                        placeholder="Search products..."
                                                                        className="input input-bordered w-full"
                                                            />
                                                </div>
                                    }

                                    {/* Right - Buttons */}
                                    <div className="flex-none space-x-3 items-center flex">
                                                {/* Desktop Only Buttons */}
                                                <div className="hidden md:flex space-x-3">


                                                            {
                                                                        isLogin ? <Link onClick={logoutHandler} className="btn btn-outline btn-primary">
                                                                                    logout
                                                                        </Link> : <Link to="/login" className="btn btn-outline btn-primary">
                                                                                    Login
                                                                        </Link>
                                                            }


                                                </div>


                                                {/* Mobile Only - Account Dropdown */}
                                                <div className="dropdown dropdown-end md:hidden">
                                                            <label tabIndex={0} className="btn btn-outline btn-primary">
                                                                        Account
                                                            </label>
                                                            <ul
                                                                        tabIndex={0}
                                                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                                                            >
                                                                        <li>
                                                                                    <Link to="/cart">🛒 Cart</Link>
                                                                        </li>
                                                                        <li>
                                                                                    <Link to="/login">Login</Link>
                                                                        </li>
                                                            </ul>
                                                </div>

                                                {/* Always visible - Seller Button */}
                                                <Link
                                                            to="/seller"
                                                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                                >
                                                            Become Seller
                                                </Link>
                                    </div>
                                    {
                                                (location.pathname !== "/login" && location.pathname !== "/register") && <UserMenu name={userName} />
                                    }
                        </div>
            );
};

export default Navbar;
