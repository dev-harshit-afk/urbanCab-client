"use client";
import { UserDataContext } from "@/_context/UserContext";
import { SkeletonCard } from "@/app/_components/_skeleton/SkeletonCard";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import LookingForDriver from "../../../_components/LookingForDriver";
import FindInMap from "../../../_components/FindInMap";
import RideDetails from "../../../_components/RideDetails";
import { getSocket } from "@/app/socket";

const DispatchRide = () => {
  //i need to get the ride details from the server
  //and then show the ride details
  const { id } = useParams();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const { userData } = useContext(UserDataContext);
  const [rideData, setRideData] = useState(null);
  const router = useRouter();
  const socket = getSocket();

  useEffect(() => {
    socket.on("ride-accepted", (data) => {
      setRideData(data.ride);
    });
    socket.on("ride-started", (data) => {
      router.push(`/user/ride/riding/${data.ride.id}`);
    });

    return () => {
      socket.off("ride-accepted", (data) => {
        setRideData(data.ride);
      });
      socket.off("ride-started", (data) => {
        router.push(`/user/ride/riding/${data.ride.id}`);
      });
    };
  }, [socket]);

  const getRideDetails = async () => {
    setIsFetchingData(true);
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/rideDetails/${id}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      setRideData(resp.data.ride);
    } catch (error) {
    } finally {
      setIsFetchingData(false);
    }
  };
  useEffect(() => {
    if (userData.token) getRideDetails();
  }, [userData]);

  useEffect(() => {
    if (!rideData) return;
    if (rideData?.status === "ongoing") {
      return router.push(`/user/ride/riding/${rideData.id}`);
    } else if (
      rideData?.status === "completed" ||
      rideData?.status === "cancelled"
    ) {
      return router.push(`/user/ride/history/${rideData.id}`);
    }
  }, [rideData]);

  return isFetchingData ? (
    <SkeletonCard />
  ) : (
    <div
      className={` flex max-sm:flex-col-reverse max-sm:justify-center items-center sm:items-start  justify-between  sm:mt-5  sm:w-[90%] mx-auto h-[88vh]`}
    >
      <div className=" w-86 sm:w-lg sm:p-5 flex justify-center  h-fit  rounded-lg">
        {rideData?.status === "pending" && (
          <LookingForDriver rideDetails={rideData} />
        )}
        {rideData?.status === "accepted" && (
          <RideDetails rideDetails={rideData} />
        )}
      </div>

      <div className="w-full h-full sm:p-2">
        <FindInMap />
      </div>
    </div>
  );
};

export default DispatchRide;
