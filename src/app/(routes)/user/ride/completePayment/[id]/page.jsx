"use client";
import { UserDataContext } from "@/_context/UserContext";
import { SkeletonCard } from "@/app/_components/_skeleton/SkeletonCard";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  // Example ride details (replace with real data as needed)
  const { userData } = useContext(UserDataContext);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [rideData, setRideData] = useState(null);

  const getRideDetails = async () => {
    setIsFetchingData(true);
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/rideDetails/${id}`,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      );
      console.log(resp);
      setRideData(resp.data.ride);
    } catch (error) {
    } finally {
      setIsFetchingData(false);
    }
  };
  useEffect(() => {
    if (userData.token) getRideDetails();
  }, [userData]);

  const [showPlanTrip, setShowPlanTrip] = React.useState(false);

  const handlePayment = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/getApiKey`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      const {
        data: { order },
      } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/order`,
        {
          amount: rideData.fare,
          rideId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Uber Harshit",
        description: "Proper uber clone",
        image: "https://1000logos.net/uber-logo/",
        order_id: order.id,
        callback_url: "http://localhost:4000/payment/paymentVerification",
        prefill: {
          name: "Uber Harshit",
          email: "Uber.Harshit@clone.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
    }
  };

  return rideData ? (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-200">
      <div className="bg-white p-5 rounded-2xl shadow-xl  sm:min-w-[350px] max-w-md w-[90%] mx-2">
        <div className=" mb-6">
          <h2 className="text-3xl font-bold text-blue-700 text-center">
            Ride Complete
          </h2>
          <p className=" text-center font-medium">
            Please complete the payment
          </p>
        </div>
        <div className="mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Ride ID:</span>
            <span className="text-gray-800">{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Driver:</span>
            <span className="text-gray-800 capitalize">
              {rideData?.captain.firstname}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Pickup:</span>
            <span className="text-gray-800 text-sm font-semibold">
              {rideData?.pickup.slice(0, 20)}..
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Dropoff:</span>
            <span className="text-gray-800 text-sm font-semibold">
              {rideData?.destination.slice(0, 20)}...
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Fare:</span>
            <span className="text-green-600 font-semibold">
              ₹{rideData?.fare}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Time:</span>
            <span className="text-gray-800">{rideData?.time} Mins</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Payment Status:</span>
            <span
              className={
                rideData?.paymentId
                  ? "text-green-600 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              Pending
            </span>
          </div>
        </div>
        <RateRideSection
          rate={rideData.rating}
          id={id}
          token={userData.token}
        />

        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition mb-2"
          onClick={handlePayment}
        >
          Complete Payment
        </button>
      </div>
    </div>
  ) : (
    <SkeletonCard />
  );
};

function RateRideSection({ rate = 0, id, token }) {
  const [rating, setRating] = React.useState(rate);
  const [hover, setHover] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(rate ? true : false);

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/ride/rateRide/${id}`,
        { rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(resp);
      setSubmitted(true);
    } catch (error) {
      console.log("Error submitting rating:", error);
    }
  };

  return (
    <div className="my-3 text-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">
        Rate Your Ride
      </h3>
      <div className="flex justify-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            disabled={submitted}
          >
            <svg
              className={`w-8 h-8 ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          </button>
        ))}
      </div>
      {!submitted ? (
        <button
          className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-500 transition"
          onClick={() => handleRatingSubmit()}
          disabled={rating === 0}
        >
          Submit Rating
        </button>
      ) : (
        <div className="text-green-600 font-semibold mt-2">
          Thank you for rating your ride {rating} out of 5!
        </div>
      )}
    </div>
  );
}
export { RateRideSection };

export default page;
