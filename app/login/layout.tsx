export const metadata = {
  title: "Login - Access Your Account",
  description:
    "Sign in to your Chat App account. Access your messages, continue conversations, and stay connected with friends and family securely.",
  keywords: [
    "login",
    "sign in",
    "chat login",
    "access account",
    "secure login",
  ],
  openGraph: {
    title: "Login - Access Your Account | Chat App",
    description: "Sign in to your Chat App account and access your messages.",
    url: "/login",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Login - Access Your Account",
    description: "Sign in to your Chat App account.",
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
