import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "react-hot-toast";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This is required" })
    .email({ message: "Must be a valid email" }),
  password: z.string().min(1, { message: "This is required" }).min(5).max(10),
});

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values) {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        values
      );
      const user = res?.data?.user;
      console.log(res.data.msg);
      if (user?.verified) {
        toast.success(`Welcome ${user?.name}`);
        console.log(res.data);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("accessToken", res?.data?.accessToken);
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const email = values.email;
        console.log(email);
        const res = await api.post(
          `${import.meta.env.VITE_BACKEND_URL}/generateotp`,
          { email }
        );
        toast.success(res?.data?.msg);
        navigate("/verify-otp", { state: { email } });
      } else {
        console.log(error, "Error during submission");
        const message = error?.response?.data?.msg || error?.response?.data?.message;
        toast.error(message);
      }
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
            LogIn
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      className="block w-full rounded-md shadow-sm focus:border-blue-500 "
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center flex-col items-center">
              <Link
                to="/forgetPassword"
                className=" text-white text-md font-bold flex "
              >
                Forgot Password ?
              </Link>
              <Button
                className="flex mt-4 w-36 focus:outline-none py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="submit"
              >
                Submit
              </Button>
              <div className="text-white text-md font-bold flex justify-center items-center gap-2 mt-4">
                <Link to="/register" className="flex items-center">
                  <span>Create New User Account</span>
                  <div
                    className="h-4 w-4 ml-2"
                    style={{
                      backgroundImage: "url('/add.png')",
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
