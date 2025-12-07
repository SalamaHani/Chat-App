export const metadata = {
  title: "Sign Up - Create Your Account",
  description:
    "Join Chat App today. Create your free account and start connecting with friends and family through secure, real-time messaging with end-to-end encryption.",
  keywords: [
    "sign up",
    "create account",
    "register",
    "join chat app",
    "new account",
    "free messaging",
  ],
  openGraph: {
    title: "Sign Up - Create Your Account | Chat App",
    description:
      "Join Chat App today and start connecting with friends through secure messaging.",
    url: "/signup",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign Up - Create Your Account",
    description: "Join Chat App and start messaging securely.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
import "../globals.css";
import Providers from "../Providers";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
