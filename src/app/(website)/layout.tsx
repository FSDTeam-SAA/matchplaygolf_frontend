import React from "react";
import Navbar from "./_components/shared/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
