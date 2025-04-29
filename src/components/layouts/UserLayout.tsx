import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
