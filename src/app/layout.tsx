// Import necessary modules
import React from "react";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/Toogle";
import CurrentUserProvider from "@/context/CurrentUserContext";
import getCurrentUser from "@/actions/getCurrentUser";
import CreateChannelModalProvider from "@/context/CreateChannelModelContext";
import CreateChannelModel from "@/components/Modal/CreateChannelModel";
import { Toaster } from "react-hot-toast";
import getCurrentChannel from "@/actions/getCurrentChannel";
import CurrentChannelProvider from "@/context/CreateChannelContext";
import UploadVideoModalProvider from "@/context/UploadVideoModelContext";
import SidebarProvider from "@/context/SidebarContext";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import NextjsTopLoader from "nextjs-toploader";

// Define Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for SEO
const keywords = [
  "AI video sharing platform",
  "Social media video sharing",
  "AI-driven video community",
  "Intelligent video sharing platform",
  "AI-powered social network for videos",
  "AI-driven video discovery",
  "Next-generation video sharing",
  "Cutting-edge AI video platform",
  "Smart video recommendations",
  "Revolutionary video community",
  "free ai video platform",
  "ai generate my video",
  // Add more keywords as needed
];
export const metadata: Metadata = {
  metadataBase: new URL("https://myaimix.com/"),
  title: {
    default: "Myaimix",
    template: "%s | MyAiMix",
  },
  description:
    "Best AI-generated video sharing platform for free, Discover the ultimate AI-powered video sharing platform for free!, Join the revolution with Myaimix - the best AI-generated video sharing community, xperience the future of video sharing with Myaimix - where AI meets creativity., Unlock endless possibilities with Myaimix - the top destination for AI-driven video content., Elevate your video sharing experience with Myaimix - the preferred choice for AI enthusiasts, Transform your content with Myaimix - the leading platform for AI-enhanced videos, Explore, engage, and collaborate on Myaimix - the go-to destination for cutting-edge video sharing., join the AI revolution with Myaimix - where innovation meets community, Discover the power of AI-generated videos on Myaimix - your gateway to creativity., Unleash your creativity with Myaimix - the premier AI-powered video sharing network. ",
  keywords: keywords,
  openGraph: {
    title: "Myaimix Best Ai Video sharing platform",
    description:
      "Best AI-generated video sharing platform for free, Discover the ultimate AI-powered video sharing platform for free!, Join the revolution with Myaimix - the best AI-generated video sharing community, xperience the future of video sharing with Myaimix - where AI meets creativity., Unlock endless possibilities with Myaimix - the top destination for AI-driven video content., Elevate your video sharing experience with Myaimix - the preferred choice for AI enthusiasts, Transform your content with Myaimix - the leading platform for AI-enhanced videos, Explore, engage, and collaborate on Myaimix - the go-to destination for cutting-edge video sharing., join the AI revolution with Myaimix - where innovation meets community, Discover the power of AI-generated videos on Myaimix - your gateway to creativity., Unleash your creativity with Myaimix - the premier AI-powered video sharing network.",
    type: "website",
    locale: "en_US",
    url: "https://myaimix.com/",
    siteName: "myaimix",
  },
};

// Define RootLayout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch current user and current channel asynchronously
  const currentUser = await getCurrentUser();
  const currentChannel = await getCurrentChannel();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} suppressHydrationWarning dark:bg-black dark:text-white text-black`}
      >
        <CreateChannelModalProvider>
          <Toaster />
          <CreateChannelModel />
          <CurrentUserProvider user={currentUser}>
            <CurrentChannelProvider Channel={currentChannel}>
              <UploadVideoModalProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <SidebarProvider>
                    <Navbar />
                    <NextjsTopLoader
                      color="linear-gradient(to right, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))"
                      initialPosition={0.08}
                      crawlSpeed={1200}
                      height={3}
                      crawl={true}
                      showSpinner={true}
                      easing="ease"
                      speed={1200}
                    />
                    {children}
                    <Footer />
                  </SidebarProvider>
                </ThemeProvider>
              </UploadVideoModalProvider>
            </CurrentChannelProvider>
          </CurrentUserProvider>
        </CreateChannelModalProvider>
      </body>
    </html>
  );
}
