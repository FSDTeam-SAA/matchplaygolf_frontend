"use client";

import { Button } from "@/components/ui/button";
// import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
// import { toast } from "react-toastify";

// type UserProfileResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     lastPurchasedAt: string | null;
//     _id: string;
//     firstName: string | null;
//     lastName: string | null;
//     userName: string;
//     email: string;
//     phone: string | null;
//     country: string | null;
//     state: string | null;
//     city: string | null;
//     address: string | null;
//     texId: string | null;
//     points: number;
//     isActive: boolean;
//     isPaid: boolean;
//     imageLink: string;
//     role: "admin" | "user" | string;
//     createdAt: string; // ISO date string
//     updatedAt: string; // ISO date string
//   };
// };

const ProfilePicture = () => {
//   const session = useSession();
//   const token = (session?.data?.user as { accessToken: string })?.accessToken;
  // const userId = (session?.data?.user as { id: string })?.id;
//   const queryClient = new QueryClient();

  const [image, setProfileImage] = useState("/images/common/no-user.jpeg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(setProfileImage)

  // get api
//   const { data } = useQuery<UserProfileResponse>({
//     queryKey: ["profile-img"],
//     queryFn: () =>
//       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((res) => res.json()),
//   });

  // update api
//   const { mutate, isPending } = useMutation({
//     mutationKey: ["update-profile-image"],
//     mutationFn: async (formData: FormData) => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update-profile`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );
//       if (!res.ok) throw new Error("Upload failed");
//       return res.json();
//     },
//     onSuccess: (data) => {
//       toast.success(data?.message || "Profile image updated successfully!");
//       queryClient.invalidateQueries({
//         queryKey: ["profile-img"],
//       });
//       console.log("Response:", data);
//     },
//     onError: (error) => {
//       toast.error("Upload failed");
//       console.error(error);
//     },
//   });



  // delete api
  // const { mutate: deleteImage } = useMutation({
  //   mutationKey: ["delete-profile-image"],
  //   mutationFn: async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete-profile`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (!res.ok) throw new Error("Delete failed");
  //     return res.json();
  //   },
  //   onSuccess: (data) => {
  //     if (data?.success) {
  //       toast.success(data?.message || "Profile image deleted successfully");
  //       return;
  //     }
  //     toast.error(data?.message || "Something went wrong");

  //     queryClient.invalidateQueries({
  //       queryKey: ["profile-img"],
  //     });
  //     console.log("Response:", data);
  //   },
  // });

//   useEffect(() => {
//     const image = data?.data?.imageLink;
//     if (image) {
//       setProfileImage(image);
//     }
//   }, [data?.data?.imageLink]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Show preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setProfileImage(reader.result as string);
//     };
//     reader.readAsDataURL(file);

//     // Upload file to backend
//     const formData = new FormData();
//     formData.append("image", file, file.name);
//     mutate(formData);
//   };

  // const handleDelete = () => {
  //   deleteImage();
  // };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-8 mt-8 p-6 relative rounded-[16px] border border-[#F3F4F6] bg-white shadow-[0_4px_6px_-4px_rgba(0,0,0,0.10),0_4px_10px_-3px_rgba(0,0,0,0.10)]">
      <div className="relative">

        <p className="text-base font-semibold leading-[120%] text-[#111827] text-center pb-4">Profile Picture</p>
        <div className="w-32 h-32 rounded-full overflow-hidden border relative">
          <Image
            src={image}
            alt="Profile"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>

        <div className="absolute -bottom-2 -right-2 flex gap-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            // onChange={handleFileChange}
          />

          {/* Camera Icon (Choose & Upload Image) */}
          <Button
            size="sm"
            className="w-8 h-8 p-0 rounded-full bg-gradient-to-b from-[#DF1020] to-[#310000] shadow-[0_4px_6px_-4px_rgba(0,0,0,0.10),0_10px_15px_-3px_rgba(0,0,0,0.10),0_0_0_0_rgba(0,0,0,0),0_0_0_0_rgba(0,0,0,0)]"
            title="Upload new image"
            onClick={() => fileInputRef.current?.click()}
            // disabled={isPending}
          >
            <Camera className="w-4 h-4" />
          </Button>

          {/* Trash Icon (Reset image) */}
          {/*
          <Button
            size="sm"
            className="w-8 h-8 p-0 rounded-full bg-red-500 hover:bg-red-600"
            title="Delete current image"
            onClick={handleDelete}
          > 
            <Trash2 className="w-4 h-4" />
          </Button>
*/}
        </div>
       
      </div>
      <div className="h-full flex flex-col items-start justify-center">
        
        {/* <h4>{data?.data?.userName}</h4>
        <p>{data?.data?.email}</p> */}
      </div>
       <p className="text-base font-semibold leading-[120%] text-[#111827] text-center">Upload New Photo</p>
    </div>
  );
};

export default ProfilePicture;
