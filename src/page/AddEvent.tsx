import React, { useState } from "react";
import ReactModal from "../components/ui/Modal";
import Form from "../components/form/Form";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    navigate(-1);
  };

  return (
    <div>
      <>
        <ReactModal open={openModal} close={() => closeModal()}>
          <Form />
        </ReactModal>
      </>
    </div>
  );
};

export default AddEvent;
