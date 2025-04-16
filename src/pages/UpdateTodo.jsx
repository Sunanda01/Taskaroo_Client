import React, { useState } from "react";
import Navbar from "./Navbar";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import api from "@/api";
import toast from "react-hot-toast";
export function UpdateTodo() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { todo } = location.state || {};
  const [formData, setformData] = useState({
    title: todo?.title || "",
    description: todo?.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api
        .patch(
          `${import.meta.env.VITE_BACKEND_URL}/updateTodo/${todo._id}`,
          formData
        )
        .then((data) => {
          console.log(data);
          toast.success(data?.data.msg);
          navigate("/home");
        });
      console.log("Form Submitted: ", formData);
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.msg;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <div className=" flex  justify-center h-full  mt-5">
          <Card className="w-[400px] bg-white bg-opacity-10 h-max flex flex-col   ">
            <CardHeader>
              <CardTitle className="text-white text-3xl font-bold">
                Update Todo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title" className="text-md text-white">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description" className="text-md text-white">
                      Description
                    </Label>
                    <Textarea
                      className="text-justify"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <CardFooter className="flex justify-center mt-3 ">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="flex w-28 focus:outline-none mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? (
                      <ClipLoader color="#ffffff" size={30} />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
