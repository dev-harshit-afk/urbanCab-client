"use client";
import ProtectedCaptainRoute from "@/components/ProtectedCaptainRoute";
import React from "react";

const RideLayoutCaptain = ({ children }) => {
  return <ProtectedCaptainRoute>{children}</ProtectedCaptainRoute>;
};

export default RideLayoutCaptain;
