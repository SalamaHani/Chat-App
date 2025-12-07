import type { Metadata } from "next";
import "../globals.css";
import Providers from "../Providers";
import Navbar from "@/components/navbar/Navbar";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const metadata: Metadata = {
  title: "Home - Start Chatting with Friends",
  description:
    "Welcome to Chat App. Start meaningful conversations with friends and family. Join thousands of users enjoying secure, real-time messaging with end-to-end encryption.",
  keywords: [
    "chat home",
    "start chatting",
    "messaging app",
    "connect with friends",
    "secure chat",
  ],
  openGraph: {
    title: "Chat App - Start Chatting with Friends",
    description:
      "Welcome to Chat App. Start meaningful conversations with friends and family.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat App - Start Chatting with Friends",
    description:
      "Welcome to Chat App. Start meaningful conversations with friends and family.",
  },
};
interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (

    <Providers>
      <Navbar session={session} />
      {children}
    </Providers>
  );
}
