"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
import { Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// ──────────────────────────────────────────────────────────────
// Password validation schema (exactly like your screenshot)
const passwordSchema = z
  .string()
  .min(8, {
    message: "Minimum 8-12 characters (recommend 12+ for stronger security).",
  })
  .regex(/[A-Z]/, { message: "At least one uppercase letter must." })
  .regex(/[a-z]/, { message: "At least one lowercase letter must." })
  .regex(/[0-9]/, { message: "At least one number must (0-9)." })
  .regex(/[^A-Za-z0-9]/, {
    message: "At least special character (! @ # $ % ^ & * etc.).",
  })
  .refine((val) => !/\s/.test(val), { message: "No spaces allowed." });

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ChangePasswordForm() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const newPassword = form.watch("newPassword");

  // Live checks for password rules
  const checks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
    noSpace: !/\s/.test(newPassword),
  };

  // api integration

  const { mutate, isPending } = useMutation({
    mutationKey: ["chnage-password"],
    mutationFn: async (values: {
      oldPassword: string;
      newPassword: string;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      return await res.json();
    },
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Password Reset successfull");
      form.reset();
    },
    
  });

  function onSubmit(values: FormValues) {
    console.log("Password change successful:", values);

    const payload = {
      oldPassword: values?.currentPassword,
      newPassword: values?.newPassword,
    };

    mutate(payload);
  }

  return (
    <div className=" p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="w-full h-[52px] bg-[#EDF2F6] border-[1px] border-[#E0E4EC] rounded-[8px] py-3 px-6 outline-none right-0 text-base font-semibold leading-[150%] text-[#343A40]"
                        type={showPasswords.current ? "text" : "password"}
                        placeholder="••••••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setShowPasswords((s) => ({
                            ...s,
                            current: !s.current,
                          }))
                        }
                      >
                        {showPasswords.current ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full h-[52px] bg-[#EDF2F6] border-[1px] border-[#E0E4EC] rounded-[8px] py-3 px-6 outline-none right-0 text-base font-semibold leading-[150%] text-[#343A40]"
                          type={showPasswords.new ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setShowPasswords((s) => ({ ...s, new: !s.new }))
                          }
                        >
                          {showPasswords.new ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Confirm New Password */}
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#343A40] leading-[150%]">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="w-full h-[52px] bg-[#EDF2F6] border-[1px] border-[#E0E4EC] rounded-[8px] py-3 px-6 outline-none right-0 text-base font-semibold leading-[150%] text-[#343A40]"
                          type={showPasswords.confirm ? "text" : "password"}
                          placeholder="••••••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setShowPasswords((s) => ({
                              ...s,
                              confirm: !s.confirm,
                            }))
                          }
                        >
                          {showPasswords.confirm ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/*  Password requirements list */}
          <div className="flex flex-col justify-center">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                {checks.length ? (
                  <Check className="text-[#1F9854]" size={18} />
                ) : (
                  <X className="text-[#E5102E]" size={18} />
                )}
                <span
                  className={checks.length ? "text-[#1F9854]" : "text-gray-600"}
                >
                  Minimum 8-12 characters (recommend 12+ for stronger security).
                </span>
              </li>
              <li className="flex items-center gap-2">
                {checks.uppercase ? (
                  <Check className="text-[#1F9854]" size={18} />
                ) : (
                  <X className="text-[#E5102E]" size={18} />
                )}
                <span
                  className={
                    checks.uppercase ? "text-[#1F9854]" : "text-gray-600"
                  }
                >
                  At least one uppercase letter must.
                </span>
              </li>
              <li className="flex items-center gap-2">
                {checks.lowercase ? (
                  <Check className="text-[#1F9854]" size={18} />
                ) : (
                  <X className="text-[#E5102E]" size={18} />
                )}
                <span
                  className={
                    checks.lowercase ? "text-[#1F9854]" : "text-gray-600"
                  }
                >
                  At least one lowercase letter must.
                </span>
              </li>
              <li className="flex items-center gap-2">
                {checks.number ? (
                  <Check className="text-[#1F9854]" size={18} />
                ) : (
                  <X className="text-[#E5102E]" size={18} />
                )}
                <span
                  className={checks.number ? "text-[#1F9854]" : "text-gray-600"}
                >
                  At least one number must (0-9).
                </span>
              </li>
              <li className="flex items-center gap-2">
                {checks.special ? (
                  <Check className="text-[#1F9854]" size={18} />
                ) : (
                  <X className="text-[#E5102E]" size={18} />
                )}
                <span
                  className={
                    checks.special ? "text-[#1F9854]" : "text-gray-600"
                  }
                >
                  At least special character (! @ # $ % ^ & * etc.).
                </span>
              </li>
              <li className="flex items-center gap-2">
                {checks.noSpace ? (
                  <Check className="text-[#1F9854]" size={18} />
                ) : (
                  <X className="text-[#E5102E]" size={18} />
                )}
                <span
                  className={
                    checks.noSpace ? "text-[#1F9854]" : "text-gray-600"
                  }
                >
                  No spaces allowed.
                </span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="h-[49px] text-[#929292] text-lg font-medium leading-[150%] border-[1px] border-[#929292] rounded-[8px] py-3 px-16"
            >
              Reset
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="h-[49px] bg-gradient-to-b from-[#DF1020] to-[#310000]
            hover:from-[#310000] hover:to-[#DF1020]
            transition-all duration-300 text-[#F7F8FA] font-bold text-lg leading-[120%] rounded-[8px] px-12"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
