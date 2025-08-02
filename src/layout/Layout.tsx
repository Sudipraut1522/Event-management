import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const BaseLayout = () => {
  return (
    <div className="">
      <div className="flex flex-col  ">
        <Navbar />
        <div className="w-full  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
