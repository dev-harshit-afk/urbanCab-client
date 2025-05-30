"use client";
import ProtectedUserRoute from "@/components/ProtectedUserRoute";
import React from "react";

const RideLayout = ({ children }) => {
  return <ProtectedUserRoute>{children}</ProtectedUserRoute>;
};

export default RideLayout;
