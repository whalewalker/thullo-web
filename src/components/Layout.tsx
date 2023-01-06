import React from "react";
import NavBar from "./NavBar";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="relative ">
      <NavBar />
      <>{props.children}</>
    </div>
  );
};

export default Layout;
