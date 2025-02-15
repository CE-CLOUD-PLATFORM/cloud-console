import React, { ReactNode } from "react";
import "./index.css"
interface ModalCoverProps {
  children: ReactNode;
  isOpen:boolean
}

const ModalCover: React.FC<ModalCoverProps> = ({ children,isOpen }) => {
  if (!isOpen) {
    return
  }
  return <div className="modal-cover">{children}</div>;
};

export default ModalCover;