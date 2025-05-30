"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CaptainDataContext } from "@/_context/CaptainContext";
const ProtectedCaptainRoute = ({ children }) => {
  const { captainData } = useContext(CaptainDataContext);

  const router = useRouter();

  useEffect(() => {
    if (!captainData?.token) return router.push("/captain/login");
  }, [captainData, router]);
  if (!captainData?.token) return null;
  return <>{children}</>;
};
export default ProtectedCaptainRoute;
