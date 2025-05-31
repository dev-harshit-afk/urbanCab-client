"use client";
import { Button } from "@/components/ui/button";
import {
  Car,
  CreditCard,
  Notebook,
  TimerIcon,
  User2,
  Star,
  History,
} from "lucide-react";
import React from "react";
import { getInitials } from "../../user/_components/RideDetails";
import { useRouter } from "next/navigation";

const DashboardRiderData = ({ captain }) => {
  const router = useRouter();
  // Example stats (replace with real data)
  const rating = Number(captain.averageRating) || 4.7;
  const totalRides = captain.totalRides || 128;
  const totalFare = captain.totalFares || 12450;
  const hoursOnline = captain.totalTime || 120;
  const kmDriven = captain.totalDistance || 980;
  return (
    <div className=" w-full sm:w-xl p-4 border-2 h-fit rounded-2xl bg-white shadow-md">
      <div className="flex flex-col sm:gap-4">
        {/* Profile & Stats */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex gap-4 items-center">
            <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center text-3xl font-bold text-blue-700 shadow">
              {captain.firstname ? (
                getInitials(`${captain.firstname} ${captain.lastname || ""}`)
              ) : (
                <User2 size={36} />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-bold capitalize text-lg">
                {captain?.firstname + " " + captain?.lastname}
              </h2>
              <p className="text-xs uppercase">{captain.vehiclePlate}</p>
              <p className="text-xs capitalize">
                {captain.vehicleType}-{captain?.vehicleColor}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }
                    fill={rating >= star ? "#facc15" : "none"}
                  />
                ))}
                <span className="text-xs text-gray-600 ml-1">
                  {rating?.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div>
              <h2 className="sm:text-2xl font-bold text-green-600">
                ₹{totalFare}
              </h2>
              <p className="font-medium text-xs text-gray-500">Total Earned</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => router.push("/captain/ride/history")}
            >
              <History size={16} />
              Ride History
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 shadow-sm">
            <Notebook className="text-blue-500 mb-1" />
            <h2 className="font-bold text-lg">{totalRides}</h2>
            <p className="text-xs text-gray-500">Total Rides</p>
          </div>
          <div className=" max-sm:hidden flex flex-col items-center bg-gray-50 rounded-xl p-3 shadow-sm">
            <TimerIcon className="text-purple-500 mb-1" />
            <h2 className="font-bold text-lg">{hoursOnline}</h2>
            <p className="text-xs text-gray-500">Hours Online</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-3 shadow-sm">
            <Car className="text-green-500 mb-1" />
            <h2 className="font-bold text-lg">{kmDriven}</h2>
            <p className="text-xs text-gray-500">KM Driven</p>
          </div>
          <div className=" max-sm:hidden flex flex-col items-center bg-gray-50 rounded-xl p-3 shadow-sm">
            <CreditCard className="text-pink-500 mb-1" />
            <h2 className="font-bold text-lg">
              ₹{(totalFare / totalRides).toFixed(0)}
            </h2>
            <p className="text-xs text-gray-500">Avg. Fare</p>
          </div>
        </div>

        {/* Progress Bar Example (optional) */}
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-1">Weekly Ride Goal</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min((totalRides / 50) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-right text-gray-400 mt-1">
            {Math.min(totalRides, 50)}/50 rides
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardRiderData;
