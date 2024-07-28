import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context"


// This component is used to avoid not logged user to access the page.
function Loading() {

  const router = useRouter();
  const { user } = useUserAuth();
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    if (!user) {
      const timeoutId = setTimeout(() => {
        // Redirect to the home page.
        if (!userRef.current) {
          router.push('/');
        }
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [user, router]);

  return (
    <p className="text-center mt-10">loading...</p>
  )
}

export default Loading;
