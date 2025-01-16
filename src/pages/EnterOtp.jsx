import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/InputOTP";
import PropTypes from "prop-types";

const FormSchema = z.object({
  otp: z
    .string()
    .refine((value) => value.length === 4, {
      message: "Your one-time password must be exactly 4 characters.",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Your one-time password must contain only numbers.",
    }),
});

export function EnterOtp({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleOtpChange = (value, index) => {
    const currentPin = form.getValues("otp").split(""); // Get current OTP as an array
    currentPin[index] = value; // Update the digit at the specific index
    const updatedPin = currentPin.join(""); // Combine back into a single string
    form.setValue("otp", updatedPin); // Update React Hook Form's state
  };

  async function onSubmitHandler(data) {
    onSubmit(data);
    console.log("Submitted Data:", data); // Debug log
    toast({
      title: "OTP Submitted",
      description: `Your OTP is ${data.otp}`,
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="w-full max-w-sm space-y-6"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold text-center text-white">
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value} // Single string value from React Hook Form
                    onChange={(val) => field.onChange(val)} // Update RHF value
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          value={field.value[index] || ""} // Extract digit for this slot
                          onChange={handleOtpChange} // Update combined OTP
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription
                  className="text-slate-400"
                  style={{ marginTop: "0.9rem" }}
                >
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 "
            style={{ marginTop: "0.9rem" }}
          >
            Submit
          </Button>
          <Button
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 "
            style={{ marginTop: "0.9rem" }}
          >
            Resend OTP
          </Button>
        </form>
      </Form>
    </div>
  );
}
EnterOtp.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Ensure onSubmit is a function and required
};
