import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../redux/slices/wishlistSlice';

const HeartButton = ({ productId }) => {
            const dispatch = useDispatch();
            const wishlistIds = useSelector((state) => state.wishlist.wishlistIds);
            const isWishlisted = wishlistIds.includes(productId);
            const handleClick = () => {
                        dispatch(toggleWishlist(productId))
            }
            return (
                        <div>
                                    {
                                                isWishlisted ? (

                                                            <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6 cursor-pointer">
                                                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                            </svg>
                                                ) : (
                                                            <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer ">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                            </svg>
                                                )
                                    }

                        </div>
            )
}

export default HeartButton