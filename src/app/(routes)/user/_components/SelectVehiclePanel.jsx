import { UserDataContext } from "@/_context/UserContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { User2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const SelectVehiclePanel = ({ rideDetails, fares }) => {
  const { userData } = useContext(UserDataContext);
  const [vehicleType, setVehicleType] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createRide = async () => {
    if (!rideDetails.pickup || !rideDetails.destination) {
      toast.error("Please select a location");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/create`,
        {
          pickup: rideDetails.pickup,
          destination: rideDetails.destination,
          vehicleType: vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(resp);

      if (resp.data.redirect) {
        return router.push(resp.data.redirect);
      }
      console.log(resp);
      toast.success("Ride created successfully");
      // router.push(`/user/ride/dispatch/${resp.data.ride.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Error in ride creating");
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick = (vehicleType) => {
    //create a ride request
    createRide();
  };
  return (
    <div>
      <div className={`p-2 flex gap-2 flex-col  rounded-lg`}>
        <h2 className=" font-bold text-xl border-b-2">Choose a Ride</h2>

        <DisplayVehicleOptions
          label="UberGo"
          capacity={4}
          waiting="2 mins"
          tag="Affordable, car rides"
          price={fares["car"]}
          type="car"
          imgsrc="/uber-car.png"
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
        />

        <DisplayVehicleOptions
          label="Auto"
          capacity={3}
          waiting="5 mins"
          tag="Affordable, auto rides"
          price={fares["auto"]}
          imgsrc="/uber-auto.jpeg"
          type="auto"
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
        />
        <DisplayVehicleOptions
          label="Bike"
          capacity={1}
          waiting="10 mins"
          tag="Affordable, bike rides"
          price={fares["moto"]}
          imgsrc="/uber-bike.webp"
          type="bike"
          setVehicleType={setVehicleType}
          vehicleType={vehicleType}
        />
        <div>
          <Button
            disabled={isLoading}
            onClick={() => handleClick()}
            className={"w-full cursor-pointer"}
          >
            Request for <p className=" capitalize">{vehicleType}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectVehiclePanel;

export const DisplayVehicleOptions = ({
  imgsrc = "",
  label = "car",
  capacity = 4,
  waiting = "2 mins",
  tag = "Afforable",
  type = "auto",
  vehicleType = "auto",
  price = 10,
  setVehicleType,
}) => {
  return (
    <div
      onClick={() => setVehicleType(type)}
      className={`${
        vehicleType == type ? "  outline-3 outline-green-500  " : "outline-1"
      } p-2 flex  justify-between cursor-pointer    rounded-lg`}
    >
      <div>
        <Image
          className="object-cover"
          src={imgsrc}
          alt="car"
          height={80}
          width={80}
        />
      </div>
      <div className=" text-xs text-gray-700">
        <h2 className=" flex gap-2 text-sm font-semibold">
          {label} <User2Icon size={15} /> {capacity}
        </h2>
        <p>{waiting} away</p>
        <p>{tag}</p>
      </div>
      <div>
        <p>₹{price}</p>
      </div>
    </div>
  );
};
