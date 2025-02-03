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
import { Link } from "react-router-dom";
export function HomePage() {
  const [formData, setformData] = useState({
    title: "",
    description: "",
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
      console.log("Form Submitted: ", formData);
    } catch (err) {
      console.log(err, "Error during submission");
    }
  }
  return (
    <>
      <div
        className="min-h-screen flex flex-col overflow-x-auto "
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <div className=" flex w-full justify-between px-4 mt-8  ">
          <Card className="w-[400px] bg-white bg-opacity-15 h-max   ">
            <CardHeader>
              <CardTitle className="text-white text-3xl font-bold">
                Create Todo
              </CardTitle>
              <CardDescription className="font-bold text-gray-500">
                Add your work in one-click.
              </CardDescription>
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
                      placeholder="Title of your Work"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description" className="text-md text-white">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Type description here"
                    />
                  </div>
                </div>

                <CardFooter className="flex justify-center mt-3 ">
                  <Button
                    type="submit"
                    className="flex w-28 focus:outline-none mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2 w-[1000px] ">
            <Card className="w-[800px] bg-white bg-opacity-10 flex items-end justify-end">
              <div className="flex  flex-col">
                <CardHeader className=" flex flex-row  w-full justify-between ">
                  <Label
                    htmlFor="title"
                    className="text-md text-white text-3xl"
                  >
                    Artificial Intelligence
                  </Label>
                  <div className="flex gap-5 ">
                    <div>
                      <Link to="/update-todo/1">
                        <img
                          src="/edit.png"
                          alt="Logo"
                          className="h-5 w-5 cursor-pointer"
                        />
                      </Link>
                    </div>
                    <div>
                      <img
                        src="/bin.png"
                        alt="Logo"
                        className="h-5 w-5 cursor-pointer"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    htmlFor="description"
                    className="text-md text-white flex break-all  "
                  >
                    <p>
                      Artificial Intelligence (AI) refers to the simulation of
                      human intelligence processes by machines, especially
                      computer systems. It encompasses the development of
                      algorithms and technologies that allow machines to perform
                      tasks typically requiring human intelligence, such as
                      reasoning, learning, decision-making, and problem-solving.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end text-blue-500 font-bold text-md">
                  <div>Created At:</div>
                </CardFooter>
              </div>
            </Card>

            <Card className="w-[800px] bg-black bg-opacity-5  flex items-end justify-end">
              <div className="flex  flex-col">
                <CardHeader className=" flex flex-row  w-full justify-between ">
                  <Label
                    htmlFor="title"
                    className="text-md text-white text-3xl"
                  >
                    Artificial Intelligence
                  </Label>
                  <div className="flex gap-5 ">
                    <div>
                      <img
                        src="/edit.png"
                        alt="Logo"
                        className="h-5 w-5 cursor-pointer"
                      />
                    </div>
                    <div>
                      <img
                        src="/bin.png"
                        alt="Logo"
                        className="h-5 w-5 cursor-pointer"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    htmlFor="description"
                    className="text-md text-white flex break-all  "
                  >
                    <p>
                      Artificial Intelligence (AI) refers to the simulation of
                      human intelligence processes by machines, especially
                      computer systems. It encompasses the development of
                      algorithms and technologies that allow machines to perform
                      tasks typically requiring human intelligence, such as
                      reasoning, learning, decision-making, and problem-solving.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end text-blue-500 font-bold text-md">
                  <div>Created At:</div>
                </CardFooter>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
