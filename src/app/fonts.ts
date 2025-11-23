import localFont from "next/font/local";

export const hexco = localFont({
  src: [
    {
      path: "../../public/fonts/hexco/HEXCO.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/hexco/HEXCO.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hexco",
});
