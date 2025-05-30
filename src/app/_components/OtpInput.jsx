"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function InputOTPControlled({ otp, setOtp }) {
  return (
    <div className="space-y-2 self-center p-2">
      <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
        <InputOTPGroup className={"gap-1 "}>
          <InputOTPSlot className={"border-2 border-black "} index={0} />
          <InputOTPSlot className={"border-2 border-black "} index={1} />
          <InputOTPSlot className={"border-2 border-black "} index={2} />
          <InputOTPSlot className={"border-2 border-black "} index={3} />
          <InputOTPSlot className={"border-2 border-black "} index={4} />
          <InputOTPSlot className={"border-2 border-black "} index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
