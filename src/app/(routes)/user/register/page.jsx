"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "@/_context/UserContext";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/_layout/AuthLayout";
const UserRegister = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData } = useContext(UserDataContext);
  const router = useRouter();

  useEffect(() => {
    if (userData.token) return router.push("/user/dashboard");
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstname,
      lastname,
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/register`,
        newUser
      );
      if (response.status == 201) {
        router.push("/user/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout>
      <div className="">
        <h2 className=" text-center font-bold mb-2 border-b p-2">Register</h2>
        <form
          className=" flex flex-col gap-4 mt-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Label>What shall we call you?</Label>
          <div className="flex gap-2">
            <Input
              required={true}
              placeholder="  firstname"
              className={"p-1 outline-1 focus:outline-3  rounded-lg w-[50%] "}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <Input
              placeholder="  lastname"
              className={"p-1 outline-1 focus:outline-3 rounded-lg w-[50%] "}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <Label>Email</Label>
          <input
            required={true}
            type="email"
            placeholder="  example@email.com"
            className={"p-1 focus:outline-3  outline-1 rounded-lg   "}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password</Label>
          <Input
            required={true}
            placeholder="  *********"
            className={"p-1 focus:outline-3  outline-1 rounded-lg  "}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className={" cursor-pointer"}>Create Account</Button>
        </form>
        <h3 className=" text-end p-2">
          Already have a account?{" "}
          <Link href={"/user/login"} className="  p-1 underline">
            {" "}
            Login
          </Link>
        </h3>
        <div className="w-full mt-2 flex flex-col">
          <Link href={"/captain/login"}>
            <Button className="bg-green-600 items-end w-full ">
              Captain Login{" "}
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default UserRegister;
