import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { hexco } from "./fonts";
import "./globals.css";
import AppProvider from "@/components/provider/AppProvider";
import { Toaster } from "sonner";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GOLFKO",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} ${hexco.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
        <Toaster richColors={true} position="bottom-right" />
      </body>
    </html>
  );
}
