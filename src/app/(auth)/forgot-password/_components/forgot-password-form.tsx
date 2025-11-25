"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

type FormType = z.infer<typeof formSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-[45px] border border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-[45px] w-full bg-black hover:bg-black/85 text-white"
          >
            Send OTP
          </Button>
        </form>
      </Form>

      <div>
        <h3 className="text-center mt-5">
          Don’t have an account?{" "}
          <Link href={"/sign-up"}>
            <span className="font-semibold hover:underline">Sign Up</span>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
