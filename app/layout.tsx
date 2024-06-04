import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AmplifyProvider } from "@/components/auth-provider";
import { Amplify } from "aws-amplify";
import config from "@/amplify_outputs.json";

Amplify.configure(config, { ssr: true });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garnet Sub Manager",
  description: "Manage your subscription and notifications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AmplifyProvider>
            <div className="fixed z-10 w-full mt-3">
              <Header />
            </div>
            <div className="bg-zinc-100 dark:bg-black flex flex-col"> 
              <div className="mt-52">{children}</div>
            </div>
            <Toaster />
          </AmplifyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
