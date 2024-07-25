import React, { useState, useEffect } from 'react';

const EditProduct = ({ product, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product.imageUrl) {
      setUpdatedProduct((prev) => ({ ...prev, imageUrl: product.imageUrl }));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDeleteImage = () => {
    setImage(null);
    onSave({ ...updatedProduct, image: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!updatedProduct.name) newErrors.name = 'Name is required';
    if (!updatedProduct.description) newErrors.description = 'Description is required';
    if (!updatedProduct.price) newErrors.price = 'Price is required';
    if (!updatedProduct.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({ ...updatedProduct, image });
    }
  };

  return (
    <div className="bg-[#392F5A] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto p-4 shadow-md bg-[#FFF8F0] rounded-lg">
        <h2 className="text-2xl font-bold text-black mb-4">Edit Product</h2>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              className={`border px-2 py-1 rounded-sm w-full text-sm ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Description</label>
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              className={`border px-2 py-1 rounded-sm w-full text-sm ${errors.description ? 'border-red-500' : ''}`}
              rows="3"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              className={`border px-2 py-1 rounded-sm w-full text-sm ${errors.price ? 'border-red-500' : ''}`}
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm">Category</label>
            <select
              name="category"
              value={updatedProduct.category}
              onChange={handleChange}
              className={`border px-2 py-1 rounded-sm w-full text-sm ${errors.category ? 'border-red-500' : ''}`}
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
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-sm mt-4 text-sm"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
