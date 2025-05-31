"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { CaptainDataContext } from "@/_context/CaptainContext";
import { usePreviousRoute } from "@/app/_hooks/usePreviousRoute";
import AuthLayout from "@/app/_layout/AuthLayout";

const CaptainLogin = () => {
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { previousPath } = usePreviousRoute();

  useEffect(() => {
    if (captainData.token) {
      if (
        previousPath?.includes("user") ||
        previousPath?.includes("login") ||
        previousPath?.includes("register")
      ) {
        return router.push("/captain/ride/dashboard");
      }
      return previousPath
        ? router.back()
        : router.push("/captain/ride/dashboard");
    }
  }, [captainData]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const captainLogin = {
      email,
      password,
    };
    const toastId = toast.loading("Capatian login...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/captains/login`,
        captainLogin
      );

      toast.success("Logged in successfully...", { id: toastId });
      setCaptainData({
        captain: response.data.captain,
        token: response.data.token,
      });
      localStorage.setItem("captainToken", response.data.token);
      router.push("/captain/ride/dashboard");
    } catch (error) {
      toast.error("Logged in failed...", { id: toastId });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div>
        <h2 className="p-2 text-center font-bold border-b-2">
          Welcome Captain
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-4 p-2"
        >
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Example@email.com"
          />
          <Label>Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*********"
          />
          <Button disabled={isLoading} className="cursor-pointer">
            Log in
          </Button>
        </form>
        <h3 className=" text-end p-2">
          Don't have a account?{" "}
          <Link href={"/captain/register"} className="  p-1 underline">
            Register
          </Link>
        </h3>
        <div className="w-full mt-2 flex flex-col">
          <Link href={"/user/login"}>
            <Button className="bg-blue-600 items-end w-full hover:bg-blue-700  cursor-pointer">
              User Login
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default CaptainLogin;
