import React from "react";
import Navbar from "../Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>sidebar Dashboard</div>
      <div>
        <Navbar />
        <div>compoennt</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
