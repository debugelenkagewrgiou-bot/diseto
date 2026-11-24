
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/languagecontext";
import ChatbotLoader from "@/components/chatbotloader";
import InitialLoader from "@/components/loading";

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
    <html
  lang="el"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
      
    
      <body className="min-h-full flex flex-col">
        <InitialLoader />

        <LanguageProvider>
          {children}
          <ChatbotLoader />
        </LanguageProvider>
      </body>
    </html>
  );
}
