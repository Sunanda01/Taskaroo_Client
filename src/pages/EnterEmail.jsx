import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
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

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This is required" })
    .email({ message: "Must be a valid email" }),
});

export function EnterEmail({ onSubmit, disabled }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmitHandler(values) {
    try {
      onSubmit(values);
      console.log(values);
    } catch (err) {
      console.log(err, "Error during submission");
    }
  }

  return (
    <div>
      <div className="flex justify-center gap-3 ">
        <img src="/Taskaroo.png" alt="Logo" className="h-10 w-10 mt-2" />

        <h1 className="text-2xl font-bold mt-2 text-center text-white">
          Forgot Password
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    {...field}
                    className="block w-full mt-5 border-gray-300 rounded-md shadow-sm focus:border-blue-500 "
                  />
                </FormControl>
                <FormDescription className="text-red-500 ml-1 text-xs font-bold">
                  Please enter your registered email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              disabled={disabled}
              className=" focus:outline-none py-2 px-4  bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
            >
              {disabled ? "Submiting...." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
EnterEmail.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a function and required
};
