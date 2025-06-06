import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Product Listing App",
  description: "E-commerce Product Listing Application with Shopping Cart"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-poppins antialiased bg-primary`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
