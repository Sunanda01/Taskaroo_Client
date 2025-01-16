import React from "react";

export function InputOTP({ maxLength, value, onChange, children }) {
  return (
    <div>
      {children}
      {/* Add additional logic for OTP handling */}
    </div>
  );
}

export function InputOTPGroup({ children }) {
  return <div className="flex space-x-2">{children}</div>;
}

export function InputOTPSlot({ index, value, onChange }) {
  return (
    <input
      type="text"
      maxLength={1}
      className="h-12 w-14 text-xl text-center border rounded bg-gray-100 mt-2 border-green-400"
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d?$/.test(val)) {
          onChange(val, index);
        }
      }}
    />
  );
}
