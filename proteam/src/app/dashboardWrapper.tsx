"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {/* Render DashboardLayout only if the user is signed in */}
      <SignedIn>
        <DashboardLayout>{children}</DashboardLayout>
      </SignedIn>

      {/* Redirect users to the sign-in page if they are not authenticated */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </StoreProvider>
  );
};

export default DashboardWrapper;
