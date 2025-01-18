



import React from "react";
import Navbar from "./Navbar";

export function LandingPage() {
  return (
    <>
      <div
        className="h-dvh overflow-y-hidden"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        
      </div>
    </>
  );
}
