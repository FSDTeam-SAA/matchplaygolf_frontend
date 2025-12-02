"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ColorPicker } from "@/components/ui/color-picker";
import { useQuery } from "@tanstack/react-query";
import { ProfileApiResponse } from "./personal-information-data-type";

const formSchema = z.object({
  gender: z.string().min(1, "Please select an option"),
  newsletterPreference: z.string().min(1, "Please select an option"),
  fullName: z.string().min(2, {
    message: "Full Name must be at least 2 characters.",
  }),
  phone: z.string().min(9, {
    message: "Phone Number must be at least 9 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  sportNationalId: z.string().min(2, {
    message: "Sport National Id must be at least 2 characters.",
  }),
  handicapIndex: z.string().min(2, {
    message: "Handicap Index must be at least 2 characters.",
  }),
  whsNumber: z.string().min(2, {
    message: "Whs Number must be at least 2 characters.",
  }),

  dateOfBirth: z.union([z.date(), z.string()]),
  image: z.any().optional(),
   color: z.string().min(6, {
    message: "Please pick a background color.",
  }),
});

const PersonalInformationForm = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTI1NGM3ZmI0OTIxZmU3MjE2ZjNkZWMiLCJyb2xlIjoiVXNlciIsImlhdCI6MTc2NDU2Mzc3MywiZXhwIjoxNzY1MTY4NTczfQ.k3WGcc392GJ2ZPlW4NOJJnBHzWQK83K_tNj8dpDkKsI`





  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      newsletterPreference: "",
      fullName: "",
      phone: "",
      country: "",
      sportNationalId: "",
      handicapIndex: "",
      whsNumber: "",
      dateOfBirth: new Date(),
      image: undefined,
      color: "#000000"
    },
  });


    const {data} = useQuery<ProfileApiResponse>({
    queryKey: ["personal-info"],
    queryFn: async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      return await res.json();
    }
  })

  console.log(data)

  useEffect(()=>{
    if(data?.data){
      form.reset({
        fullName : data?.data?.fullName,
        phone : data?.data?.phone,
        country: data?.data?.clubName,
        dateOfBirth: data?.data?.dob,
        sportNationalId:data?.data?.sportNationalId,
        handicapIndex: data?.data?.handicap,
        whsNumber: data?.data?.whsNumber,
        gender: data?.data?.gender,
        newsletterPreference: data?.data?.newsletterPreference,
        color: data?.data?.color,
      });
      setPreviewImage(data?.data?.profileImage || "")
    }

  },[data, form])




  const handleImageChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", [file]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleImageChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="px-6">
      <div className="rounded-[16px] border border-[#F3F4F6] bg-white shadow-[0_4px_6px_-4px_rgba(0,0,0,0.10),0_4px_10px_-3px_rgba(0,0,0,0.10)] p-6">
        <h4 className="text-2xl md:text-[28px] lg:text-[32px] text-[#181818] leading-[150%] font-semibold">
          Personal Information
        </h4>
        <p className="text-base text-[#68706A] font-normal leading-[150%]">
          Manage your personal information and profile details.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-10"
          >
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Select Gender
                  </FormLabel>

                  <FormControl className="flex items-center gap-6">
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-0"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="male" className="mt-2" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          Male
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="female" className="mt-2" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          Female
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                      placeholder="Belah"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                        placeholder="(555) 123-4567"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                      Country
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                        placeholder="US"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Date of Birth
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left h-12 ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value
                            ? format(field.value, "MMM dd, yyyy")
                            : "Pick date"}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          typeof field.value === "string"
                            ? new Date(field.value)
                            : field.value
                        }
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="sportNationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                      Sport National ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                        placeholder="Pine Valley Golf Club"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="handicapIndex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                      Handicap Index
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                        placeholder="12.4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whsNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                      WHS Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full h-[48px] py-2 px-3 rounded-[8px] border border-[#C0C3C1] text-base font-medium leading-[120%] text-[#434C45)]"
                        placeholder="12345698774"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Image Upload
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      {!previewImage ? (
                        <div
                          className={`
                                  h-[160px] border-[2px] border-dashed border-[#D1D5DB] rounded-[10px] p-8 text-center cursor-pointer transition-colors
                                  ${
                                    isDragOver
                                      ? "border-blue-400 bg-blue-50"
                                      : "border-gray-300 hover:border-gray-400"
                                  }
                                `}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onClick={() =>
                            document.getElementById("image-upload")?.click()
                          }
                        >
                          <div className="h-full flex flex-col items-center justify-center space-y-3">
                            <div className="flex flex-col items-center gap-4">
                              <Upload className="w-[38px] h-[38px] text-gray-400 " />
                              <h4 className="text-base font-normal text-[#707070] leading-[120%]">
                                Drag and drop image here, <br /> or click add
                                image
                              </h4>
                              {/* <button
                                  type="button"
                                  className="text-base font-medium text-white bg-primary py-[10px] px-[20px] rounded-[8px]"
                                >
                                  Add Image
                                </button> */}
                            </div>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageChange(file);
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="relative">
                          <Image
                            width={292}
                            height={277}
                            src={previewImage || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-[160px] object-cover rounded-lg border-2 border-dashed border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewImage(null);
                              form.setValue("image", undefined);
                            }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
                          >
                            <X className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById("image-upload")?.click()
                            }
                            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                          >
                            <Upload className="h-4 w-4 text-gray-600" />
                          </button>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageChange(file);
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

                <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                      Select Color
                    </FormLabel>
                    <FormControl>
                      <ColorPicker
                        selectedColor={field.value ?? "#FFFFFF"}
                        onColorChange={field.onChange}
                        // previousColor={"#000000"}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

             <FormField
              control={form.control}
              name="newsletterPreference"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  {/* <FormLabel className="text-base text-[#434C45] leading-[150%] font-medium">
                    Select Gender
                  </FormLabel> */}

                  <FormControl className="flex flex-col gap-3">
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-0"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="subscribe" className="mt-2" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          Subscribe to our newsletter
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="unsubscribe" className="mt-2" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          Unsubscribe from our newsletter
                        </FormLabel>
                      </FormItem>
                       <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="none" className="mt-2" />
                        </FormControl>
                        <FormLabel className="cursor-pointer">
                          Receive Order Updates
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>

                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />



            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="h-[49px] text-[#929292] text-lg font-medium leading-[150%] border-[1px] border-[#929292] rounded-[8px] py-3 px-16"
              >
                Discard Changes
              </Button>
              <Button
                type="submit"
                className="h-[49px] bg-gradient-to-b from-[#DF1020] to-[#310000]
            hover:from-[#310000] hover:to-[#DF1020]
            transition-all duration-300 text-[#F7F8FA] font-bold text-lg leading-[120%] rounded-[8px] px-12"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
