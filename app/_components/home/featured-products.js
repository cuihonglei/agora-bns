import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useUserAuth } from "../../_utils/auth-context";
import { getProductByID } from "../../_services/product-service";


function FeaturedProducts() {

  const router = useRouter();
  const { user } = useUserAuth();
  const [products, setProducts] = useState([]);

  const handleClick = (productId) => {
    if (!user) {
      router.push('/login');
    } else {
      router.push(`/details?id=${productId}`);
    }
  };

  useEffect(() => {

    // The featured product IDs, change them as needed.
    const featuredProductIDs = [
      '59ZMh73syXcgLOq4ry4w',
      '5ZZ8pEkW1aKXZk0zS8DS',
      '6LJUlPKM0gx6ldyg47RV',
    ];

    // Load featured products.
    const loadFeaturedProducts = async () => {
      const loadedProducts = [];
      for (const id of featuredProductIDs) {
        const product = await getProductByID(id);
        if (product) {
          loadedProducts.push(product);
        }
      }
      setProducts(loadedProducts);
    };
    loadFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-white text-black py-10">
      <p className="text-2xl font-bold mb-8">Featured Products</p>
      <div className="flex items-center m-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer m-4"
            onClick={() => handleClick(product.id)}
          >
            <div className="w-[270px] h-[270px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                width={270}
                height={270}
              />
            </div>
            <p className="text-center">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;