import { useState } from "react";
import { EnterEmail } from "../pages/EnterEmail"; // Import EnterEmail component
import { EnterOtp } from "../pages/EnterOtp"; // Import EnterOtp component
import useCountdown from "@/CustomHooks/useCountdown";
import api from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ForgetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Manage steps (1: Enter Email, 2: Enter OTP)
  const [data, setData] = useState({
    email: "",
    otp: "",
  });
  const { secondLeft, start } = useCountdown();
  // Handler for email submission
  const handleEmailSubmit = async (emailValue) => {
    setData((prevData) => ({
      ...prevData,
      email: emailValue, // Save the email
    }));
    const email = emailValue;
    console.log(email);
    const res = await api.post(
      `${import.meta.env.VITE_BACKEND_URL}/generateotp`,
      {
        email,
      }
    );
    toast.success(res?.data?.msg);
    setStep(2); // Move to the OTP step
    start(120);
  };

  // Handler for OTP submission
  const handleOtpSubmit = async (otpValue) => {
    setData((prevData) => ({
      ...prevData,
      otp: otpValue, // Save the OTP
    }));
    const payload = {
      email: data.email,
      enteredOTP: Number(otpValue),
    };
    console.log(payload);
    const res = await api.post(
      `${import.meta.env.VITE_BACKEND_URL}/verifyotp`,
      payload
    );
    console.log(res?.data);
    toast.success(res?.data?.msg);
    navigate("/setPassword", { state: { email: data.email } });
  };

  const handleResendotp = async () => {
    try {
      const email = data.email;
      console.log(email);
      await api.post(`${import.meta.env.VITE_BACKEND_URL}/generateotp`, {
        email,
      });
      console.log("Resending OTP");
      start(120);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.response?.data?.msg;
      toast.error(message);
    }
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
            secondLeft={secondLeft}
            onResendotp={handleResendotp}
          />
        )}
      </div>
    </div>
  );
}
