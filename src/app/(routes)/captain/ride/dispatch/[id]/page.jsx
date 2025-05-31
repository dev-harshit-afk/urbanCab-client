"use client";
import { SkeletonCard } from "@/app/_components/_skeleton/SkeletonCard";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import { CaptainDataContext } from "@/_context/CaptainContext";
import ConfirmRideWithOtp from "../../../_components/ConfirmRideWithOtp";
import FindInMap from "@/app/(routes)/user/_components/FindInMap";

const DispatchRide = () => {
  //i need to get the ride details from the server
  //and then show the ride details
  const { id } = useParams();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const { captainData } = useContext(CaptainDataContext);
  const [rideData, setRideData] = useState(null);
  const router = useRouter();

  const getRideDetails = async () => {
    setIsFetchingData(true);
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/rideDetails/${id}`,
        {
          headers: { Authorization: `Bearer ${captainData.token}` },
        }
      );

      setRideData(resp.data.ride);
    } catch (error) {
      console.log(error);
      router.push("/captain/ride/dashboard");
    } finally {
      setIsFetchingData(false);
    }
  };
  useEffect(() => {
    if (captainData.token) getRideDetails();
  }, [captainData]);

  useEffect(() => {
    if (!rideData) return;
    if (rideData?.status === "ongoing") {
      return router.push(`/captain/ride/riding/${rideData.id}`);
    } else if (
      rideData?.status === "completed" ||
      rideData?.status === "cancelled"
    ) {
      return router.push(`/captain/ride/history/${rideData.id}`);
    }
  }, [rideData]);

  return isFetchingData ? (
    <SkeletonCard />
  ) : (
    <div
      className={` flex max-sm:flex-col-reverse max-sm:justify-center items-center sm:items-start  justify-between  sm:mt-5  sm:w-[90%] mx-auto h-[88vh]`}
    >
      <div className=" w-86 sm:w-lg sm:p-5 flex justify-center  h-fit  rounded-lg">
        <ConfirmRideWithOtp newAvailableRideDetails={rideData} />
      </div>

      <div className="w-full h-full sm:p-2">
        <FindInMap />
      </div>
    </div>
  );
};

export default DispatchRide;
