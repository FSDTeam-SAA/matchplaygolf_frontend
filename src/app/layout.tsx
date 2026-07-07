import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/components/provider/AppProvider";
import { Toaster } from "sonner";

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
      <body className="antialiased">
        <AppProvider>{children}</AppProvider>
        <Toaster richColors={true} position="bottom-right" />
      </body>
    </html>
  );
}
