import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main className='flex w-full flex-col bg-gray-50 dark:bg-dark-bg'
       
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // <StoreProvider>
    //   <AuthProvider>
        <DashboardLayout>{children}</DashboardLayout>
    //   </AuthProvider>
    // </StoreProvider>
  );
};

export default DashboardWrapper;