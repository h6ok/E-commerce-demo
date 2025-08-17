import { useContext } from "react";
import { ToastContext, type Variant } from "../context/ToastContext";

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("context must not be null");
  }

  const { setOpen, setTitle, setMessage, setVariant } = context;

  const showToast = (title: string, message: string, variant: Variant) => {
    setOpen(true);
    setTitle(title);
    setMessage(message);
    setVariant(variant);
  };

  return showToast;
}
