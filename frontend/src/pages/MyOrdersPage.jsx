import { useEffect, useState } from 'react';
import axiosinstance from '../axios/axios';

const MyOrdersPage = () => {
            const [orders, setOrders] = useState([]);
            const [loading, setLoading] = useState(true);
            const [domElem, setDomElem] = useState(null);

            useEffect(() => {
                        const fetchOrders = async () => {
                                    try {
                                                const { data } = await axiosinstance.get('/v1/user/product/order');
                                                setOrders(data.orders)

                                    } catch (error) {
                                                console.error('Failed to load orders:', error);
                                    } finally {
                                                setLoading(false);
                                    }
                        };
                        fetchOrders();
            }, []);
           
            if (loading) {
                        return (
                                    <div  className="flex justify-center items-center h-screen">
                                                <div className="text-gray-500">Loading orders...</div>
                                    </div>
                        );
            }

            return (
                        <div className="max-w-5xl mx-auto p-4">
                                    <h2 className="text-3xl font-semibold mb-6">My Orders</h2>
                                    {orders.length === 0 ? (
                                                <p className="text-gray-500">You have no orders yet.</p>
                                    ) : (
                                                orders.map((order) => (
                                                            <div
                                                                        key={order._id}
                                                                        className="bg-white shadow rounded-lg mb-6 p-4 border border-gray-100"
                                                            >
                                                                        <div className="mb-4">
                                                                                    <div className="flex justify-between items-center text-gray-600 text-sm">
                                                                                                <span>Order ID: <span className="text-gray-800 font-medium">{order._id}</span></span>
                                                                                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                                                    </div>
                                                                                    <div className="text-gray-700 mt-1">Total Bill: <span className="font-semibold text-green-600">${order.bill}</span></div>
                                                                        </div>

                                                                        <div className="grid md:grid-cols-2 gap-4">
                                                                                    {order.item.map((item) => (
                                                                                                <div
                                                                                                            key={item._id}
                                                                                                            className="flex items-center gap-4 bg-gray-50 rounded p-3"
                                                                                                >
                                                                                                            <img
                                                                                                                        src={item.productId.productImage}
                                                                                                                        alt={item.productId.productTitle}
                                                                                                                        className="w-20 h-20 object-cover rounded"
                                                                                                            />
                                                                                                            <div>
                                                                                                                        <h5 className="font-medium text-gray-800">{item.productId.productName}</h5>
                                                                                                                        <p className="text-gray-500 text-sm">{item.productId.productTitle}</p>
                                                                                                                        <p className="text-gray-600 text-sm">Brand: {item.productId.productBrand}</p>
                                                                                                                        <p className="text-gray-700 text-sm">Price: ${item.productId.productPrice}</p>
                                                                                                                        <p className="text-gray-700 text-sm">Quantity: {item.quantity}</p>
                                                                                                            </div>
                                                                                                </div>
                                                                                    ))}
                                                                        </div>
                                                            </div>
                                                ))
                                    )}
                        </div>
            );
};

export default MyOrdersPage;
