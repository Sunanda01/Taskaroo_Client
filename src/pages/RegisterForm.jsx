import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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
import toast from "react-hot-toast";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must have 2 characters" }).max(50),

    email: z
      .string()
      .min(1, { message: "This is required" })
      .email({ message: "Must be a valid email" }),

    password: z.string().min(1, { message: "This is required" }).min(5).max(10),
    confirmPassword: z
      .string()
      .min(1, { message: "Must match with Password Field" })
      .min(5)
      .max(10),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
  const [img, setImg] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    if (!img) {
      alert("Please select a file before uploading.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "UploadProfileImg");

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const finalData = {
        name: values.name,
        email: values.email,
        password: values.password,
        profileImg: data.secure_url,
      };
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        finalData
      );
      const email = finalData.email;
      console.log(response?.data);
      // localStorage.setItem("userData", JSON.stringify(response?.data?.user));
      await api
        .post(`${import.meta.env.VITE_BACKEND_URL}/generateotp`, { email })
        .then((data) => {
          toast.success(data?.data?.msg);
          navigate("/verify-otp", { state: { email } });
        });
    } catch (err) {
      const message = err?.response?.data?.message || err?.response?.data?.msg;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 "
      style={{
        backgroundImage: "url('/3398381.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md p-6 shadow-md rounded-md bg-opacity-25 bg-black">
        <div className="flex justify-center gap-3 ">
          <img src="/Taskaroo.png" alt="Logo" className="h-10 w-10 mt-2" />
          <h1 className="text-2xl font-bold mt-2 text-center text-white">
            SignUp
          </h1>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center">
            <ClipLoader color="#3B82F6" size={40} />
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-blue-400">
                    Name
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

            <FormItem>
              <FormLabel className="block text-sm font-medium text-blue-400">
                Upload Your Profile Picture
              </FormLabel>
              <FormControl className="text-white font-bold text-sm ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImg(file);
                    console.log("SetIMG in state variable");
                  }}
                />
              </FormControl>
              {/* <FormControl>
                <button
                  className={`${img?" ":"cursor-not-allowed "} rounded-md shadow-sm focus:ring-2  focus:ring-offset-2 focus:ring-blue-500 bg-green-700  text-md font-bold w-20 h-8 hover:bg-green-800 focus:border-white text-white`}
                  onClick={upload}
                  disabled={!img}
                  
    
                >
                  Upload
                </button>
              </FormControl> */}
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-blue-400 ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Email"
                      {...field}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 "
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className=" text-red-500 text-xs font-bold ">
                    Note: Email once registered cannot be updated
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-blue-400 ">
                    Password
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-blue-400 ">
                    Confirm Password
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

            <div className="flex justify-center flex-col items-center">
              <Button
                disabled={isLoading}
                className=" focus:outline-none py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="submit"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
              <div className="text-white text-md font-bold flex justify-center items-center gap-2 mt-4">
                <Link to="/login" className="flex items-center">
                  <span>Already an existing User?</span>
                  <div
                    className="h-4 w-4 ml-2"
                    style={{
                      backgroundImage: "url('/user.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}