import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children }) {
  const portalNode = document.createElement("section");

  useEffect(() => {
    document.body.appendChild(portalNode);
    return () => {
      portalNode.remove();
    };
  }, [portalNode]);

  return createPortal(<div>{children}</div>, portalNode);
}

export default Modal;
