import React from "react";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div
      className="min-h-screen flex items-center bg-gray-100"
      style={{
        backgroundImage: "url('/error.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="font-bold text-white text-3xl flex justify-between ml-8 shadow-md shadow-red-400">
        <Link to="/home">
          <div className="flex items-center">
            {/* Arrow */}
            <div
              className="h-10 w-10 rounded-full bg-blue-100"
              style={{
                backgroundImage: "url('/left-arrow.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </Link>
        {/* Text */}
        <div className="ml-2">Click Here To Go Home Page</div>
      </div>
    </div>
  );
}
