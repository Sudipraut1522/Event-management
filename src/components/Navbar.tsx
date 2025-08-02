import React, { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import ReactModal from "./ui/Modal";
import Form from "./form/Form";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);

  const handelEventForm = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="w-full sticky top-0 bg-gray-50">
      <nav className="flex justify-between py-4 md:px-18 items-center">
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
        <div className="flex gap-2 items-center cursor-pointer ">
          <p
            className="bg-purple-500 p-2 rounded-md flex items-center gap-2 px-3"
            onClick={() => handelEventForm()}
          >
            <Plus size={20} className="text-white" />
            <p className="font-semibold text-white">Add Event</p>
          </p>
          {openModal && (
            <>
              <ReactModal open={openModal} close={() => setOpenModal(false)}>
                <Form />
              </ReactModal>
            </>
          )}
        </div>
      </nav>
      <hr className="border-gray-300" />
    </div>
  );
};

export default Navbar;
