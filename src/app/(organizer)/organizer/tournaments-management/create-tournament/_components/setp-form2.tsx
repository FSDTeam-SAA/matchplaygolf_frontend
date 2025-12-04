// components/Step2Form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTournamentStore } from "@/store/useTournamentStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  companyName: z.string().optional(),
  country: z.string().min(2),
  streetAddress: z.string().min(5),
  townCity: z.string().min(2),
  county: z.string().optional(),
  postcode: z.string().min(3),
  phone: z.string().min(10),
});

export default function Step2Form() {
  const { step1Data, setStep } = useTournamentStore();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      firstName: "Golf",
      lastName: "Golf",
      country: "Golf",
      streetAddress: "Golf",
      townCity: "Golf",
      postcode: "Golf",
      phone: "Golf",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("Final Submission:", { ...step1Data, billing: data });
    alert("Tournament Created Successfully!");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Billing Information</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Reuse your billing fields here */}
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="firstName" render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="lastName" render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            {/* Add all other fields similarly */}
          </div>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-12">
              Place Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}