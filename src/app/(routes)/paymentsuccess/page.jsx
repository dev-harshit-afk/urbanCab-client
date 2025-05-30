"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";

function PaymentSuccessContent() {
  const search = useSearchParams();
  const referId = search.get("reference");
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/user/ride/dashboard"), 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-md shadow-2xl bg-green-200 p-5">
        <h2 className="text-center text-xl font-bold">Payment success</h2>
        <p className="text-center p-5">
          Payment reference id{" "}
          <span className="bg-yellow-100 p-1">{referId}</span>
        </p>
        <p className="p-3 text-xs">
          you will be redirect to dashboard in sometime...
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
