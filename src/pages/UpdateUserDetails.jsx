import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "name must have 2 characters" }).max(50),
});

export function UpdateUserDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = location.state || " ";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${userDetails.name}`,
      email: `${userDetails.email}`,
    },
  });
  async function onSubmit(values) {
    try {
      setIsLoading(true);
      await api
        .patch(`${import.meta.env.VITE_BACKEND_URL}/updateUser`, values)
        .then((data) => {
          toast.success(data?.data?.msg);
          const updateUser = {
            ...JSON.parse(localStorage.getItem("userData")),
            name: data?.data?.name,
          };
          localStorage.removeItem("userData");
          localStorage.setItem("userData", JSON.stringify(updateUser));
          navigate("/home");
        });
      console.log(values);
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.msg;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

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
      <div className="w-full max-w-md p-6 drop-shadow-md rounded-md bg-opacity-25 bg-black">
        <div className="flex justify-center gap-3 ">
          <img src="/Taskaroo.png" alt="Logo" className="h-10 w-10" />

          <h1 className="text-3xl font-bold mb-5 text-center text-white ">
            Update Profile
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-blue-500 ">
                    Your Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Name"
                      {...field}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-blue-500 ">
                    Registered Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      disabled
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm  cursor-not-allowed "
                    />
                  </FormControl>
                  <FormDescription className="text-red-500 ml-1 text-xs font-bold">
                    Note: EMAIL cannot be Updated
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-evenly">
            <Link to="/home">
                <Button className=" focus:outline-none py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Home
                </Button>
              </Link>
              <Button
                disabled={isLoading}
                className=" focus:outline-none py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="submit"
              >
                {isLoading ? (
                  <ClipLoader color="#ffffff" size={30} />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
