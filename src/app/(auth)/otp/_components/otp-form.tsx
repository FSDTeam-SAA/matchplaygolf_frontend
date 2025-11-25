"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters." }),
});

type FormType = z.infer<typeof formSchema>;

const OtpForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* OTP Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-5">
                      <InputOTPSlot
                        index={0}
                        className="h-16 w-16 rounded-md border border-black text-lg"
                      />
                      <InputOTPSlot
                        index={1}
                        className="h-16 w-16 rounded-md border border-black text-lg"
                      />
                      <InputOTPSlot
                        index={2}
                        className="h-16 w-16 rounded-md border border-black text-lg"
                      />
                      <InputOTPSlot
                        index={3}
                        className="h-16 w-16 rounded-md border border-black text-lg"
                      />
                      <InputOTPSlot
                        index={4}
                        className="h-16 w-16 rounded-md border border-black text-lg"
                      />
                      <InputOTPSlot
                        index={5}
                        className="h-16 w-16 rounded-md border border-black text-lg"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-[45px] w-full bg-black hover:bg-black/85 text-white"
          >
            Verify OTP
          </Button>
        </form>
      </Form>

      <div className="mt-5 space-y-3">
        <h3 className="text-center">
          Didn&apos;t receive OTP?{" "}
          <button
            type="button"
            className="font-semibold hover:underline text-black"
            onClick={() => console.log("Resend OTP")}
          >
            Resend OTP
          </button>
        </h3>
      </div>
    </div>
  );
};

export default OtpForm;
