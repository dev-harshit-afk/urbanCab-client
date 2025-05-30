import { NotebookIcon, LocateIcon, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

export const statusColors = {
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  ongoing: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SingleTripCard = ({ trip }) => {
  const { fare, destination, pickup, status, createdAt, id, paymentId } = trip;
  const router = useRouter();

  const trimDestination =
    destination.length > 20 ? destination.slice(0, 25) + "..." : destination;

  return (
    <div
      className="transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      tabIndex={0}
      aria-label="View ride details"
    >
      <div className="flex gap-3 p-4 border-2 border-gray-200 rounded-lg bg-white hover:bg-blue-50 items-center relative">
        {/* Status badge */}
        <span
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
        {/* Car image */}
        <div className="flex items-center justify-center shadow-sm min-w-[80px]">
          <Image src={"/uber-car.png"} alt="car" width={80} height={60} />
        </div>
        {/* Ride info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="text-blue-500" size={16} />
            <span className="text-xs text-gray-600">{pickup}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <LocateIcon className="text-green-500" size={16} />
            <span className="font-bold text-base capitalize">
              {trimDestination}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <CreditCard size={14} className="text-yellow-500" />
            <span>₹{fare}</span>
            <span className="mx-2">|</span>
            <span>{formatDate(createdAt)}</span>
          </div>
          <div className="mt-2 flex gap-1 text-xs font-semibold px-2 py-1 items-center bg-gray-100 rounded-2xl w-fit hover:bg-blue-100 transition">
            <NotebookIcon size={15} /> Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTripCard;
