"use client";

import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../_context/UserContext";
import { useRouter } from "next/navigation";
const ProtectedRoute = (Component) => (props) => {
  const { userData } = useContext(UserDataContext);

  const router = useRouter();

  useEffect(() => {
    if (!userData?.token) return router.push("/user/login");
  }, [userData]);
  if (!userData?.token) return null;
  return <Component {...props} />;
};
export default ProtectedRoute;
