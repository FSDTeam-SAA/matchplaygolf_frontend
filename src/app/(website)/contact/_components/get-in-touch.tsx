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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  message: z
    .string()
    .min(10, { message: "Message should at least 10 character!" }),
});

type FormType = z.input<typeof formSchema>;

const GetInTouch = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["contact"],
    mutationFn: async (payload: FormType) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message);
      }

      return await data;
    },

    onSuccess: (data) => {
      toast.success(data?.message);
      form.reset();
    },

    onError: (error) => {
      toast.error(error?.message);
    },
  });

  async function onSubmit(payload: FormType) {
    try {
      await mutateAsync(payload);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="flex gap-10">
      <div className="flex-1">
        <div className="mb-5">
          <h1 className="text-3xl font-hexco">
            <span className="text-primary">Get in </span>Touch
          </h1>
          <p className="text-gray-600 text-md mt-2">
            Our friendly team would love to hear from you.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name Here"
                      className="h-[45px]"
                      {...field}
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write Your Email Here"
                      className="h-[45px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number Here"
                      className="h-[45px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write Your Message Here..."
                      className="h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className="h-[45px] w-full"
            >
              {isPending ? (
                <div className="flex items-center gap-1">
                  <div>
                    <Spinner />
                  </div>

                  <div>Send Message....</div>
                </div>
              ) : (
                `Send Message`
              )}
            </Button>
          </form>
        </Form>
      </div>

      <div className="w-[600px]">
        <Image
          src={"/images/contact/contact.jpg"}
          alt="img.png"
          width={1000}
          height={1000}
          className="w-full h-[630px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default GetInTouch;
