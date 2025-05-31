"use client";
import { UserDataContext } from "@/_context/UserContext";
import { usePreviousRoute } from "@/app/_hooks/usePreviousRoute";
import AuthLayout from "@/app/_layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useContext(UserDataContext);
  const router = useRouter();
  const { previousPath } = usePreviousRoute();

  useEffect(() => {
    if (userData.token) {
      if (
        previousPath?.includes("captain") ||
        previousPath?.includes("login") ||
        previousPath?.includes("register")
      ) {
        return router.push("/user/ride/dashboard");
      }
      return previousPath ? router.back() : router.push("/user/ride/dashboard");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUser = {
      email,
      password,
    };
    const toastId = toast.loading("Login...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
        loginUser
      );

      toast.success("Logged in successfully...", { id: toastId });
      setUserData({
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("userToken", response.data.token);
      router.push("/user/dashboard");
    } catch (error) {
      toast.error("Logged in failed...", { id: toastId });
      console.log(error);
    }
  };
  return (
    <AuthLayout>
      <div>
        <h2 className="p-2 text-center font-bold">Login</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 p-2"
        >
          <Label>Email</Label>
          <Input
            placeholder={"example@email.com"}
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            placeholder={"********"}
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="cursor-pointer">Log in</Button>
        </form>
        <h3 className=" text-end p-2">
          Don't have a account?{" "}
          <Link href={"/user/register"} className="  p-1 underline">
            {" "}
            Register
          </Link>
        </h3>
        <div className="w-full mt-2 flex flex-col">
          <Link href={"/captain/login"}>
            <Button className="bg-green-500 items-end w-full hover:bg-green-600 cursor-pointer  ">
              Captain Login
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UserLogin;
