import { useUserAuth } from "app/_utils/auth-context";

function Intro() {

  const { user } = useUserAuth();

  return (
    <div className="h-[420px] flex flex-col items-center justify-center bg-[#392F5A] text-white">
      <p className="text-5xl font-bold">Discover Amazing Products</p>
      {!user ? 
        <p className="text-lg">Sign In Required to view products in the Agora BNS Marketplace.</p> :
        <p>Explore the best products from various categories all in one place.</p>
      }
    </div>
  )
}

export default Intro;