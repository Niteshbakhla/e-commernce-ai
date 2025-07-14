import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CartButton = ({ productId, hanldeAddToCart }) => {
            const navigate = useNavigate();
            const carts = useSelector(state => state.cart.isCartItemExist)
            const isCartExist = carts?.includes(productId)
            return (
                        <div>
                                    {
                                                isCartExist ? <button onClick={() => navigate("/cart")} className="btn btn-sm btn-primary active:scale-[0.9]">Go to Cart</button> :
                                                            <button onClick={() => { hanldeAddToCart(productId) }} className="btn btn-sm btn-primary active:scale-[0.9]">Add to Cart</button>
                                    }


                        </div>
            )
}

export default CartButton