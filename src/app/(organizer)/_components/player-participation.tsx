
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CircleAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";

export const description = "A simple area chart";

type MonthlyParticipants = {
  month: string;
  participants: number;
};

type ParticipantsByYearResponse = {
  success: boolean;
  year: number;
  data: MonthlyParticipants[];
};



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#DF1020",
  },
} satisfies ChartConfig;

export function PlayerParticipation() {

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const {data, isLoading, isError, error} = useQuery<ParticipantsByYearResponse>({
    queryKey: ["participants-by-year"],
    queryFn: async () =>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/organizer-dashboard/participants?year=2025`,{
        method: "GET",
        headers: {
          Authorization : `Bearer ${token}`
        }
      });
      return res.json();
    },
    enabled: !!token
  })

    let content;

  if (isLoading) {
    content = (
      <div className="pt-4">
        <TableSkeletonWrapper count={3} />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.length === 0
  ) {
    content = (
      <div>
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.length > 0
  ) {
    content = (
      <div>
           <Card className="">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold leading-[150%] text-[#343A40] font-hexco">
            Player Participation <CircleAlert />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full max-h-[373px]">
            <AreaChart
              accessibilityLayer
              data={data?.data}
              className=" w-full"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis stroke="#999" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="participants"
                type="monotone"
                fill="var(--color-desktop)"
                fillOpacity={0.1}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      </div>
    );
  }
  return (
    <div className="px-6 pb-6">
      {content}
    </div>
  );
}



// 'use client'

// import { useState } from 'react'
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'
// import { Calendar, CircleAlert } from 'lucide-react'
// import { useSession } from 'next-auth/react'
// import { useQuery } from '@tanstack/react-query'
// import TableSkeleton from './player-paricipation-loading';
// import ErrorContainer from '@/components/shared/ErrorContainer/ErrorContainer'
// import NotFound from '@/components/shared/NotFound/NotFound'

// type MonthlyActivity = {
//   month: string
//   revenue: number
// }

// type ActivityResponse = {
//   success: boolean
//   data: {
//     year: number
//     data: MonthlyActivity[]
//   }
//   message: string
// }

// const chartConfig = {
//   revenue: {
//     label: 'Revenue',
//     color: '#DF1020',
//   },
// } satisfies ChartConfig

// // Generate year options (current year and 5 years back)
// const generateYearOptions = () => {
//   const currentYear = new Date().getFullYear()
//   const years = []
//   for (let i = 0; i < 6; i++) {
//     years.push(currentYear - i)
//   }
//   return years
// }

// export function PlayerParticipation() {
//   const session = useSession()
//   const token = (session?.data?.user as { accessToken: string })?.accessToken
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
//   const yearOptions = generateYearOptions()

//   const { data, isLoading, isError, error } = useQuery<ActivityResponse>({
//     queryKey: ['activity-chart', selectedYear],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/organizer-dashboard/participants?year=${selectedYear}`,
//         {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )
//       return res.json()
//     },
//     enabled: !!token,
//   })

//   let content

//   if (isLoading) {
//     content = (
//       <div className="pt-4">
//         <TableSkeleton />
//       </div>
//     )
//   } else if (isError) {
//     content = (
//       <div>
//         <ErrorContainer message={error?.message || 'Something went wrong'} />
//       </div>
//     )
//   } else if (data && data?.data?.data && data?.data?.data?.length === 0) {
//     content = (
//       <div>
//         <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
//       </div>
//     )
//   } else if (data && data?.data?.data && data?.data?.data?.length > 0) {
//     content = (
//       <CardContent>
//         <ChartContainer config={chartConfig} className="w-full max-h-[373px]">
//           <AreaChart
//             accessibilityLayer
//             data={data?.data?.data}
//             className="w-full"
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={value => value.slice(0, 3)}
//             />
//             <YAxis stroke="#999" />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="revenue"
//               type="monotone"
//               fill="var(--color-revenue)"
//               fillOpacity={0.1}
//               stroke="var(--color-revenue)"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     )
//   }

//   return (
//     <div className="px-6 pb-6">
//       <Card className="border border-[#E6E6E8]">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2 text-xl font-semibold leading-[150%] text-[#343A40] font-hexco">
//               Tournament Activity <CircleAlert className="w-5 h-5" />
//             </CardTitle>

//             {/* Year Filter Dropdown */}
//             <div className="relative">
//               <select
//                 value={selectedYear}
//                 onChange={e => setSelectedYear(Number(e.target.value))}
//                 className="appearance-none bg-white border border-[#E6E6E8] rounded-lg px-4 py-2 pr-10 text-sm font-medium text-[#343A40] cursor-pointer hover:border-[#DF1020] focus:outline-none focus:ring-2 focus:ring-[#DF1020] focus:ring-opacity-20 transition-all"
//               >
//                 {yearOptions.map(year => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//               <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#616161] pointer-events-none" />
//             </div>
//           </div>
//         </CardHeader>
//         {content}
//       </Card>
//     </div>
//   )
// }
