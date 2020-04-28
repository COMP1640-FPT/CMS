import React, { useContext } from "react";
import Store from "../context";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  const data = useContext(Store);

  return (
    <div>
      {["admin", "staff"].includes(data.user.role) ? <AdminDashboard /> : null}
      {["tutor", "student"].includes(data.user.role) ? <UserDashboard role={data ? data.user.role : null} id={data ? data.user.id : null} /> : null}
    </div>
  );
};

export default Dashboard;
