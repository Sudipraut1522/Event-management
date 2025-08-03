import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import Dashboard from "../components/ui/EventDashboard/Dashboard";
import CalendarEventViewer from "../components/ui/EventDashboard/EventList";

const BaseLayout = () => {
  return (
    <div className="">
      <div className="flex flex-col  ">
        <Navbar />
        <div className="w-full ">
          <Outlet />
          <CalendarEventViewer />
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
