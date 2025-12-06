"use client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { PendingMessagesProvider } from "./context/PendingMessagesContext";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <PendingMessagesProvider>
          <Toaster />
          {children}
        </PendingMessagesProvider>
      </ThemeProvider>
    </>
  );
}
export default Providers;

