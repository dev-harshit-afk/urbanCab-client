"use client";
import AuthLayout from "@/app/_layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CaptainRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(2);
  const [vehicleType, setVehicleType] = useState("auto");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newCaptain = {
      firstname,
      lastname,
      email,
      password,
      vehicleColor,
      vehiclePlate,
      vehicleCapacity,
      vehicleType,
    };
    const toastId = toast.loading("registering captain....");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/captains/register`,
        newCaptain
      );
      toast.success("registered successgully", { id: toastId });

      router.push("/captain/login");
    } catch (error) {
      toast.error("registered failed", { id: toastId });

      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className="">
        <h2 className=" text-center font-bold mb-2 border-b p-2">
          Captain Registeration
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" flex flex-col gap-4 mt-2"
        >
          <Label>What shall we call you?</Label>
          <div className="flex gap-2">
            <Input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="firstname"
              required={true}
            />
            <Input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="lastname"
            />
          </div>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required={true}
          />
          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*********"
            required={true}
          />
          <Label>Vehicle Details</Label>
          <div className="flex flex-col gap-2">
            <div className="flex flex-between gap-2">
              <Input
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                placeholder="Vehicle color"
                required={true}
              />
              <Input
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                placeholder="Vehicle Number"
                required={true}
              />
            </div>
            <div className="flex flex-between gap-2">
              <Input
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                placeholder="Vehicle Capacity "
                required={true}
                className={"flex-1"}
              />
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required={true}
                defaultValue={"Auto"}
                className="flex-1 outline p-1 ml-1  rounded-lg active:outline"
              >
                <option>car</option>
                <option>auto</option>
                <option>bike</option>
              </select>
            </div>
          </div>

          <Button disabled={isLoading} className={" cursor-pointer"}>
            Create Account
          </Button>
        </form>
        <h3 className=" text-end p-2">
          Already have a account?{" "}
          <Link href={"/captain/login"} className="  p-1 underline">
            {" "}
            Login
          </Link>
        </h3>
        <div className="w-full mt-2 flex flex-col ">
          <Link href={"/user/login"}>
            <Button className="bg-blue-500 cursor-pointer items-end w-full hover:bg-blue-600 ">
              User Login{" "}
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CaptainRegister;
