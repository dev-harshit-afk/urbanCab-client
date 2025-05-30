"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    user: { email: "", firstname: "", lastname: "" },
    token: "",
  });

  const fetchUserData = useCallback(async (token) => {
    try {
      const res = await axios.get(`http://localhost:4000/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData((prev) => ({ user: res.data.user, token: token }));
    } catch (error) {}
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken")?.toString();
    console.log(storedToken);
    if (!storedToken) {
      return;
    }
    fetchUserData(storedToken);
  }, []);
  const contextValue = useMemo(() => ({ userData, setUserData }), [userData]);
  return (
    <div>
      <UserDataContext.Provider value={contextValue}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
