import { Button } from "@/components/ui/button";
import {
  CreditCard,
  LocateIcon,
  LocationEdit,
  PhoneCall,
  RulerDimensionLineIcon,
  Timer,
  User,
} from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { getInitials } from "./RideDetails";

const CurrentRidePanel = ({ rideDetails, distance, time }) => {
  const captain = rideDetails.captain || {};

  return (
    <div className="  sm:w-2xl sm:p-5 border-2 h-fit  sm:rounded-lg">
      <div>
        <div className={`p-2 flex gap-2 flex-col  rounded-lg`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Ride Details</h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold bg-green-400 text-green-900`}
            >
              Ride in Progress
            </span>
          </div>

          <div className="flex flex-col sm:gap-2 capitalize">
            <div className="flex items-center gap-4 pb-4">
              {/* Captain avatar */}
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 w-14 h-14 flex items-center justify-center text-2xl font-bold text-blue-700 shadow">
                  {captain.firstname ? (
                    getInitials(
                      `${captain.firstname} ${captain.lastname || ""}`
                    )
                  ) : (
                    <User size={32} />
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
              </div>
            </div>
            <div className="flex items-center justify-between my-2">
              <div className={`flex-1 h-2 rounded-full bg-green-200`}>
                <div
                  className={`h-2 rounded-full transition-all duration-500 bg-green-400 w-2/3
                  `}
                ></div>
              </div>
              <span className="ml-2 text-xs text-gray-500">
                Ride in Progress
              </span>
            </div>
            <div className="max-sm:hidden flex gap-2 items-center text-xs border-b p-2">
              <LocationEdit className="text-blue-500" />
              <h2>{rideDetails.pickup}</h2>
            </div>

            <div className="flex gap-2 items-center text-xs border-b p-2">
              <LocateIcon className="text-green-500" />
              <h2>{rideDetails.destination}</h2>
            </div>
            <div className="flex gap-2 sm:text-sm  text-xs justify-between font-bold p-2">
              <div className="flex flex-col w-full  items-center gap-1  border rounded-lg p-2">
                <div className=" flex gap-2 items-center">
                  <CreditCard className="text-green-500" />
                  <p className=" ">Fare</p>
                </div>

                <h2 className={"text-green-500"}>₹ {rideDetails.fare}</h2>
              </div>
              <div className="flex flex-col w-full   items-center   border rounded-lg p-2">
                <div className=" flex gap-1 items-center">
                  <RulerDimensionLineIcon className="text-yellow-500" />
                  <p className=" ">Distance</p>
                </div>

                <h2 className={" text-amber-500"}>{distance}</h2>
              </div>
              <div className="flex flex-col w-full   items-center   border rounded-lg p-2">
                <div className=" flex gap-1 items-center">
                  <Timer className="text-blue-500" />
                  <p className="  ">
                    Time <span className="max-sm:hidden">Left</span>{" "}
                  </p>
                </div>

                <h2 className={" text-blue-500"}> {time}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentRidePanel;
