import React from "react";
import { Calendar, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="w-full sticky top-0 bg-gray-50">
      <nav className="flex justify-between px-2 py-4 md:px-12 items-center">
        <div className="flex gap-4 justify-center items-center ">
          <p className="bg-purple-200 p-2 rounded-md">
            <Calendar size={25} />
          </p>

          <p>
            <p className="font-semibold">Event Manager</p>
            <p className="text-sm text-gray-500 sm:block hidden">
              Organize and manage your events
            </p>
          </p>
        </div>
        <div className="flex gap-2 items-center cursor-pointer ">
          <NavLink to={"add-event"}>
            <p className="bg-purple-500 p-2 rounded-md flex items-center gap-2 px-3">
              <Plus size={20} className="text-white" />
              <p className="font-semibold text-white">Add Event</p>
            </p>
          </NavLink>
        </div>
      </nav>
      <hr className="border-gray-300" />
    </div>
  );
};

export default Navbar;
