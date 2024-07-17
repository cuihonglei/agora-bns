import React, { useState } from 'react';

const EditProduct = ({ product, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedProduct);
  };

  return (
    <div className="min-h-screen bg-[#392F5A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto p-10 mt-8 shadow-lg bg-[#FFF8F0] rounded-xl">
        <h2 className="text-3xl font-extrabold text-black mb-8">Edit Product</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={updatedProduct.category}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg w-full"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home-garden">Home & Garden</option>
              <option value="beauty">Beauty</option>
              <option value="automotive">Automotive</option>
              <option value="sports">Sports</option>
              <option value="food-groceries">Food and Groceries</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
