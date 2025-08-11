import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ConvexClientProvider } from "@/provider/convexClientprovider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className}`}>
        <ClerkProvider>
          <ConvexClientProvider>
            <Header />
            <main className="min-h-screen">
              {children}
              <Toaster richColors/>
            </main>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
