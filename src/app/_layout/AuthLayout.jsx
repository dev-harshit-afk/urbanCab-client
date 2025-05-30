import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className=" h-screen bg-white">
      {/* <div className="h-[10vh] bg-black">
        <Image
          src={"/uber-white-logo.webp"}
          alt="uber"
          height={60}
          width={60}
          className="ml-10"
        />
      </div> */}
      <div className=" h-[90vh] flex justify-center items-center">
        <div className=" h-fit  w-96 p-4 border-2 rounded-lg shadow-lg ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
