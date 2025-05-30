import React from "react";
import HeroHeader from "./HeroHeader";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section className="bg-white lg:grid h-[90vh] place-content-center">
        <div className="mx-auto flex items-center w-screen max-w-screen-xl px-4 py-10 sm:px-6 sm:py-1s4 lg:px-8 ">
          <div className="max-w-prose text-left">
            <h1 className="text-5xl font-bold text-gray-900 ">
              Request a ride for now or later
            </h1>

            <p className="mt-4 text-pretty text-gray-700 text-lg/relaxed">
              Book a ride instantly or schedule one for later. Enjoy safe,
              reliable, and affordable transportation at your
              fingertips—wherever you are, whenever you need it.
            </p>

            <div className="mt-6 flex gap-4 ">
              <Link
                className="inline-block rounded border  bg-black px-3 py-2 font-medium text-white shadow-sm transition-colors "
                href="/user/ride/dashboard"
              >
                Get Started
              </Link>

              <a
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className=" w-full h-full bg-blue-200  max-md:hidden">
            <Image
              src={"/map-image.jpg"}
              alt="map"
              height={500}
              width={500}
              className=" h-full w-full"
            />{" "}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
