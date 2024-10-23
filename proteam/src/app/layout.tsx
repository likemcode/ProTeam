// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
import { ClerkProvider } from "@clerk/nextjs"; // Import the Next.js version of ClerkProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proteam",
  description: "Manage your projects simply",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <DashboardWrapper>{children}</DashboardWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
