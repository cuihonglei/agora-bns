// utils/sorting.js

export const sortProductsByPrice = (products, sortOrder) => {
    return products.slice().sort((a, b) => {
      const priceA = a.price || 0; // If price is undefined, treat it as 0
      const priceB = b.price || 0;
  
      if (sortOrder === 'desc') {
        return priceB - priceA; // Sort from highest to lowest
      } else {
        return priceA - priceB; // Sort from lowest to highest
      }
    });
  };
  