import React, { useState } from 'react';
import { Edit, Trash2, Plus, Package, DollarSign, Eye, Search } from 'lucide-react';

const SellerDashboard = () => {
            const [products, setProducts] = useState([
                        {
                                    id: 1,
                                    productName: 'Wireless Bluetooth Headphones',
                                    productTitle: 'Premium Wireless Bluetooth Headphones with Noise Cancellation',
                                    productBrand: 'TechSound',
                                    productPrice: 149.99,
                                    productDescription: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
                                    productImage: null,
                                    createdAt: '2024-01-15'
                        },
                        {
                                    id: 2,
                                    productName: 'Smart Watch',
                                    productTitle: 'Fitness Smart Watch with Heart Rate Monitor',
                                    productBrand: 'FitTech',
                                    productPrice: 199.99,
                                    productDescription: 'Advanced fitness tracking with heart rate monitoring, GPS, and water resistance.',
                                    productImage: null,
                                    createdAt: '2024-01-10'
                        },
                        {
                                    id: 3,
                                    productName: 'USB-C Cable',
                                    productTitle: 'Fast Charging USB-C Cable 6ft',
                                    productBrand: 'ChargeFast',
                                    productPrice: 12.99,
                                    productDescription: 'Durable USB-C cable with fast charging capability and data transfer.',
                                    productImage: null,
                                    createdAt: '2024-01-05'
                        }
            ]);

            const [editingProduct, setEditingProduct] = useState(null);
            const [searchTerm, setSearchTerm] = useState('');
            const [showAddForm, setShowAddForm] = useState(false);

            const [formData, setFormData] = useState({
                        productName: '',
                        productTitle: '',
                        productBrand: '',
                        productPrice: '',
                        productDescription: '',
                        productImage: null
            });

            const handleInputChange = (e) => {
                        const { name, value } = e.target;
                        setFormData(prev => ({
                                    ...prev,
                                    [name]: value
                        }));
            };

            const handleFileChange = (e) => {
                        setFormData(prev => ({
                                    ...prev,
                                    productImage: e.target.files[0]
                        }));
            };

            const handleAddProduct = (e) => {
                        e.preventDefault();
                        if (formData.productName && formData.productPrice) {
                                    const newProduct = {
                                                id: products.length + 1,
                                                ...formData,
                                                productPrice: parseFloat(formData.productPrice),
                                                createdAt: new Date().toISOString().split('T')[0]
                                    };
                                    setProducts(prev => [newProduct, ...prev]);
                                    setFormData({
                                                productName: '',
                                                productTitle: '',
                                                productBrand: '',
                                                productPrice: '',
                                                productDescription: '',
                                                productImage: null
                                    });
                                    setShowAddForm(false);
                        }
            };

            const handleEditProduct = (product) => {
                        setEditingProduct(product.id);
                        setFormData({
                                    productName: product.productName,
                                    productTitle: product.productTitle,
                                    productBrand: product.productBrand,
                                    productPrice: product.productPrice.toString(),
                                    productDescription: product.productDescription,
                                    productImage: product.productImage
                        });
            };

            const handleUpdateProduct = (e) => {
                        e.preventDefault();
                        if (formData.productName && formData.productPrice) {
                                    setProducts(prev => prev.map(product =>
                                                product.id === editingProduct
                                                            ? { ...product, ...formData, productPrice: parseFloat(formData.productPrice) }
                                                            : product
                                    ));
                                    setEditingProduct(null);
                                    setFormData({
                                                productName: '',
                                                productTitle: '',
                                                productBrand: '',
                                                productPrice: '',
                                                productDescription: '',
                                                productImage: null
                                    });
                        }
            };

            const handleDeleteProduct = (id) => {
                        if (window.confirm('Are you sure you want to delete this product?')) {
                                    setProducts(prev => prev.filter(product => product.id !== id));
                        }
            };

            const filteredProducts = products.filter(product =>
                        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.productBrand.toLowerCase().includes(searchTerm.toLowerCase())
            );

            const totalProducts = products.length;
            const totalValue = products.reduce((sum, product) => sum + product.productPrice, 0);

            return (
                        <div className="min-h-screen bg-gray-50 p-4">
                                    <div className="max-w-7xl mx-auto">
                                                {/* Header */}
                                                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                                        <div>
                                                                                    <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
                                                                                    <p className="text-gray-600 mt-1">Manage your products and track performance</p>
                                                                        </div>
                                                                        <button
                                                                                    onClick={() => setShowAddForm(true)}
                                                                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                                                        >
                                                                                    <Plus className="w-4 h-4" />
                                                                                    Add Product
                                                                        </button>
                                                            </div>
                                                </div>

                                                {/* Stats Cards */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                                            <div className="bg-white rounded-lg shadow-sm p-6">
                                                                        <div className="flex items-center justify-between">
                                                                                    <div>
                                                                                                <p className="text-sm font-medium text-gray-600">Total Products</p>
                                                                                                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                                                                                    </div>
                                                                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                                                <Package className="w-6 h-6 text-blue-600" />
                                                                                    </div>
                                                                        </div>
                                                            </div>

                                                            <div className="bg-white rounded-lg shadow-sm p-6">
                                                                        <div className="flex items-center justify-between">
                                                                                    <div>
                                                                                                <p className="text-sm font-medium text-gray-600">Total Value</p>
                                                                                                <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
                                                                                    </div>
                                                                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                                                                <DollarSign className="w-6 h-6 text-green-600" />
                                                                                    </div>
                                                                        </div>
                                                            </div>

                                                            <div className="bg-white rounded-lg shadow-sm p-6">
                                                                        <div className="flex items-center justify-between">
                                                                                    <div>
                                                                                                <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                                                                                                <p className="text-2xl font-bold text-gray-900">
                                                                                                            ${totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : '0.00'}
                                                                                                </p>
                                                                                    </div>
                                                                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                                                                <Eye className="w-6 h-6 text-purple-600" />
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                </div>

                                                {/* Search */}
                                                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                                            <div className="relative">
                                                                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                                                                        <input
                                                                                    type="text"
                                                                                    placeholder="Search products by name or brand..."
                                                                                    value={searchTerm}
                                                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                        />
                                                            </div>
                                                </div>

                                                {/* Add/Edit Product Form */}
                                                {(showAddForm || editingProduct) && (
                                                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                                                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                                                                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                                                        </h2>
                                                                        <div className="space-y-4">
                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                                <div>
                                                                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                                                        Product Name *
                                                                                                            </label>
                                                                                                            <input
                                                                                                                        type="text"
                                                                                                                        name="productName"
                                                                                                                        value={formData.productName}
                                                                                                                        onChange={handleInputChange}
                                                                                                                        required
                                                                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                                                        placeholder="Enter product name"
                                                                                                            />
                                                                                                </div>
                                                                                                <div>
                                                                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                                                        Brand
                                                                                                            </label>
                                                                                                            <input
                                                                                                                        type="text"
                                                                                                                        name="productBrand"
                                                                                                                        value={formData.productBrand}
                                                                                                                        onChange={handleInputChange}
                                                                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                                                        placeholder="Enter brand name"
                                                                                                            />
                                                                                                </div>
                                                                                    </div>

                                                                                    <div>
                                                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                                            Product Title
                                                                                                </label>
                                                                                                <input
                                                                                                            type="text"
                                                                                                            name="productTitle"
                                                                                                            value={formData.productTitle}
                                                                                                            onChange={handleInputChange}
                                                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                                            placeholder="Enter product title"
                                                                                                />
                                                                                    </div>

                                                                                    <div>
                                                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                                            Price *
                                                                                                </label>
                                                                                                <div className="relative">
                                                                                                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                                                                                                            <input
                                                                                                                        type="number"
                                                                                                                        name="productPrice"
                                                                                                                        value={formData.productPrice}
                                                                                                                        onChange={handleInputChange}
                                                                                                                        required
                                                                                                                        step="0.01"
                                                                                                                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                                                        placeholder="0.00"
                                                                                                            />
                                                                                                </div>
                                                                                    </div>

                                                                                    <div>
                                                                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                                                            Description
                                                                                                </label>
                                                                                                <textarea
                                                                                                            name="productDescription"
                                                                                                            value={formData.productDescription}
                                                                                                            onChange={handleInputChange}
                                                                                                            rows={3}
                                                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                                                                            placeholder="Enter product description"
                                                                                                />
                                                                                    </div>

                                                                                    <div className="flex gap-2">
                                                                                                <button
                                                                                                            type="button"
                                                                                                            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                                                                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                                                                                >
                                                                                                            {editingProduct ? 'Update Product' : 'Add Product'}
                                                                                                </button>
                                                                                                <button
                                                                                                            type="button"
                                                                                                            onClick={() => {
                                                                                                                        setShowAddForm(false);
                                                                                                                        setEditingProduct(null);
                                                                                                                        setFormData({
                                                                                                                                    productName: '',
                                                                                                                                    productTitle: '',
                                                                                                                                    productBrand: '',
                                                                                                                                    productPrice: '',
                                                                                                                                    productDescription: '',
                                                                                                                                    productImage: null
                                                                                                                        });
                                                                                                            }}
                                                                                                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                                                                                                >
                                                                                                            Cancel
                                                                                                </button>
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                )}

                                                {/* Products List */}
                                                <div className="bg-white rounded-lg shadow-sm">
                                                            <div className="p-6 border-b border-gray-200">
                                                                        <h2 className="text-xl font-bold text-gray-900">Your Products</h2>
                                                            </div>

                                                            <div className="overflow-x-auto">
                                                                        <table className="w-full">
                                                                                    <thead className="bg-gray-50">
                                                                                                <tr>
                                                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                                        Product
                                                                                                            </th>
                                                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                                        Brand
                                                                                                            </th>
                                                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                                        Price
                                                                                                            </th>
                                                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                                        Created
                                                                                                            </th>
                                                                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                                        Actions
                                                                                                            </th>
                                                                                                </tr>
                                                                                    </thead>
                                                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                                                                {filteredProducts.map((product) => (
                                                                                                            <tr key={product.id} className="hover:bg-gray-50">
                                                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                                                                    <div>
                                                                                                                                                <div className="text-sm font-medium text-gray-900">
                                                                                                                                                            {product.productName}
                                                                                                                                                </div>
                                                                                                                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                                                                                                                            {product.productTitle}
                                                                                                                                                </div>
                                                                                                                                    </div>
                                                                                                                        </td>
                                                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                                                                    <div className="text-sm text-gray-900">{product.productBrand}</div>
                                                                                                                        </td>
                                                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                                                                    <div className="text-sm font-medium text-gray-900">
                                                                                                                                                ${product.productPrice.toFixed(2)}
                                                                                                                                    </div>
                                                                                                                        </td>
                                                                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                                                                                    <div className="text-sm text-gray-500">{product.createdAt}</div>
                                                                                                                        </td>
                                                                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                                                                                    <div className="flex space-x-2">
                                                                                                                                                <button
                                                                                                                                                            onClick={() => handleEditProduct(product)}
                                                                                                                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors duration-200"
                                                                                                                                                >
                                                                                                                                                            <Edit className="w-4 h-4" />
                                                                                                                                                </button>
                                                                                                                                                <button
                                                                                                                                                            onClick={() => handleDeleteProduct(product.id)}
                                                                                                                                                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors duration-200"
                                                                                                                                                >
                                                                                                                                                            <Trash2 className="w-4 h-4" />
                                                                                                                                                </button>
                                                                                                                                    </div>
                                                                                                                        </td>
                                                                                                            </tr>
                                                                                                ))}
                                                                                    </tbody>
                                                                        </table>

                                                                        {filteredProducts.length === 0 && (
                                                                                    <div className="text-center py-12">
                                                                                                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                                                                <p className="text-gray-500">
                                                                                                            {searchTerm ? 'No products found matching your search.' : 'No products yet. Add your first product!'}
                                                                                                </p>
                                                                                    </div>
                                                                        )}
                                                            </div>
                                                </div>
                                    </div>
                        </div>
            );
};

export default SellerDashboard;