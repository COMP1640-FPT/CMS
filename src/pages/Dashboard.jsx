import React, { useContext } from "react";
import Store from "../context";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const data = useContext(Store);

  return (
    <div>{["admin"].includes(data.user.role) ? <AdminDashboard /> : null}</div>
  );
};

export default Dashboard;
