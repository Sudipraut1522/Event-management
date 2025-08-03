import React from "react";
import Modal from "react-modal";
import { X } from "lucide-react"; // You can also use an SVG or other icon lib

interface ModalProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
}

const ReactModal: React.FC<ModalProps> = ({ open, close, children }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={close}
      contentLabel="Example Modal"
      className="relative  "
      overlayClassName="fixed inset-50 bg-black/80 bg-opacity-50 h-[100%] top-0 left-0 w-[100%] right-0"
    >
      {/* Close Icon */}
      <button
        onClick={close}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      <div className="flex justify-center items-center h-screen">
        {/* Modal content */}
        {children}
      </div>
    </Modal>
  );
};

export default ReactModal;
