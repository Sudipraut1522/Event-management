import React from "react";
import { Calendar } from "lucide-react";
import { Logs } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full sticky top-0 bg-gray-50">
      <nav className="flex justify-between py-4 px-8 items-center">
        <div className="flex gap-4 justify-center items-center ">
          <p className="bg-purple-200 p-2 rounded-md">
            <Calendar size={25} />
          </p>

          <p>
            <p className="font-semibold">Event Manager</p>
            <p className="text-sm text-gray-500">
              Organize and manage your events
            </p>
          </p>
        </div>
        <div className="flex gap-2 items-center ">
          <p className="bg-purple-200 p-2 rounded-md">
            <Logs size={25} />
          </p>
          <p className="font-semibold">View Event</p>
        </div>
      </nav>
      <hr className="border-gray-300" />
    </div>
  );
};

export default Navbar;
