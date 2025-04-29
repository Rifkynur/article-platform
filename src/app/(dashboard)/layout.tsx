import SidebarDashboard from "@/components/page/dashboard/SidebarDashboard";
import NavbarDashboard from "@/components/page/dashboard/NavbarDashboard";
import "../globals.css";
import Head from "next/head";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <Head>
        <title>Article | Dashboard</title>
      </Head>
      <body className=" mx-auto ">
        <div className="flex relative">
          <SidebarDashboard />
          <div className=" w-full min-h-screen">
            <NavbarDashboard />
            <div className="p-2 lg:p-6 bg-[#f3f4f6]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
