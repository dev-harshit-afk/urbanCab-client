"use client";
import io from "socket.io-client";

import { useContext, useMemo, createContext, useRef } from "react";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  // const socket = useMemo(() => io(`${process.env.NEXT_PUBLIC_BASE_URL}`), []);

  const socketRef = useRef();

  if (!socketRef.current) {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  }
  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
