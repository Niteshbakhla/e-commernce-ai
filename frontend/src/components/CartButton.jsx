import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CartButton = ({ productId, hanldeAddToCart }) => {
            const navigate = useNavigate();
            const carts = useSelector(state => state.cart.isCartItemExist)
            const { loadingProductId } = useSelector(state => state.cart)
            const isCartExist = carts?.includes(productId)
            console.log(isCartExist)
            return (
                        <div>
                                    {
                                                isCartExist ? <button onClick={() => navigate("/cart")} className="btn btn-sm btn-primary active:scale-[0.9]">Got to cart</button> :
                                                            <button onClick={() => { hanldeAddToCart(productId) }} className="btn btn-sm bg-primary text-white   hover:bg-button-hover  active:scale-[0.9]">{productId === loadingProductId ? "loading....." : "add to cart"}</button>
                                    }
                        </div>
            )
}

export default CartButton