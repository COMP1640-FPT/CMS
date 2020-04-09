import React, { useContext } from "react";
import Store from "../context";

const Dashboard = () => {
  const data = useContext(Store)
  console.log(data);
  return <div>Dashboard</div>;
};

export default Dashboard;
