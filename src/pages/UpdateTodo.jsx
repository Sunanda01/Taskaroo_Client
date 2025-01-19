import React,{useState} from 'react'
import Navbar from './Navbar'

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
export function UpdateTodo() 
{
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
   
    <div className='h-dvh flex flex-col' style={{
      backgroundImage:"url('/background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      
      <Navbar/>
      <div className=" flex items-center justify-center h-full">
                <Card className="w-[400px] bg-white bg-opacity-5 h-max flex flex-col   ">
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
                          Update
                        </Button>
                      </CardFooter>
                    </form>
                  </CardContent>
                </Card>
      
                
              </div>
    </div>
    
    </>
  )
}