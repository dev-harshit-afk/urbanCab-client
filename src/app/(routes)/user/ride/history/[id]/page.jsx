"use client";
import { UserDataContext } from "@/_context/UserContext";
import SpinnerLoader from "@/app/_components/loader/SpinnerLoader";
import axios from "axios";
import {
  Circle,
  MoveLeft,
  Ruler,
  Square,
  Star,
  Tag,
  Timer,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import FindInMap from "../../../_components/FindInMap";
import Image from "next/image";
import { statusColors } from "@/app/_components/SingleTripCard";
import { SkeletonCard } from "@/app/_components/_skeleton/SkeletonCard";
import SingleDetailSkeleton from "@/app/_components/_skeleton/SingleDetailSkeleton";
import { RateRideSection } from "../../completePayment/[id]/page";

const PastTrip = () => {
  const { id } = useParams();
  const { userData } = useContext(UserDataContext);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [rideData, setRideData] = useState(null);
  const router = useRouter();
  const getRideDetails = async () => {
    setIsFetchingData(true);
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/rideDetails/${id}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      console.log(resp);
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
      rideData?.status === "accepted" ||
      rideData?.status === "pending"
    ) {
      return router.push(`/user/ride/dispatch/${rideData.id}`);
    } else if (rideData?.status == "completed" && !rideData.paymentId) {
      router.push(`/user/ride/completePayment/${id}`);
    }
  }, [rideData]);

  return rideData ? (
    <div className=" w-screen h-full flex justify-center overflow-y-scroll ">
      <div className="mt-5 flex flex-col p-5 gap-5 w-full md:w-[50vw]">
        <h1
          onClick={() => {
            router.push("/user/ride/history");
          }}
          className="text-base hover:bg-gray-100  rounded-lg p-2 cursor-pointer w-fit font-semibold text-center flex gap-2 items-center"
        >
          <MoveLeft /> Back to trips
        </h1>
        <h2 className=" font-bold text-2xl">Your Trip</h2>
        {isFetchingData ? (
          <SpinnerLoader />
        ) : (
          <div className="flex flex-col gap-5 pb-10">
            <div className="flex w-full justify-between text-xs sm:text-base font-medium">
              <div className="flex gap-1">
                <span className="">{formatDate(rideData?.createdAt)}</span>
                {rideData?.status !== "cancelled" && (
                  <p>
                    with{" "}
                    <span className="capitalize">
                      {" "}
                      {rideData?.captain?.firstname}
                    </span>
                  </p>
                )}
              </div>

              <span
                className={` px-2 py-0.5 rounded-full text-xs font-semibold ${
                  statusColors[rideData?.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {rideData?.status}
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              {" "}
              <Image
                src={"/uber-map.gif"}
                width={20}
                height={20}
                className=" w-[80%] h-50 border-2"
                alt="map"
              />
            </div>
            {rideData?.status !== "cancelled" && (
              <div className=" flex flex-col gap-3">
                <RateRideSection
                  rate={rideData.rating}
                  id={id}
                  token={userData.token}
                />
                <div className="border-b-2 pb-2 border-gray-100 ">
                  <h2 className=" font-bold">Trip Details</h2>
                  <div className="flex pl-6 sm:mt-5 font-medium flex-col gap-3">
                    <div className="flex gap-2  items-center">
                      <Ruler />
                      <span>{rideData?.distance} Km</span>
                    </div>
                    <div className="flex gap-2  items-center">
                      <Timer />
                      <span>{rideData?.time} Min</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Tag />
                      <span>₹{rideData?.fare}</span>
                    </div>
                  </div>
                </div>
                <div className="border-b-2 pb-2 border-gray-100">
                  <h2 className="font-bold">Route</h2>
                  <div className="pl-6 flex flex-col gap-0">
                    {/* Pickup */}
                    <div className="flex items-center gap-2">
                      <Circle fill="true" size={10} />
                      <span>{rideData?.pickup.slice(0, 60)}...</span>
                    </div>
                    {/* Vertical line (now a flex item, not absolute) */}
                    <div className="h-6 w-1 bg-black mx-[3px]"></div>
                    {/* Drop */}
                    <div className="flex items-center gap-2">
                      <Square fill="true" size={10} />
                      <span>{rideData?.destination.slice(0, 60)}...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <SkeletonCard />
  );
};

export default PastTrip;

export const formatDate = (isoString) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // Example: "Tuesday, May 6, 2025, 2:42 PM"
  const formatted = date.toLocaleString("en-US", options);
  // Rearrange to: "2:42 PM, Tuesday May 6 2025"
  const [weekday, month, day, year, time] = formatted
    .replace(",", "")
    .replace(",", "")
    .split(" ");
  // time is at the end, so we need to move it to the front
  return `${date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}, ${date
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .replace(/,/g, "")}`;
};
