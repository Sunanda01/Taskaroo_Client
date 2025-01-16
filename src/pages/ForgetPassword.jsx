import { useState } from "react";
import { EnterEmail } from "../pages/EnterEmail"; // Import EnterEmail component
import { EnterOtp } from "../pages/EnterOtp"; // Import EnterOtp component

export function ForgotPassword() {
  const [step, setStep] = useState(1); // Manage steps (1: Enter Email, 2: Enter OTP)
  const [data, setData] = useState({
    email: "",
    otp: "",
  });

  // Handler for email submission
  const handleEmailSubmit = (emailValue) => {
    setData((prevData) => ({
      ...prevData,
      email: emailValue, // Save the email
    }));
    setStep(2); // Move to the OTP step
  };

  // Handler for OTP submission
  const handleOtpSubmit = (otpValue) => {
    setData((prevData) => ({
      ...prevData,
      otp: otpValue, // Save the OTP
    }));
    console.log("Email:", data.email); // Log email for debugging
    console.log("OTP:", otpValue); // Log OTP for debugging

    // Add further actions, e.g., API calls for verification
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/3398381.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md p-6 shadow-md rounded-md bg-black bg-opacity-25">
        {step === 1 && (
          // Render EnterEmail component
          <EnterEmail
            onSubmit={(values) => handleEmailSubmit(values.email)} // Pass handler for email submission
          />
        )}
        {step === 2 && (
          // Render EnterOtp component
          <EnterOtp
            onSubmit={(values) => handleOtpSubmit(values.otp)} // Pass handler for OTP submission
          />
        )}
      </div>
    </div>
  );
}
