import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import StoreProvider from "@/app/StoreProvider";
import MainLayout from "@/components/mainLayout/MainLayout";
import Header from "@/components/mainLayout/Header";
import "@/public/assets/css/global.css";
import { Toaster } from "react-hot-toast";
import GoogleTagManager from "@/components/googleTagManager/GoogleTagManager";

const manRope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});
const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});
export const metadata: Metadata = {
  title: "Commercial Toilet Partitions & Stalls | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${manRope.className} ${oswald.className} ${manRope.variable} ${oswald.variable}`}
        >
          <MainLayout>
            <Header />
            {children}
            <Toaster position="top-right" />
          </MainLayout>
        </body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID} />
      </html>
    </StoreProvider>
  );
}
