import { getSocket } from "@/app/socket";
import { Button } from "@/components/ui/button";
import { CreditCard, LocateIcon, LocationEdit, PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
export const getInitials = (name) => {
  if (!name) return "C";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const RideDetails = ({ rideDetails }) => {
  console.log(rideDetails);
  const captain = rideDetails.captain || {};
  return (
    <div className="  md:w-md p-2 sm:p-5 sm:shadow-2xl h-fit  rounded-lg">
      <div>
        <div className={`p-2 flex gap-2 flex-col  rounded-lg`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Ride Details</h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold bg-blue-400 text-blue-900"`}
            >
              Driver on the Way
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 border-b pb-4">
              {/* Captain avatar */}
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 w-14 h-14 flex items-center justify-center text-2xl font-bold text-blue-700 shadow">
                  {captain.firstname ? (
                    getInitials(
                      `${captain.firstname} ${captain.lastname || ""}`
                    )
                  ) : (
                    <User2 size={32} />
                  )}
                </div>
                <span className="mt-1 text-xs text-gray-500">Captain</span>
              </div>
              {/* Car image */}
              <Image
                src={"/uber-car.png"}
                alt="car"
                height={80}
                width={110}
                className="rounded-lg shadow max-sm:hidden"
              />
              {/* Captain & car info */}
              <div className="flex flex-col gap-1 flex-1">
                <h2 className="font-bold text-base">
                  {captain.firstname} {captain.lastname}
                </h2>
                <p className="text-xs uppercase text-gray-600">
                  {captain.vehiclePlate || "Plate N/A"}
                </p>
                <p className="text-xs text-gray-600">
                  {captain.vehicleType || "Vehicle N/A"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 flex items-center gap-1"
                  disabled
                >
                  <PhoneCall size={16} /> Call Captain
                </Button>
              </div>
              {/* OTP */}
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg text-blue-600">OTP</span>
                <span className="font-mono sm:text-xl tracking-widest">
                  {rideDetails.otp}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between my-2">
              <div className={`flex-1 h-2 rounded-full bg-blue-200`}>
                <div
                  className={`h-2 rounded-full transition-all duration-500 bg-blue-400 w-1/3
                  `}
                ></div>
              </div>
              <span className="ml-2 text-xs text-gray-500">
                Driver on the way
              </span>
            </div>
            <div className="flex gap-2 text-xs font-semibold  border-b p-2">
              <LocationEdit className="text-blue-500" />
              <h2>{rideDetails.pickup}</h2>
            </div>

            <div className="flex gap-2 text-xs font-semibold  border-b p-2">
              <LocateIcon className="text-green-500" />
              <h2>{rideDetails.destination}</h2>
            </div>
            <div className="flex gap-2 text-xs font-semibold border-b p-2">
              <CreditCard className="text-yellow-500" />

              <h2>₹{rideDetails.fare}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
