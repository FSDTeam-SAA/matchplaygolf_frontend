



"use client";

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { PaymentSuccessApiResponse } from "./payment-success-data-type";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PaymentSuccessContainer() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  console.log(sessionId)

  const { data } = useQuery<PaymentSuccessApiResponse>({
    queryKey: ['paymentSuccess', sessionId],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/getPayemtInfo/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch payment info');
      }
      return response.json();
    },
    enabled: !!token && !!sessionId,
  })

  console.log(data)


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center">
          <CheckCircle className="text-green-600" size={70} />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold mt-4 text-[#1E293B]">
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-[#64748B] mt-2 leading-[150%]">
          Thank you! Your payment has been processed successfully. A
          confirmation email has been sent to your inbox.
        </p>

        {/* Card */}
        <div className="mt-6 bg-[#F1F5F9] rounded-lg p-4 text-left">
          <h3 className="font-medium text-[#0F172A] text-sm">
            Payment Details
          </h3>
          <div className="mt-2 space-y-1 text-[13px] text-[#475569]">
            <p>
              <span className="font-medium">Status :</span>{" "}
              <span className="text-green-600 font-semibold">Completed</span>
            </p>
            <p>
              <span className="font-medium">Payment Method :</span> Stripe
            </p>
            {/* <p>
              <span className="font-medium">Transaction ID :</span> #TRX2025001
            </p> */}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <div>
            <Link href="/organizer">
              <Button className="w-full h-[48px] text-sm font-semibold rounded-lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <div>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full h-[48px] text-sm font-semibold rounded-lg"
              >
                Continue Browsing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}




















// "use client";

// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import { PaymentSuccessApiResponse } from "./payment-success-data-type";
// import { useSearchParams } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useEffect } from "react";

// export default function PaymentSuccessContainer() {
//   const session = useSession();
//   const token = (session?.data?.user as { accessToken: string })?.accessToken;

//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   const { data, refetch, isFetching } = useQuery<PaymentSuccessApiResponse>({
//     queryKey: ["paymentSuccess", sessionId],
//     queryFn: async () => {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/tournament/getPayemtInfo/${sessionId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch payment info");
//       }

//       return response.json();
//     },
//     enabled: false, // ❌ disable auto fetch
//   });

//   // ⏳ Call API after 5 seconds
//   useEffect(() => {
//     if (!token || !sessionId) return;

//     const timer = setTimeout(() => {
//       refetch();
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [token, sessionId, refetch]);

//   console.log(data);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
//       <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8 text-center">
//         <div className="flex justify-center">
//           <CheckCircle className="text-green-600" size={70} />
//         </div>

//         <h1 className="text-2xl md:text-3xl font-bold mt-4 text-[#1E293B]">
//           Payment Successful!
//         </h1>

//         <p className="text-sm text-[#64748B] mt-2 leading-[150%]">
//           Thank you! Your payment has been processed successfully.
//         </p>

//         <div className="mt-6 bg-[#F1F5F9] rounded-lg p-4 text-left">
//           <h3 className="font-medium text-[#0F172A] text-sm">
//             Payment Details
//           </h3>

//           {isFetching ? (
//             <p className="text-sm text-gray-500 mt-2">Fetching payment info...</p>
//           ) : (
//             <div className="mt-2 space-y-1 text-[13px] text-[#475569]">
//               <p>
//                 <span className="font-medium">Status :</span>{" "}
//                 <span className="text-green-600 font-semibold">
//                   {data?.data.status}
//                 </span>
//               </p>
//               <p>
//                 <span className="font-medium">Payment Method :</span>{" "}
//                 {data?.data.paymentMethod}
//               </p>
//               <p>
//                 <span className="font-medium">Transaction ID :</span>{" "}
//                 {data?.data.transactionId}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mt-8 space-y-3">
//           <Link href="/organizer">
//             <Button className="w-full h-[48px] text-sm font-semibold rounded-lg">
//               Go to Dashboard
//             </Button>
//           </Link>

//           <Link href="/">
//             <Button
//               variant="outline"
//               className="w-full h-[48px] text-sm font-semibold rounded-lg"
//             >
//               Continue Browsing
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }










