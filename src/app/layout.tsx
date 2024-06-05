import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

import { ThemeProvider } from "@/components/Toogle";

import Footer from "@/components/Footer";
import CurrentUserProvider from "@/context/CurrentUserContext";
import getCurrentUser from "@/actions/getCurrentUser";
import CreateChannelModalProvider from "@/context/CreateChannelModelContext";
import CreateChannelModel from "@/components/Modal/CreateChannelModel";
import { Toaster } from "react-hot-toast";
import getCurrentChannel from "@/actions/getCurrentChannel";
import CurrentChannelProvider from "@/context/CreateChannelContext";
import UploadVideoModalProvider from "@/context/UploadVideoModelContext";

import SidebarProvider from "@/context/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Myaimix",
    template: "%s - MyAiMix",
  },
  description: "Best ai generated video sharing platform for free",
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const currentChannel = await getCurrentChannel();

  return (
    <html lang="en" suppressHydrationWarning={true}>
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
