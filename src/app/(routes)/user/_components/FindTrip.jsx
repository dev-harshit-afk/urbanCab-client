"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocateIcon, LocationEdit } from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import { SearchLocationSuggestion } from "./SearchLocationSuggestion";
import axios from "axios";
import { UserDataContext } from "@/_context/UserContext";

const FindTrip = ({ setShowPanel, setRideDetails }) => {
  const [sourceSuggesstion, setsourceSuggesstion] = useState(false);
  const [destinationSuggesstion, setDestinationSuggesstion] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const { userData } = useContext(UserDataContext);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const debounceRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setRideDetails({
      pickup: pickup,
      destination: destination,
      vehicleType: "",
    });
    setShowPanel(true);
  };

  const getLocationSuggestion = async (value) => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/maps/get-suggestions?input=${value}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      console.log(resp);
      setLocationSuggestions(resp.data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationInput = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      getLocationSuggestion(value);
    }, 400);
  };
  return (
    <div className=" lg:w-96 md:w-64 max-sm:w-full bg-white p-2 sm:p-5 rounded-lg border-1 border-gray-300 h-fit">
      <h2 className=" text-lg sm:text-2xl font-semibold p-2">Find a Trip</h2>

      <div className=" flex flex-col gap-4">
        <div className=" flex border border-gray-300 items-center rounded-md gap-2 p-2 bg-gray-100">
          <div>
            <LocationEdit size={18} color="black" />
          </div>
          <input
            className="w-full outline-none"
            placeholder="pick up location"
            value={pickup}
            onChange={(e) => {
              setPickup(e.target.value);
              handleLocationInput(e.target.value);
            }}
            onFocus={() => {
              setsourceSuggesstion(true);
              setDestinationSuggesstion(false);
            }}
          />
        </div>
        {sourceSuggesstion && pickup && (
          <SearchLocationSuggestion
            setRideDetails={setRideDetails}
            locationSuggestions={locationSuggestions}
            setLocation={setPickup}
            setLocationSuggestions={setsourceSuggesstion}
          />
        )}
        <div className=" flex border border-gray-300  items-center rounded-md gap-2 p-2 bg-gray-100">
          <div>
            <LocateIcon size={18} color="black" />
          </div>
          <input
            value={destination}
            onChange={(e) => {
              handleLocationInput(e.target.value);
              setDestination(e.target.value);
            }}
            onFocus={() => {
              setDestinationSuggesstion(true);
              setsourceSuggesstion(false);
            }}
            className="w-full outline-none"
            placeholder="drop off location"
          />
        </div>
        {destinationSuggesstion && destination && (
          <SearchLocationSuggestion
            mt={"mt-24"}
            locationSuggestions={locationSuggestions}
            setLocation={setDestination}
            setLocationSuggestions={setDestinationSuggesstion}
          />
        )}

        <button
          onClick={(e) => {
            handleSearch(e);
          }}
          disabled={pickup === "" || destination === ""}
          className={
            "cursor-pointer rounded-lg bg-black text-white text-sm p-2"
          }
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default FindTrip;
