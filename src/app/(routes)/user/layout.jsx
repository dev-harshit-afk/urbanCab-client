"use client";
import UserContext, { UserDataContext } from "@/_context/UserContext";
import DashboardHeader from "@/app/_components/DashboardHeader";
import { getSocket } from "@/app/socket";
import { useContext, useEffect } from "react";

export default function UserLayout({ children }) {
  return (
    <UserContext>
      <UserLayoutContent>{children}</UserLayoutContent>
    </UserContext>
  );
}

function UserLayoutContent({ children }) {
  const { userData } = useContext(UserDataContext);
  const socket = getSocket();

  useEffect(() => {
    if (userData.user.id) {
      socket.emit("join", {
        userId: userData.user.id,
        userType: "user",
      });
    }
  }, [userData, socket]);

  return (
    <section className="flex z-10 flex-col w-screen h-screen">
      <DashboardHeader />
      {children}
    </section>
  );
}
