"use client";
import { CaptainDataContext } from "@/_context/CaptainContext";
import ProtectedCaptainRoute from "@/components/ProtectedCaptainRoute";
import React, { useContext, useEffect, useState } from "react";
import DashboardRiderData from "../../_components/DashboardRiderData";
import { getSocket } from "@/app/socket";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
const FindInMap = dynamic(() => import("../../../user/_components/FindInMap"), {
  ssr: false,
});
const RidePopUp = dynamic(() => import("../../_components/RidePopUp"), {
  ssr: false,
});
const CaptainDashboard = () => {
  const { captainData } = useContext(CaptainDataContext);
  const [availableRides, setAvailableRides] = useState([]);
  const [isNewRideAvailable, setIsNewRideAvailable] = useState(false);
  const [ongoingRideData, setOngoingRideData] = useState(null);
  const router = useRouter();

  const socket = getSocket();
  useEffect(() => {
    if (captainData.captain.id) {
      socket.emit("join", {
        userId: captainData.captain.id,
        userType: "captain",
      });
    }
    updateLocation();
  }, [captainData]);
  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("update-location-captain", {
          userId: captainData.captain.id,
          lat: latitude,
          lng: longitude,
        });

        getPendingRidesNearMe(latitude, longitude);
      });
    }
  };
  useEffect(() => {
    const locationInterval = setInterval(() => {
      updateLocation();
    }, 10000);
    return () => clearInterval(locationInterval);
  });
  const getOnGoingRide = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/captain-ongoingRide`,
        {
          headers: {
            Authorization: `Bearer ${captainData.token}`,
          },
        }
      );

      setOngoingRideData(response.data.ride);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ongoingRideData?.status === "accepted") {
      router.push(`/captain/ride/dispatch/${ongoingRideData.id}`);
    } else if (ongoingRideData?.status === "ongoing") {
      router.push(`/captain/ride/riding/${ongoingRideData.id}`);
    }
  }, [ongoingRideData, router]);
  useEffect(() => {
    if (captainData.token) {
      getOnGoingRide();
    }
  }, [captainData]);

  useEffect(() => {
    // Handler function
    const handleNewRide = (data) => {
      if (!data.ride) return;
      setAvailableRides((prev) => [...prev, data.ride]);
      // setNewAvailableRideDetails(data.ride);
      setIsNewRideAvailable(true);
    };

    socket.on("new-ride", handleNewRide);

    // Cleanup on unmount
    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  const getPendingRidesNearMe = async (lat, lng) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/getAvailablePendingRides?lat=${lat}&lng=${lng}`,
        {
          headers: {
            Authorization: `Bearer ${captainData.token}`,
          },
        }
      );
      if (response.data.rides.length === 0) return;
      setAvailableRides(() => [...response.data.rides]);
      setIsNewRideAvailable(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" flex max-sm:flex-col-reverse sm:gap-2 mt-1 sm:mt-5 max-sm:w-full  w-[90%] mx-auto h-[88vh]">
        {isNewRideAvailable ? (
          <RidePopUp
            availableRides={availableRides}
            setAvailableRides={setAvailableRides}
            setIsNewRideAvailable={setIsNewRideAvailable}
          />
        ) : (
          <DashboardRiderData captain={captainData?.captain} />
        )}
        <FindInMap />
      </div>
    </div>
  );
};

export default CaptainDashboard;
