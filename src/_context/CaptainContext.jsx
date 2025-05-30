"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState({
    captain: {
      email: "",
      firstname: "",
      lastname: "",
      id: "",

      vehicleColor: "",
      vehiclePlate: "",
      vehicleCapacity: "",
      vehicleType: "",
    },
    token: "",
  });

  const fetchCaptainData = useCallback(async (token) => {
    try {
      const res = await axios.get(`http://localhost:4000/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", res);
      setCaptainData((prev) => ({ captain: res.data.captain, token: token }));
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("captainToken")?.toString();
    console.log(storedToken);
    if (!storedToken) {
      return;
    }
    fetchCaptainData(storedToken);
  }, []);

  const contextValue = useMemo(
    () => ({ captainData, setCaptainData }),
    [captainData]
  );

  return (
    <div>
      <CaptainDataContext.Provider value={contextValue}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
