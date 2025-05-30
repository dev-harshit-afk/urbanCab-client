"use client";
import ProtectedCaptainRoute from "@/components/ProtectedCaptainRoute";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CaptainDataContext } from "@/_context/CaptainContext";
import { useParams, useRouter } from "next/navigation";
import { SkeletonCard } from "@/app/_components/_skeleton/SkeletonCard";
import toast from "react-hot-toast";
import axios from "axios";
import OngoingRideDetails from "../../../_components/OngoingRideDetails";
import RideDetails from "@/app/(routes)/user/_components/RideDetails";

const LiveMapComponent = dynamic(
  () => import("@/app/_components/LiveMapComponent"),
  {
    ssr: false,
  }
);

const Riding = () => {
  const { id } = useParams();
  console.log("Riding ID:", id);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRideDetails, setCurrentRideDetails] = useState(null);
  const { captainData } = useContext(CaptainDataContext);
  const [distanceLeft, setDistanceLeft] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();

  const fetchRideDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/rideDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${captainData.token}`,
          },
        }
      );
      console.log("Ride details response:", response.data);
      setCurrentRideDetails(response.data.ride);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log("Error fetching ride details:", error);
      router.push("/captain/ride/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentRideDetails) return;
    if (currentRideDetails?.status === "ongoing") {
      return router.push(`/captain/ride/riding/${currentRideDetails.id}`);
    } else if (
      currentRideDetails?.status === "completed" ||
      currentRideDetails?.status === "cancelled"
    ) {
      return router.push(`/captain/ride/history/${currentRideDetails.id}`);
    }
  }, [currentRideDetails]);

  useEffect(() => {
    if (captainData.token) {
      console.log("User data:", captainData);
      fetchRideDetails();
    }
  }, [captainData]);

  if (isLoading) {
    return <SkeletonCard />;
  }
  return (
    <div>
      <div className=" flex max-sm:flex-col-reverse sm:gap-2 sm:mt-5  sm:w-[90%] mx-auto h-[90vh]">
        <OngoingRideDetails
          rideDetails={currentRideDetails}
          distance={distanceLeft}
          time={timeLeft}
          token={captainData.token}
          router={router}
        />

        <LiveMapComponent
          initialOrigin={currentRideDetails?.pickupCoordinates}
          destination={currentRideDetails?.destinationCoordinates}
          setDistanceLeft={setDistanceLeft}
          setTimeLeft={setTimeLeft}
        />
      </div>
    </div>
  );
};

export default Riding;
