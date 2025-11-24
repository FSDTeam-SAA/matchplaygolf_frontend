import React from "react";
import Navbar from "./_components/shared/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="sticky top-0 bg-white">
        <Navbar />
      </header>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
