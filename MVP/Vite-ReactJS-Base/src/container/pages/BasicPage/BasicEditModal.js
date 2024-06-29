import ModalRef from "@/components/ModalRef";
import useCustomState from "@/hooks/useCustomState";
import React from "react";

const BasicEditModal = ({
  modalRef,
  onSubmit = () => {},
  children,
  onOpenFunc = () => {},
  onCloseFunc = () => {},
  type="edit",
  ...props
}) => {
  return (
    <ModalRef
      ref={modalRef}
      title={type === "edit" ? "Thay đổi dữ liệu" : "Thêm mới dữ liệu"}
      onOk={onSubmit}
      onOpenFunc={onOpenFunc}
      onCloseFunc={onCloseFunc}
      {...props}
    >
      {children}
    </ModalRef>
  );
};

export default BasicEditModal;
