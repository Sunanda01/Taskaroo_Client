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
} from "@/components/ui/input-otp";
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

export function EnterOtp({ onSubmit, secondLeft, onResendotp }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleOtpChange = (value, index) => {
    const currentPin = form.getValues("otp").split("");
    currentPin[index] = value;
    const updatedPin = currentPin.join("");
    form.setValue("otp", updatedPin);
  };

  async function onSubmitHandler(data) {
    onSubmit(data);
    toast({
      title: "OTP Submitted",
      description: `Your OTP is ${data.otp}`,
    });
  }

  const resendButtonClass = `flex focus:outline-none py-2 px-4 w-28 
    ${
      secondLeft > 0
        ? "bg-red-300 pointer-events-none"
        : "bg-red-500 hover:bg-red-600"
    } text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-red-500`;

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
                <FormLabel className="text-2xl font-bold mb-5 text-white">
                  One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                  >
                    <InputOTPGroup>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <InputOTPSlot
                          className="focus:outline-none bg-green-100 border-green-600 w-20 font-bold text-xl"
                          key={index}
                          index={index}
                          value={field.value[index] || ""}
                          onChange={handleOtpChange}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription
                  className="focus:outline-none text-red-500 ml-1 text-xs font-bold"
                  style={{ marginTop: "0.9rem" }}
                >
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center justify-center">
            <Button
              type="submit"
              className="flex  focus:outline-none py-2 px-4 w-28 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={onResendotp}
              // disabled={secondLeft > 0}
              aria-disabled={secondLeft > 0}
              className={resendButtonClass}
              style={{ marginTop: "0.9rem", display: "block" }}
            >
              Resend OTP
            </Button>
            <div className="text-white mt-2 font-semibold font-serif">
              {secondLeft > 0 ? `Resend OTP in ( ${secondLeft} seconds )` : ""}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

EnterOtp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  secondLeft: PropTypes.number.isRequired,
  onResendotp: PropTypes.func.isRequired,
};
