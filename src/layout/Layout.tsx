import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventList from "../components/EventList";
import { useEffect, useState } from "react";
import Dashboard from "../components/ui/EventDashboard/Dashboard";

const BaseLayout = () => {
  return (
    <div className="">
      <div className="flex flex-col  ">
        <Navbar />
        <div className="w-full ">
          <Outlet />
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
