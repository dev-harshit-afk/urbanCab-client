"use client";
import SingleTripCard from "@/app/_components/SingleTripCard";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import SpinnerLoader from "@/app/_components/loader/SpinnerLoader";
import { CaptainDataContext } from "@/_context/CaptainContext";

const PreviousRides = () => {
  const { captainData } = useContext(CaptainDataContext);
  const [previousTrips, setPreviousTrips] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // You can change this as needed
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchRideHistory = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/captainRideHistory?page=${pageNum}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${captainData.token}`,
          },
        }
      );
      setPreviousTrips(response.data.rides);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      setPreviousTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (captainData?.token) {
      fetchRideHistory(page);
    }
    // eslint-disable-next-line
  }, [page, captainData?.token]);

  return (
    <div className="w-screen h-[88vh] overflow-y-scroll   ">
      <div className="md:w-[50vw] mx-auto p-5 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Past Rides</h1>
          {loading ? (
            <SpinnerLoader />
          ) : previousTrips.length === 0 ? (
            <div>No rides found.</div>
          ) : (
            previousTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => router.push(`/captain/ride/history/${trip.id}`)}
              >
                <SingleTripCard trip={trip} />
              </div>
            ))
          )}
          <div className="flex justify-end w-full gap-2 mt-4 items-center">
            <button
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousRides;
