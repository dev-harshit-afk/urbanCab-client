import { CaptainDataContext } from "@/_context/CaptainContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  CreditCard,
  LocateIcon,
  LocationEdit,
  MoveRightIcon,
  RulerDimensionLineIcon,
  Timer,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const OngoingRideDetails = ({ rideDetails, distance, time, token, router }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const handleFinishRide = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Finishing ride...");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/endRide/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Ride finished successfully", { id: toastId });
      router.push("/captain/ride/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
      console.log("Error fetching ride details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="  sm:w-2xl sm:p-5 border-2 h-fit  sm:rounded-lg">
      <div>
        <div className={`p-2 flex gap-2 flex-col  rounded-lg`}>
          <h2
            className=" max-sm:hidden font-bold text-xl border-b-2 p-2 text-center
        "
          >
            Ride Details
          </h2>

          <div className="flex flex-col sm:gap-2 capitalize">
            <div className=" max-sm:hidden self-center w-full items-center border-b p-2 flex  gap-5">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                  className=" object-cover h-full w-full overflow-hidden"
                  src={"/rider.jpg"}
                  alt="car"
                  height={40}
                  width={40}
                />
              </div>
              <div className=" flex flex-col gap-2">
                <div>
                  <h2 className=" font-bold">
                    {rideDetails.user.firstname +
                      " " +
                      rideDetails.user.lastname}
                  </h2>
                </div>
              </div>
            </div>
            <div className="max-sm:hidden flex gap-2 items-center text-xs border-b p-2">
              <LocationEdit />
              <h2>{rideDetails.pickup}</h2>
            </div>

            <div className="flex gap-2 items-center text-xs border-b p-2">
              <LocateIcon />
              <h2>{rideDetails.destination}</h2>
            </div>
            <div className="flex gap-2 sm:text-sm  text-xs justify-between font-bold p-2">
              <div className="flex flex-col w-full  items-center gap-1  border rounded-lg p-2">
                <div className=" flex gap-2 items-center">
                  <CreditCard />
                  <p className=" ">Fare</p>
                </div>

                <h2 className={"text-green-700"}>₹ {rideDetails.fare}</h2>
              </div>
              <div className="flex flex-col w-full   items-center   border rounded-lg p-2">
                <div className=" flex gap-1 items-center">
                  <RulerDimensionLineIcon />
                  <p className=" ">Distance</p>
                </div>

                <h2 className={" text-amber-500"}>{distance}</h2>
              </div>
              <div className="flex flex-col w-full   items-center   border rounded-lg p-2">
                <div className=" flex gap-1 items-center">
                  <Timer />
                  <p className="  ">
                    Time <span className="max-sm:hidden">Left</span>{" "}
                  </p>
                </div>

                <h2 className={" text-amber-500"}> {time}</h2>
              </div>
            </div>
            <Button
              disabled={isLoading}
              onClick={handleFinishRide}
              className={"bg-green-600"}
            >
              Finish Ride <MoveRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingRideDetails;
