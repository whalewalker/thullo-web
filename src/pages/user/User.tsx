import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout";

const User = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default User;
