import React from "react";
import Navbar from "./_components/shared/navbar/navbar";
import Footer from "./_components/shared/footer/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="sticky top-0 bg-white z-50">
        <Navbar />
      </header>
      <div className="min-h-[calc(100vh-350px)]">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
