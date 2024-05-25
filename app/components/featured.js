import React from 'react';
import { useRouter } from 'next/navigation';



function FeaturedCategories() {
  const router = useRouter();

  /*
  Function to handle category selection.
  This function is called whenever the user selects a category from the dropdown menu
  and redirects the user to the 'showproducts' page with the selected category as a query parameter.
  */
  const handleCategorySelect = (category) => {
    const url = new URL('/showproducts', window.location.href);
    url.searchParams.set('category', category);
    router.push(url.toString());
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          <div className="group relative">
            <a href="#">
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/elect_thumb.jpg"
                  alt="Electronics"
                  className="w-full h-full object-center object-cover"
                  onClick={() => handleCategorySelect("Electronics")}
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Electronics")}
              >
                <div className="font-medium hover:underline">Electronics</div>
              </a>
            </h3>
          </div>
          <div className="group relative">
            <a href="#">
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/clothing_thumb.jpg"
                  alt="Fashion"
                  className="w-full h-full object-center object-cover"
                  onClick={() => handleCategorySelect("Fashion")}
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Fashion")}
              >
                <div className="font-medium hover:underline">Fashion</div>
              </a>
            </h3>
          </div>
          <div className="group relative">
            <a href="#"
            onClick={() => handleCategorySelect("Home & Garden")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/home_thumb.jpg"
                  alt="Home & Garden"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Home & Garden")}
              >
                <div className="font-medium hover:underline">Home & Garden</div>
              </a>
            </h3>
          </div>
          <div className="group relative">
            <a href="#"
            onClick={() => handleCategorySelect("Beauty")}
            >
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/beauty_thumb.jpg"
                  alt="Beauty"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Beauty")}>
                <div className="font-medium hover:underline">Beauty</div>
              </a>
            </h3>
          </div>
          <div className="group relative">
            <a href="#">
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/auto_thumb.jpg"
                  alt="Automotive"
                  className="w-full h-full object-center object-cover"
                  onClick={() => handleCategorySelect("Automotive")}
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Automotive")}>
                <div className="font-medium hover:underline">Automotive</div>
              </a>
            </h3>
          </div>
          <div className="group relative">
            <a href="#">
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/food_thumb.jpg"
                  alt="Food & Groceries"
                  className="w-full h-full object-center object-cover"
                  onClick={() => handleCategorySelect("Food and Groceries")}
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Food and Groceries")}>
                <div className="font-medium hover:underline">Food & Groceries</div>
              </a>
            </h3>
          </div>
          <div className="group relative">
            <a href="#">
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/sports.jpg"
                  alt="Sports"
                  className="w-full h-full object-center object-cover"
                  onClick={() => handleCategorySelect("Sports")}
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Sports")}>
                <div className="font-medium hover:underline">Sports</div>
              </a>
            </h3>
          </div>
          <div className="group relative">
            <a href="#">
              <div className="w-full h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 bg-white">
                <img
                  src="/image/agoralogo.jpg"
                  alt="Others"
                  className="object-center ml-5 pb-10 mt-5 pt-10"
                  onClick={() => handleCategorySelect("Others")}
                  width={250}
                  height={250}
                />
              </div>
            </a>
            <h3 className="mt-4 text-sm text-gray-700">
              <a href="#"
              onClick={() => handleCategorySelect("Others")}>
                <div className="font-medium hover:underline">Others</div>
              </a>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
