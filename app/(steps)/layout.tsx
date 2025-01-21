import type { Metadata } from "next";
import Main from "@/components/mainLayout/Main";

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
  return <Main modelType="stalls">{children}</Main>;
}
