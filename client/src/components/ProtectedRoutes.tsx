import React from "react";
import { useRouter } from "next/navigation";
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userInfoString = localStorage.getItem("user");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  React.useEffect(() => {
    if (!userInfo?.token) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
