import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "SplitShare",
  description: "The ultimate tool for splitting bills and sharing expenses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/icon.png" />
      </head>
      <body
        className={`${inter.className}`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
