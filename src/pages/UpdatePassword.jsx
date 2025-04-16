import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "This is required" })
      .min(5)
      .max(10),
    newPassword: z
      .string()
      .min(1, { message: "This is required" })
      .min(5)
      .max(10),
    confirmNewPassword: z
      .string()
      .min(1, { message: "Must match with Password Field" })
      .min(5)
      .max(10),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match",
  });

export function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  async function onSubmit(values) {
    try {
      setIsLoading(true);
      await api
        .patch(`${import.meta.env.VITE_BACKEND_URL}/updatePassword`, values)
        .then((data) => {
          toast.success(data?.data?.msg);
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
            Update Password
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-blue-500  ">
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      {...field}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm  focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-blue-500">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
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
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-bold text-blue-500">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter Your Password"
                      {...field}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
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
