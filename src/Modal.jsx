import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

import { HiXMark } from "react-icons/hi2";

function Overlay({ children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {children}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-white hover:text-red-400"
    >
      {children}
    </button>
  );
}

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <div className="w-[5rem] h-[5rem] bg-amber-700">
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
