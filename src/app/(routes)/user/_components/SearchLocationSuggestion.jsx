"use client";

import * as React from "react";
import { Check, ChevronsUpDown, LocationEdit, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const locations = [
  {
    location: "street 24, New panvel, navimumbai maharashtra",
    label: "Next.js",
  },
  {
    location: "street 24, New panvel, navimumbai maharashtra",
    label: "Next.js",
  },
  {
    location: "street 24, New panvel, navimumbai maharashtra",
    label: "Next.js",
  },
  {
    location: "street 24, New panvel, navimumbai maharashtra",
    label: "Next.js",
  },
  {
    location: "street 24, New panvel, navimumbai maharashtra",
    label: "Next.js",
  },
];

export function SearchLocationSuggestion({
  mt = "mt-12",
  locationSuggestions = [],
  setLocation,
  setLocationSuggestions,
}) {
  const handleClick = (location) => {
    setLocation(location.description);
    setLocationSuggestions(false);
  };

  return (
    <div
      className={` max-h-[50vh] z-10 rounded-lg border p-2 bg-white absolute ${mt}  w-86 max-sm:w-72 `}
    >
      <div className=" p-2 flex flex-col gap-2 ">
        {locationSuggestions.map((location, ind) => {
          return (
            <div
              key={ind}
              onClick={(e) => {
                handleClick(location);
              }}
              className=" cursor-pointer rounded-lg p-1 hover:bg-gray-100 "
            >
              <div className=" flex gap-2 items-center">
                <div>
                  <LocationEdit size={15} />
                </div>
                <p className="flex gap-2 text-xs  ">{location.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
