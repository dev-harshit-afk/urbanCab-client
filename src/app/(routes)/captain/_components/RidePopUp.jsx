"use client";

import React, { useState } from "react";
import NewRideAvailable from "./NewRideAvailable";

const RidePopUp = ({
  setIsNewRideAvailable,
  availableRides,
  setAvailableRides,
}) => {
  const onDecline = () => {
    if (availableRides.length === 1) setIsNewRideAvailable(false);
    setAvailableRides((prev) => prev.slice(1));
  };
  const onAccept = () => {
    setAvailableRides([]);
    setIsNewRideAvailable(false);
  };
  return (
    <div className="sm:w-md  w-full  p-2 border-2 h-fit rounded-lg">
      {availableRides.length > 0 && (
        <NewRideAvailable
          newAvailableRideDetails={availableRides[0]}
          onDecline={onDecline}
          onAccept={onAccept}
        />
      )}
    </div>
  );
};

export default RidePopUp;
