"use client";
import { CaptainDataContext } from "@/_context/CaptainContext";
import { InputOTPControlled } from "@/app/_components/OtpInput";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  CreditCard,
  LocateIcon,
  LocationEdit,
  MoveRight,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const ConfirmRideWithOtp = ({ newAvailableRideDetails }) => {
  const { captainData } = useContext(CaptainDataContext);
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const startRideHandler = async () => {
    // Logic to start the ride
    const toastId = toast.loading("Starting ride...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/startRide`,
        {
          rideId: newAvailableRideDetails.id,
          otp: otp,
          captainId: captainData.captain.id,
        },
        {
          headers: {
            Authorization: `Bearer ${captainData.token}`,
          },
        }
      );
      toast.success("Ride started successfully", { id: toastId });
      router.push("/captain/ride/riding/" + response.data.ride.id);
    } catch (error) {
      toast.error("Error starting ride", { id: toastId });
      console.error("Error starting ride:", error);
    }
  };
  return (
    <div>
      <div className={`flex gap-1 sm:gap-2 flex-col  rounded-lg`}>
        <h2
          className=" font-bold text-lg border-b-2 text-center
        "
        >
          Ride Accepted!
        </h2>

        <div className="flex flex-col sm:gap-2 gap-1">
          <div className=" self-center bg-yellow-300  rounded-lg w-full items-center border-b p-1 sm:p-2 flex justify-between">
            <div className=" flex gap-3 items-center">
              <div className=" h-10 sm:h-12  w-10 sm:w-12 rounded-full overflow-hidden">
                <Image
                  className=" object-cover h-full w-full overflow-hidden"
                  src={"/rider.jpg"}
                  alt="car"
                  height={40}
                  width={40}
                />
              </div>
              <div>
                <h2 className=" font-bold">
                  {newAvailableRideDetails?.user.firstname +
                    " " +
                    newAvailableRideDetails?.user.lastname}
                </h2>
                <p className="text-xs max-sm:hidden">
                  {newAvailableRideDetails?.user.email}
                </p>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <p className=" font-bold">4.2</p>
              <StarIcon size={15} color="black" fill="true" />
            </div>
          </div>
          <div className="flex gap-2 text-xs  p-1">
            <LocationEdit />
            <h2 className="border-b w-full">
              {newAvailableRideDetails?.pickup}
            </h2>
          </div>

          <div className="flex gap-2 text-xs  p-1">
            <LocateIcon />
            <h2 className="border-b w-full">
              {" "}
              {newAvailableRideDetails?.destination}
            </h2>
          </div>
          <div className="flex gap-2 text-sm p-1">
            <CreditCard />

            <h2 className="border-b w-full">
              ₹ {newAvailableRideDetails?.fare}
            </h2>
          </div>
          <InputOTPControlled otp={otp} setOtp={setOtp} />
          <Button
            onClick={() => {
              startRideHandler();
            }}
            className={"bg-green-600 hover:bg-green-500 cursor-pointer"}
          >
            Start Ride <MoveRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRideWithOtp;
