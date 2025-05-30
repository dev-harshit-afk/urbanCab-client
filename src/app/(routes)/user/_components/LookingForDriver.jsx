import { UserDataContext } from "@/_context/UserContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  CircleDollarSign,
  CreditCard,
  LocateIcon,
  LocationEdit,
} from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const LookingForDriver = ({ rideDetails }) => {
  const { userData } = useContext(UserDataContext);
  const router = useRouter();
  const cancelRideHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/cancelRide/${rideDetails.id}`,
        {},
        { headers: { Authorization: `Bearer ${userData.token}` } }
      );
      toast.success(response.data.message);
      router.push("/user/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
      router.refresh();
    }
  };

  return (
    <div>
      <div className="p-2  h-fit w-full  sm:shadow-2xl flex gap-2 flex-col rounded-lg">
        <h2 className="font-bold sm:text-xl border-b-2 p-2 text-center">
          Looking for a nearby driver
        </h2>

        <div className="flex flex-col gap-2">
          <div className="self-center border-b p-2 flex items-center gap-4">
            {/* Responsive container for car and loader */}
            <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52">
              {/* Responsive pulse loader behind car */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="animate-ping inline-flex rounded-full bg-blue-400 opacity-60 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48"></span>
                <span className="absolute rounded-full bg-blue-400 opacity-20 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48"></span>
              </span>
              <Image
                src={"/uber-car.png"}
                alt="car"
                fill
                className="relative z-10 object-contain"
                sizes="(max-width: 640px) 8rem, (max-width: 768px) 10rem"
              />
            </div>
          </div>
          <div className="max-sm:hidden flex gap-2 text-sm border-b p-2">
            <LocationEdit />
            <h2>{rideDetails.pickup}</h2>
          </div>

          <div className="flex gap-2 text-xs border-b p-2">
            <LocateIcon />
            <h2>{rideDetails.destination}</h2>
          </div>
          <div className="flex gap-2 text-xs border-b p-2">
            <CreditCard />
            <h2>{rideDetails.fare}</h2>
          </div>
        </div>
        <div>
          <Button onClick={cancelRideHandler} className={"w-full"}>
            Cancel Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
