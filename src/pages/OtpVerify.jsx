import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
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

const formSchema = z.object({
  otp: z
    .string()
    .refine((value) => value.length === 4, {
      message: "Your one-time password must be exactly 4 characters.",
    })
    .refine((value) => /^\d+$/.test(value), {
      message: "Your one-time password must contain only numbers.",
    }),
});

export function OtpVerify() {
  const form = useForm({
    resolver: zodResolver(formSchema),
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

  async function onSubmit(data) {
    console.log(data);
    toast({
      title: "OTP Submitted",
      description: `Your OTP is ${data.otp}`,
    });
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
        <div className="flex gap-3 ">
          <h1 className="text-2xl font-bold mt-2 text-white">
            Verify Your Email
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
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

            <div className="flex justify-center items-center flex-col">
              <Button
                type="submit"
                className="flex  focus:outline-none py-2 px-4 w-28 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </Button>
              <Button
                className="flex w-28 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                type="button"
                style={{ marginTop: "0.9rem" }}
              >
                Resend OTP
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
