
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/components/languagecontext";
import ChatbotLoader from "@/components/chatbotloader";
import InitialLoader from "@/components/loading";
import { Navigation } from "@/components/navigation";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DISETO",
  description: "DISETO Architecture & Interior Design",
};

export default function RootLayout({ children }) {
  return (
            <ClerkProvider>

    <html
      lang="el"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <LanguageProvider>
            <InitialLoader />

            <Suspense fallback={null}>
              <Navigation />
            </Suspense>

            {children}

            <ChatbotLoader />
          </LanguageProvider>
      </body>
    </html>
            </ClerkProvider>

  );
}
