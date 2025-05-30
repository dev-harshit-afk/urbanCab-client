"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../_context/UserContext";
import { useRouter } from "next/navigation";
const ProtectedUserRoute = ({ children }) => {
  const { userData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!userData?.token) {
      console.log("userData", userData);
      return router.push("/user/login");
    } else {
      setLoading(false);
    }
  }, [userData, router]);
  //   if (!userData?.token) return null;
  if (loading) return null; // or a spinner

  return <>{children}</>;
};
export default ProtectedUserRoute;
