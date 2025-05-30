import { CaptainDataContext } from "@/_context/CaptainContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CreditCard, LocateIcon, LocationEdit, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const NewRideAvailable = ({ newAvailableRideDetails, onDecline, onAccept }) => {
  const { captainData } = useContext(CaptainDataContext);
  const router = useRouter();
  const handleAcceptRide = async () => {
    // Logic to accept the ride
    // now call bakedn api to accept the ride.
    const toastId = toast.loading("Accepting ride...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/acceptRide`,
        {
          rideId: newAvailableRideDetails.id,
          captainId: captainData.captain.id,
        },
        {
          headers: {
            Authorization: `Bearer ${captainData.token}`,
          },
        }
      );
      onAccept();
      toast.success("Ride accepted successfully", { id: toastId });
      router.push(`/captain/ride/dispatch/${response.data.ride.id}`);
    } catch (error) {
      toast.error("Error accepting ride", { id: toastId });
      console.log("Error accepting ride:", error);
    }
  };

  return (
    <div>
      <div className={`flex sm:gap-2 flex-col  rounded-lg`}>
        <h2
          className=" font-bold text-lg border-b-2 text-center
        "
        >
          New Ride Available!
        </h2>

        <div className="flex flex-col gap-1 sm:gap-2">
          <div className=" self-center bg-yellow-300  rounded-lg w-full items-center border-b p-1 sm:p-2 flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  className=" object-cover h-full w-full overflow-hidden"
                  src={"/rider.jpg"}
                  alt="car"
                  height={40}
                  width={40}
                />
              </div>
              <div className=" flex flex-col gap-1">
                <div>
                  <h2 className=" font-bold text-sm">
                    {newAvailableRideDetails.user.firstname}{" "}
                    {newAvailableRideDetails.user.lastname}
                  </h2>
                  <p className="text-xs max-sm:hidden">
                    {newAvailableRideDetails.user.email}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="flex gap-1 font-bold text-sm items-center">
                4.4 <Star size={15} />
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-xs p-1 border-b">
            <LocationEdit />
            <h2 className="">{newAvailableRideDetails.pickup}</h2>
          </div>

          <div className="flex gap-2 text-xs p-1 border-b">
            <LocateIcon />
            <h2>{newAvailableRideDetails.destination}</h2>
          </div>
          <div className="flex gap-2 text-xs border-b p-1">
            <CreditCard />

            <h2>₹ {newAvailableRideDetails.fare}</h2>
          </div>
          <Button onClick={() => handleAcceptRide()} className={"bg-green-600"}>
            Accept
          </Button>
          <Button onClick={() => onDecline()} className={"bg-red-600"}>
            Ignore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewRideAvailable;
