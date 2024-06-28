import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useUserAuth } from "../../_utils/auth-context";

import { AiOutlineLogin, AiOutlineShopping } from 'react-icons/ai';
import introImage from "../../_assets/images/intro-image.png";

function Intro() {

  const router = useRouter();
  const { user } = useUserAuth();

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleShopProducts = () => {
    router.push('/showproducts');
  };

  return (
    <div className="h-[420px] flex items-center justify-center bg-[#392F5A] text-white">
      {/* Left Section */}
      <div className="flex flex-col items-start max-w-md">
        <p className="text-5xl font-extrabold leading-tight">Discover Amazing Products</p>
        {!user ?
          <p className="text-lg font-semibold leading-6 mt-4">Sign In Required to view products in the Agora BNS Marketplace.</p> :
          <p className="text-lg font-semibold leading-6 mt-4">Explore the best products from various categories all in one place.</p>
        }
        {!user ?
          <button
            className="text-lg font-bold mt-8 px-6 py-3 rounded-lg bg-[#FF8811] hover:bg-[#FBB268] text-black flex items-center"
            onClick={handleSignIn}
          >
            <AiOutlineLogin size={24} className="mr-2" />Sign In to View Products
          </button> :
          <button
            className="text-lg font-bold mt-8 px-6 py-3 rounded-lg bg-[#FF8811] hover:bg-[#FBB268] text-black flex items-center"
            onClick={handleShopProducts}
          >
            <AiOutlineShopping size={24} className="mr-2" />Shop Products
          </button>
        }
      </div>

      {/* Right Image */}
      <Image
        className="ml-24"
        src={introImage}
        alt="Intro Image"
        width={274}
        height={259}
      />
    </div>
  );
}

export default Intro;
