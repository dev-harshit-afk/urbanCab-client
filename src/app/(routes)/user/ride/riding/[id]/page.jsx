"use client";
import DashboardHeader from "@/app/_components/DashboardHeader";
import React, { useContext, useEffect, useState } from "react";
import FindInMap from "../../../_components/FindInMap";
import CurrentRidePanel from "../../../_components/CurrentRidePanel";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import axios from "axios";
import { UserDataContext } from "@/_context/UserContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/app/_components/_skeleton/SkeletonCard";
import { getSocket } from "@/app/socket";

const LiveMapComponent = dynamic(
  () => import("../../../../../_components/LiveMapComponent"),
  {
    ssr: false,
  }
);

const Riding = () => {
  const { id } = useParams();
  const socket = getSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [currentRideDetails, setCurrentRideDetails] = useState(null);
  const { userData } = useContext(UserDataContext);
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
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setCurrentRideDetails(response.data.ride);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log("Error fetching ride details:", error);
      router.push("/user/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData.token) {
      console.log("User data:", userData);
      fetchRideDetails();
    }
  }, [userData]);

  useEffect(() => {
    const handleRideCompleted = (data) => {
      if (data.rideId !== Number(id)) return;
      toast.success("Ride completed successfully");
      router.push(`/user/ride/completePayment/${id}`);
    };

    socket.on("ride-completed", handleRideCompleted);

    // Cleanup to remove the handler when the component unmounts or id changes
    return () => {
      socket.off("ride-completed", handleRideCompleted);
    };
  }, [socket, id, router]);

  useEffect(() => {
    if (!currentRideDetails) return;

    if (
      currentRideDetails.status === "completed" ||
      currentRideDetails.status === "cancelled"
    ) {
      toast.error("Ride has been completed or cancelled");
      router.push(`/user/ride/history/${currentRideDetails.id}`);
    } else if (
      currentRideDetails.status === "pending" ||
      currentRideDetails.status === "accepted"
    ) {
      toast.error("Ride has not started yet");
      router.push(`/user/ride/dispatch/${currentRideDetails.id}`);
    }
  }, [currentRideDetails, router]);

  return isLoading ? (
    <SkeletonCard />
  ) : (
    <div>
      <div className=" flex max-sm:flex-col-reverse sm:gap-2 sm:mt-5  sm:w-[90%] mx-auto h-[88vh]">
        <CurrentRidePanel
          rideDetails={currentRideDetails}
          distance={distanceLeft}
          time={timeLeft}
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
