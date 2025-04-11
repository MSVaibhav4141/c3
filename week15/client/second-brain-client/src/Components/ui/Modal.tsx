import React, { Dispatch, SetStateAction, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  opacity: number;
}

export const Modal = ({ isOpen, setOpen, children, opacity }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  // ESC key close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0  z-[150] w-[100vw] h-[100vh] ">
      <div
        className="absolute bg-black  w-[100vw] h-[100vh] top-0 left-0"
        style={{ opacity: opacity / 100 , height:'100vh'}}
        onClick={() => setOpen(false)}
      ></div>

      <div className="relative z-[150] w-[100vw] h-[100vh]">{children}</div>
    </div>
  );
};
