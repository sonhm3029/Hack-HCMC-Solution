import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import ModalRefWrapper from "./styled";

const ModalRef = (
  {
    title = "",
    onOk = () => {},
    children,
    onCloseFunc = () => {},
    onOpenFunc = () => {},
    ...props
  },
  ref
) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: _onOpen,
    hide: _onClose,
  }));

  const _onClose = () => {
    onCloseFunc();
    setVisible(false);
  };

  const _onOpen = () => {
    onOpenFunc();
    setVisible(true);
  };

  return (
    <ModalRefWrapper
      open={visible}
      onCancel={_onClose}
      title={title}
      onOk={onOk}
    >
      {children}
    </ModalRefWrapper>
  );
};

export default memo(forwardRef(ModalRef));
