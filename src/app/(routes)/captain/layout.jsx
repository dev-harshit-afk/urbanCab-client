"use client";
import CaptainContext, { CaptainDataContext } from "@/_context/CaptainContext";
import { getSocket } from "@/app/socket";
import { useContext, useEffect } from "react";
import CaptainHeader from "./_components/CaptainHeader";

export default function UserLayout({ children }) {
  return (
    <CaptainContext>
      <CaptainLayoutContent>{children}</CaptainLayoutContent>
    </CaptainContext>
  );
}

function CaptainLayoutContent({ children }) {
  const { captainData } = useContext(CaptainDataContext);
  const socket = getSocket();
  useEffect(() => {
    if (captainData.captain.id) {
      socket.emit("join", {
        userId: captainData.captain.id,
        userType: "captain",
      });
    }
  }, [captainData, socket]);
  return (
    <section className="flex z-10 flex-col w-screen h-screen">
      <CaptainHeader />
      {children}
    </section>
  );
}
