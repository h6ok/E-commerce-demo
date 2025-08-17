import { useState } from "react";
import type { Variant } from "../context/ToastContext";

type ToastProps = {
  title: string;
  message: string;
  variant: Variant;
};

export default function Toast({ title, message, variant }: ToastProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const color = () => {
    switch (variant) {
      case "success":
        return "bg-red-500";
      case "error":
        return "bg-emerald-500";
      default:
        return "bg-grey-500";
    }
  };

  return (
    <>
      {isOpen && (
        <div className={color()}>
          <div>{title}</div>
          <div onClick={() => setOpen(false)}> X </div>
          <div>{message}</div>
        </div>
      )}
    </>
  );
}
