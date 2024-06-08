import Link from 'next/link';

function FeaturedCategories() {

  const getCategoryUrl = (category) => {
    return `/showproducts?category=${encodeURIComponent(category)}`;
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          <div className="group relative">
            <Link href={getCategoryUrl("Electronics")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/elect_thumb.jpg"
                  alt="Electronics"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Electronics")}>
                <div className="font-medium hover:underline">Electronics</div>
              </Link>
            </h3>
          </div>
          <div className="group relative">
            <Link href={getCategoryUrl("Fashion")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/clothing_thumb.jpg"
                  alt="Fashion"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Fashion")}>
                <div className="font-medium hover:underline">Fashion</div>
              </Link>
            </h3>
          </div>
          <div className="group relative">
            <Link href={getCategoryUrl("Home & Garden")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/home_thumb.jpg"
                  alt="Home & Garden"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Home & Garden")}>
                <div className="font-medium hover:underline">Home & Garden</div>
              </Link>
            </h3>
          </div>
          <div className="group relative">
            <Link href={getCategoryUrl("Beauty")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/beauty_thumb.jpg"
                  alt="Beauty"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Beauty")}>
                <div className="font-medium hover:underline">Beauty</div>
              </Link>
            </h3>
          </div>
          <div className="group relative">
            <Link href={getCategoryUrl("Automotive")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/auto_thumb.jpg"
                  alt="Automotive"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Automotive")}>
                <div className="font-medium hover:underline">Automotive</div>
              </Link>
            </h3>
          </div>
          <div className="group relative">
            <Link href={getCategoryUrl("Food and Groceries")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/food_thumb.jpg"
                  alt="Food & Groceries"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Food and Groceries")}>
                <div className="font-medium hover:underline">Food & Groceries</div>
              </Link>
            </h3>
          </div>
          <div className="group relative">
            <Link href={getCategoryUrl("Sports")}>
              <div className="w-full h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src="/image/sports.jpg"
                  alt="Sports"
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Sports")}>
                <div className="font-medium hover:underline">Sports</div>
              </Link>
            </h3>
          </div>
          <div className="group relative">
            <Link href={getCategoryUrl("Others")}>
              <div className="w-full h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 bg-white">
                <img
                  src="/image/agoralogo.jpg"
                  alt="Others"
                  className="object-center ml-5 pb-10 mt-5 pt-10"
                  width={250}
                  height={250}
                />
              </div>
            </Link>
            <h3 className="mt-4 text-sm text-gray-700">
              <Link href={getCategoryUrl("Others")}>
                <div className="font-medium hover:underline">Others</div>
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
