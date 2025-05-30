"use client";
import React, { useContext, useEffect, useState } from "react";
import FindTrip from "../../_components/FindTrip";
import FindInMap from "../../_components/FindInMap";
import { UserDataContext } from "@/_context/UserContext";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";
import VehiclePanel from "../../_components/VehiclePanel";

const Dashboard = () => {
  const [rideDetails, setRideDetails] = useState({
    pickup: "",
    destination: "",
    vehicleType: "",
  });
  const { userData } = useContext(UserDataContext);
  const router = useRouter();
  const [showPanel, setShowPanel] = useState(false);
  const [ongoingRideData, setOngoingRideData] = useState(null);

  return (
    <div
      className={` flex ${
        showPanel ? "max-sm:flex-col-reverse" : "max-sm:flex-col"
      }   sm:gap-2  sm:mt-5 w-full  sm:w-[90%] mx-auto sm:h-[88vh] `}
    >
      <div className={`${showPanel ? "max-sm:hidden" : ""}`}>
        <FindTrip setShowPanel={setShowPanel} setRideDetails={setRideDetails} />
      </div>

      {showPanel && (
        <VehiclePanel
          rideDetails={rideDetails}
          setRideDetails={setRideDetails}
        />
      )}
      <div className={` w-full relative overflow-hidden `}>
        <FindInMap />
        <div
          className={`absolute top-1 left-1  max-sm:h-full
          ${showPanel ? "sm:hidden" : "hidden"}
           `}
          onClick={() => setShowPanel(false)}
        >
          <Undo2 />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
