import Image from "next/image";
import React from "react";

const FindInMap = () => {
  return (
    <div className=" rounded-sm w-full h-full">
      <Image
        src={"/uber-map.gif"}
        width={20}
        height={20}
        className=" w-full h-full border-2"
        alt="map"
        priority={true}
        loading="eager"
      />
    </div>
  );
};

export default FindInMap;
