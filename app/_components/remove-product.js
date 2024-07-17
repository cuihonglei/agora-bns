import React, { useState } from 'react';

const RemoveProduct = ({ productId, onRemove }) => {
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    try {
      await onRemove(productId);
    } catch (error) {
      console.error('Error removing product:', error);
    }
    setConfirming(false);
  };

  const toggleConfirmation = () => {
    setConfirming((prevConfirming) => !prevConfirming);
  };

  return (
    <>
      <button
        onClick={toggleConfirmation}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
        disabled={confirming}
      >
        {confirming ? 'Confirming...' : 'Remove'}
      </button>

      {confirming && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <p className="text-lg font-semibold mb-4">Are you sure you want to remove this product?</p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirm}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={toggleConfirmation}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RemoveProduct;
