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
import Image from "next/image";
import { statusColors } from "@/app/_components/SingleTripCard";
import { formatDate } from "@/app/(routes)/user/ride/history/[id]/page";
import { CaptainDataContext } from "@/_context/CaptainContext";

const PastTrip = () => {
  const { id } = useParams();
  const { captainData } = useContext(CaptainDataContext);
  const [isFetchingData, setIsFetchingData] = useState(false);
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
    } else if (rideData?.status === "accepted") {
      return router.push(`/captain/ride/dispatch/${rideData.id}`);
    }
  }, [rideData]);

  return (
    <div className=" w-screen h-full flex justify-center overflow-y-scroll ">
      <div className="mt-5 flex flex-col p-5 gap-5 w-full md:w-[50vw]">
        <h1
          onClick={() => {
            router.push("/captain/ride/history");
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
            <div className="flex w-full justify-between text-base font-medium">
              <div className="flex gap-1">
                <span className="">{formatDate(rideData?.createdAt)}</span>
                {rideData?.status !== "cancelled" && (
                  <p>
                    with{" "}
                    <span className="capitalize">
                      {" "}
                      {rideData?.user?.firstname}
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
                      <span>₹{rideData?.fare} Earned</span>
                    </div>
                  </div>
                </div>
                <div className="border-b-2 pb-2 border-gray-100">
                  <h2 className="font-bold">Route</h2>
                  <div className="pl-6 flex flex-col gap-0">
                    {/* Pickup */}
                    <div className="flex items-center gap-2">
                      <Circle fill="true" size={10} />
                      <span>{rideData?.pickup}</span>
                    </div>
                    {/* Vertical line (now a flex item, not absolute) */}
                    <div className="h-6 w-1 bg-black mx-[3px]"></div>
                    {/* Drop */}
                    <div className="flex items-center gap-2">
                      <Square fill="true" size={10} />
                      <span>{rideData?.destination}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastTrip;
