import React from "react";
import detectClickOnParent from "../../../helper/detectClickOnParent";
import useDocumentBodyLock from "../../../hooks/useDocumentBodyLock";

interface BackdropProps {
  open: boolean;
  closeFn: (...args: any[]) => void;
  onClose?: (...args: any[]) => void;
  blur?: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({
  closeFn,
  open,
  onClose,
  children,
  blur,
}) => {
  const backdropRef = React.useRef<HTMLDivElement>(null);
  useDocumentBodyLock(open);

  React.useEffect(() => {
    if (onClose) {
      return () => {
        onClose();
      };
    }
  }, []);

  return (
    <div
      onClick={(event: React.MouseEvent<HTMLElement>) =>
        detectClickOnParent(event, backdropRef, closeFn)
      }
      ref={backdropRef}
      style={{ backdropFilter: blur ? "blur(7px)" : "blur(0px)" }}
      className={`fixed flex justify-center items-center h-full w-full bg-black bg-opacity-50 z-1000 top-0 left-0`}
    >
      {children}
    </div>
  );
};

export default Backdrop;
