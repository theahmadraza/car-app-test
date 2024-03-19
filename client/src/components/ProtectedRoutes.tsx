import React from "react";
import { useRouter } from "next/navigation";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();



  React.useEffect(() => {
    let userInfo;
    if (typeof window !== "undefined") {
      const userInfoString = localStorage.getItem("user");
       userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    }
    if (!userInfo?.token) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
