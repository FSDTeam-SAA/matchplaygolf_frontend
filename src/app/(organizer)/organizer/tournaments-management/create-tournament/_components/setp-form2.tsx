// components/Step2Form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTournamentStore } from "@/store/useTournamentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const schema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  companyName: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  streetAddress: z.string().min(2, "Street Address is required"),
  city: z.string().min(2, "City is required"),
  district: z.string().optional(),
  zipcode: z.string().min(3, "Postcode is required"),
  phone: z.string().min(9, "Phone must be at least 9 digits"),
});

export default function Step2Form() {
  const { step1Data, setStep, clearStorage } = useTournamentStore();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      country: "",
      streetAddress: "",
      city: "",
      district: "",
      zipcode: "",
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (!step1Data) {
      alert("Please complete Step 1 first");
      return;
    }

    setIsLoading(true);

    const payload = {
      tournamentName: step1Data.tournamentName,
      sportName: step1Data.sportName,
      drawFormat: step1Data.drawFormat === "Knockout" ? "Knockout" : "Teams",
      format:
        step1Data.format.charAt(0).toUpperCase() + step1Data.format.slice(1),
      drawSize: parseInt(step1Data.totalDrawSize),
      price: step1Data.price, // or make dynamic later
      billingAddress: {
        fullName: data?.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName || undefined,
        country: data.country,
        streetAddress: data.streetAddress,
        city: data.city,
        district: data.district || undefined,
        zipcode: data.zipcode,
      },
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.success && result.paymentDetails?.checkoutUrl) {
        clearStorage();
        // Redirect to Stripe Checkout
        window.location.href = result.paymentDetails.checkoutUrl;
      } else {
        // alert("Something went wrong. Please try again.");
        console.log(result);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create tournament");
    } finally {
      setIsLoading(false);
    }
  };

  // const onSubmit = (data: z.infer<typeof schema>) => {
  //   console.log("Final Submission:", { ...step1Data, billing: data });
  //   alert("Tournament Created Successfully!");
  // };

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Billing Information</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                  Email Address <sup className="text-red-500">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Full Name <sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Company Name (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Golf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Country / Region<sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Street Address<sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Town / City<sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Golf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Country / State (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Golf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Postcode<sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Golf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Phone Number <sup className="text-red-500">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Golf"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center gap-10 pt-6">
            <Button
              className="h-[48px] px-10 text-base font-semibold leading-[120%] text-black"
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              className="h-[48px] px-10 text-base font-semibold leading-[120%] text-black"
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                useTournamentStore.getState().clearStorage();
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-[48px] bg-gradient-to-b from-[#DF1020] to-[#310000]
  hover:bg-gradient-to-b hover:from-[#FF2A3A] hover:to-[#4A0000]
  transition-all duration-300 text-base font-semibold leading-[120%] text-white px-12"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
