import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

import { ReactNode } from "react";


export const metadata: Metadata = {
  title: {
    default: "Chat App - Real-time Messaging Platform",
    template: "%s | Chat App",
  },
  description:
    "Connect with friends and family through our secure, real-time messaging platform. Enjoy private conversations, group chats, and seamless communication with end-to-end encryption.",
  keywords: [
    "chat app",
    "messaging",
    "real-time chat",
    "secure messaging",
    "WhatsApp alternative",
    "instant messaging",
    "group chat",
    "private messaging",
    "encrypted chat",
  ],
  authors: [{ name: "Chat App Team" }],
  creator: "Chat App",
  publisher: "Chat App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chat App - Real-time Messaging Platform",
    description:
      "Connect with friends and family through our secure, real-time messaging platform with end-to-end encryption.",
    url: "/",
    siteName: "Chat App",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chat App - Secure Messaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chat App - Real-time Messaging Platform",
    description:
      "Connect with friends and family through our secure, real-time messaging platform.",
    images: ["/twitter-image.png"],
    creator: "@chatapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};
interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
