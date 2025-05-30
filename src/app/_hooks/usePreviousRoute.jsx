"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PreviousRouteContext = createContext();

export const PreviousRouteProvider = ({ children }) => {
  const pathname = usePathname();
  const [previousPath, setPreviousPath] = useState(null);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setPreviousPath(currentPath);
      setCurrentPath(pathname);
    }
  }, [pathname]);

  return (
    <PreviousRouteContext.Provider value={{ previousPath }}>
      {children}
    </PreviousRouteContext.Provider>
  );
};

export const usePreviousRoute = () => useContext(PreviousRouteContext);
