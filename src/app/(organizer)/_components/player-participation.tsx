
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

export const description = "A simple area chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 198 },
  { month: "August", desktop: 256 },
  { month: "September", desktop: 310 },
  { month: "October", desktop: 275 },
  { month: "November", desktop: 240 },
  { month: "December", desktop: 320 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#DF1020",
  },
} satisfies ChartConfig;

export function PlayerParticipation() {
  return (
    <div className="px-6 pb-6">
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
              data={chartData}
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
                dataKey="desktop"
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
