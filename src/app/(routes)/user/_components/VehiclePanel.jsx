import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import SelectVehiclePanel from "./SelectVehiclePanel";
import LookingForDriver from "./LookingForDriver";
import RideDetails from "./RideDetails";
import axios from "axios";
import { UserDataContext } from "@/_context/UserContext";
import { RideDetailsSkeleton } from "@/app/_components/_skeleton/RideDetailsSkeleton";

const VehiclePanel = ({ rideDetails }) => {
  const { userData } = useContext(UserDataContext);
  const [fares, setFares] = useState([{}]);
  const [fareLoading, setFareLoading] = useState(false);

  useEffect(() => {
    if (rideDetails.pickup && rideDetails.destination) {
      getFare(rideDetails.pickup, rideDetails.destination);
    }
  }, [rideDetails]);

  const getFare = async (pickup, destination) => {
    if (!pickup || !destination) return;
    setFareLoading(true);
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/getFare?pickup=${pickup}&destination=${destination}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      setFares(resp.data.fares);
    } catch (error) {
      console.log(error);
    } finally {
      setFareLoading(false);
    }
  };
  return (
    <div className=" sm:w-4xl w-full sm:p-5  h-fit  rounded-lg">
      {fareLoading ? (
        <RideDetailsSkeleton />
      ) : (
        <SelectVehiclePanel fares={fares} rideDetails={rideDetails} />
      )}
    </div>
  );
};

export default VehiclePanel;
