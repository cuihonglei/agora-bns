import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useUserAuth } from "../../_utils/auth-context";

import categoryAutomotive from '../../assets/images/category-automotive.png';
import categoryBeauty from '../../assets/images/category-beauty.png';
import categoryElectronics from '../../assets/images/category-electronics.png';
import categoryFoodGroceries from '../../assets/images/category-food-groceries.png';
import categoryHomeGarden from '../../assets/images/category-home-garden.png';
import categorySports from '../../assets/images/category-sports.png';

function FeaturedCategories() {

  const router = useRouter();
  const { user } = useUserAuth();

  const handleClick = (category) => {
    if (!user) {
      router.push('/login');
    } else {
      router.push(`/showproducts?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#FFF8F0] text-black py-10">
      <p className="text-2xl font-bold mb-8">Featured Categories</p>
      <div className="max-w-5xl flex flex-wrap justify-center">
        <div className="flex flex-col items-center m-4 cursor-pointer" onClick={() => handleClick('automotive')}>
          <Image
            src={categoryAutomotive}
            alt="Automotive"
            width={270}
            height={270}
            className="rounded-lg"
          />
          <p>Automotive</p>
        </div>
        <div className="flex flex-col items-center m-4 cursor-pointer" onClick={() => handleClick('beauty')}>
          <Image
            src={categoryBeauty}
            alt="Beauty"
            width={270}
            height={270}
            className="rounded-lg"
          />
          <p>Beauty</p>
        </div>
        <div className="flex flex-col items-center m-4 cursor-pointer" onClick={() => handleClick('electronics')}>
          <Image
            src={categoryElectronics}
            alt="Electronics"
            width={270}
            height={270}
            className="rounded-lg"
          />
          <p>Electronics</p>
        </div>
        <div className="flex flex-col items-center m-4 cursor-pointer" onClick={() => handleClick('food-groceries')}>
          <Image
            src={categoryFoodGroceries}
            alt="Food & Groceries"
            width={270}
            height={270}
            className="rounded-lg"
          />
          <p>Food & Groceries</p>
        </div>
        <div className="flex flex-col items-center m-4 cursor-pointer" onClick={() => handleClick('home-garden')}>
          <Image
            src={categoryHomeGarden}
            alt="Home & Garden"
            width={270}
            height={270}
            className="rounded-lg"
          />
          <p>Home & Garden</p>
        </div>
        <div className="flex flex-col items-center m-4 cursor-pointer" onClick={() => handleClick('sports')}>
          <Image
            src={categorySports}
            alt="Sports"
            width={270}
            height={270}
            className="rounded-lg"
          />
          <p>Sports</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCategories;
