import React from "react";
import detectClickOnParent from "../../../helper/detectClickOnParent";
import useDocumentBodyLock from "../../../hooks/useDocumentBodyLock";
import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
} from "framer-motion";

export interface BackdropProps {
  open: boolean;
  closeFn: (...args: any[]) => void;
  onClose?: (...args: any[]) => void;
  blur?: boolean;
  preventLock?: boolean;
  className?: string;
  style?: Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "style"
  >;
}

const Backdrop: React.FC<BackdropProps> = ({
  closeFn,
  open,
  onClose,
  children,
  blur,
  className,
  style,
  preventLock,
}) => {
  const backdropRef = React.useRef<HTMLDivElement>(null);

  preventLock ? null : useDocumentBodyLock(open);

  React.useEffect(() => {
    if (onClose) {
      return () => {
        onClose();
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.15 }}
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            detectClickOnParent(event, backdropRef, closeFn)
          }
          ref={backdropRef}
          style={{
            backdropFilter: blur ? "blur(7px)" : "blur(0px)",
            ...style,
          }}
          className={`fixed flex h-full w-full bg-black bg-opacity-50 z-1000 top-0 left-0 ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Backdrop;
