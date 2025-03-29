/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import type { ReactNode } from 'react';
import React from 'react';
import './index.css';
interface ModalCoverProps {
  children: ReactNode;
  isOpen: boolean;
  handleOnClose: () => void;
}

const ModalCover: React.FC<ModalCoverProps> = ({
  children,
  isOpen,
  handleOnClose,
}) => {
  if (!isOpen) {
    return;
  }
  return (
    <div
      className="modal-cover"
      // onClick={(e) => {
      //   handleOnClose();
      // }}
    >
      {/* <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      > */}
      {children}
      {/* </div> */}
    </div>
  );
};

export default ModalCover;
