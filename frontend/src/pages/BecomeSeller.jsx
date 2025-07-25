import { useState } from 'react';
import axiosinstance from '../axios/axios';
import toast from 'react-hot-toast';


const ProductUploadForm = () => {
            const [formData, setFormData] = useState({
                        productName: '',
                        productTitle: '',
                        productDescription: '',
                        productBrand: '',
                        productPrice: '',
                        productImage: null,
                        productUrl: ""
            });

            const [aiContent, setAIContent] = useState(null);
            const [show, setShow] = useState(false);

            const [loading, setLoading] = useState({
                        name: false,
                        description: false,
                        price: false
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

            const handleAISuggest = async (field) => {
                        setLoading(prev => ({ ...prev, [field]: true }));
                        try {

                                    const AIData = {
                                                type: field,
                                                data: formData
                                    }
                                    const { data } = await axiosinstance.post("/v1/user/product-ai", AIData, { withCredentials: true });
                                    const { fieldName } = data.content;
                                    if (fieldName === "name") {
                                                setAIContent(data.content.text);
                                    } else if (fieldName === "description") {
                                                formData.productDescription = data.content.text
                                    } else {
                                                formData.productPrice = data.content.text
                                    }
                                    setLoading(prev => ({ ...prev, [field]: false }));
                        } catch (error) {
                                    setLoading(prev => ({ ...prev, [field]: false }));
                        }
            };

            const handleSubmit = async () => {
                        const productData = new FormData();
                        productData.append("productName", formData.productName);
                        productData.append("productImage", formData.productImage);
                        productData.append("productDescription", formData.productDescription);
                        productData.append("productPrice", String(formData.productPrice)); // ensure string
                        productData.append("productTitle", formData.productTitle);
                        productData.append("productBrand", formData.productBrand)
                        productData.append("productUrl", formData.productUrl)

                        console.log([...productData]); // better way to see what's inside

                        try {
                                    const { data } = await axiosinstance.post("/v1/admin/product", productData);
                                    console.log("Success:", data);
                                    toast.success(data.message)
                        } catch (error) {
                                    console.log("Submit error:-", error);
                                    if (error.response?.data?.message) {
                                                toast.error(error.response.data.message);
                                    } else {
                                                toast.error("Something went wrong!");
                                    }
                        }
            }


            return (
                        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
                                                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                                                            Add New Product
                                                </h1>

                                                <div className="space-y-6">
                                                            {/* Product Name */}
                                                            <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                    Product Name
                                                                        </label>
                                                                        <div className="flex gap-2 relative">
                                                                                    <input
                                                                                                type="text"
                                                                                                name="productName"
                                                                                                value={formData.productName}
                                                                                                onChange={handleInputChange}
                                                                                                placeholder="Enter product name"
                                                                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                    />

                                                                                    <button
                                                                                                onClick={() => handleAISuggest("name")}
                                                                                                disabled={loading.name}
                                                                                                className="px-4 py-2 bg-button-light hover:bg-button-hover disabled:bg-purple-300 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                                                                    >
                                                                                                {loading.name ? (
                                                                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                                                ) : (
                                                                                                            "🤖"
                                                                                                )}
                                                                                                Suggest  Name
                                                                                    </button>

                                                                                    {/* 💡 Suggestions dropdown */}
                                                                                    {aiContent?.length > 0 && (
                                                                                                <div className={`absolute top-full ${show ? "hidden" : "block"} mt-2 left-0 w-full z-10 bg-white border border-gray-200 rounded-lg shadow-lg`}>
                                                                                                            <ul className="divide-y divide-gray-100 max-h-56 overflow-auto">
                                                                                                                        {aiContent.map((item, index) => (
                                                                                                                                    <li
                                                                                                                                                key={index}
                                                                                                                                                onClick={() => {
                                                                                                                                                            setFormData((prev) => ({ ...prev, productName: item }))
                                                                                                                                                            setShow(true)
                                                                                                                                                }}
                                                                                                                                                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 transition-colors"
                                                                                                                                    >
                                                                                                                                                {item}
                                                                                                                                    </li>
                                                                                                                        ))}
                                                                                                            </ul>
                                                                                                </div>
                                                                                    )}
                                                                        </div>

                                                            </div>

                                                            {/* Product Title */}
                                                            <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                    Product Title
                                                                        </label>
                                                                        <input
                                                                                    type="text"
                                                                                    name="productTitle"
                                                                                    value={formData.productTitle}
                                                                                    onChange={handleInputChange}
                                                                                    placeholder="Enter full product title"
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                        />
                                                            </div>

                                                            {/* Product Description */}
                                                            <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                    Product Description
                                                                        </label>
                                                                        <div className="space-y-2">
                                                                                    <textarea
                                                                                                name="productDescription"
                                                                                                value={formData.productDescription}
                                                                                                onChange={handleInputChange}
                                                                                                placeholder={"Describe your product in detail..."}
                                                                                                rows={4}
                                                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                                                    />
                                                                                    <button
                                                                                                onClick={() => handleAISuggest('description')}
                                                                                                disabled={loading.description}
                                                                                                className="px-4 py-2 bg-button-light hover:bg-button-hover disabled:bg-purple-300 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                                                                    >
                                                                                                {loading.description ? (
                                                                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                                                ) : (
                                                                                                            '✨'
                                                                                                )}
                                                                                                Generate Description
                                                                                    </button>
                                                                        </div>
                                                            </div>

                                                            {/* Product Brand */}
                                                            <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                    Product Brand
                                                                        </label>
                                                                        <input
                                                                                    type="text"
                                                                                    name="productBrand"
                                                                                    value={formData.productBrand}
                                                                                    onChange={handleInputChange}
                                                                                    placeholder="Enter brand name"
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                        />
                                                            </div>

                                                            {/* Product Price */}
                                                            <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                    Product Price
                                                                        </label>
                                                                        <div className="flex gap-2">
                                                                                    <div className="flex-1 relative">
                                                                                                <span className="absolute left-3 top-2 text-gray-500">$</span>
                                                                                                <input
                                                                                                            type="number"
                                                                                                            name="productPrice"
                                                                                                            value={formData.productPrice}
                                                                                                            onChange={handleInputChange}
                                                                                                            placeholder="0.00"
                                                                                                            step="0.01"
                                                                                                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                                                />
                                                                                    </div>
                                                                                    <button
                                                                                                onClick={() => handleAISuggest('price')}
                                                                                                disabled={loading.price}
                                                                                                className="px-4 py-2 bg-button-light hover:bg-button-hover disabled:bg-purple-300 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                                                                    >
                                                                                                {loading.price ? (
                                                                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                                                                ) : (
                                                                                                            '💸'
                                                                                                )}
                                                                                                Suggest Price
                                                                                    </button>
                                                                        </div>
                                                            </div>

                                                            {/* Product Image */}
                                                            <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                    Product Image
                                                                        </label>
                                                                        <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    onChange={handleFileChange}
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                                        />
                                                                        {formData.productImage && (
                                                                                    <p className="mt-2 text-sm text-gray-600">
                                                                                                Selected: {formData.productImage.name}
                                                                                    </p>
                                                                        )}
                                                            </div>
                                                            <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                                    Product URL
                                                                        </label>
                                                                        <input
                                                                                    type="text"
                                                                                    value={formData.productUrl}
                                                                                    name="productImage"
                                                                                    onChange={(e) => setFormData(prev => ({ ...prev, productUrl: e.target.value }))}
                                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                                                        />

                                                            </div>

                                                            {/* Submit Button */}
                                                            <button
                                                                        onClick={handleSubmit}
                                                                        type="submit"
                                                                        className="w-full py-3 bg-button hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                            >
                                                                        Add Product
                                                            </button>
                                                </div>
                                    </div>
                        </div>
            );
};

export default ProductUploadForm;