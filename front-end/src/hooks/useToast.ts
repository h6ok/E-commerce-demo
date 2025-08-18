import { useContext } from "react";
import { ToastContext, type Variant } from "../context/ToastContext";

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("context must not be null");
  }

  const { setOpen, setTitle, setMessage, setVariant } = context;

  const showToast = (title: string, message: string, variant: Variant) => {
    setTitle(title);
    setMessage(message);
    setVariant(variant);
    setOpen(true);
    console.log("showToast");
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return showToast;
}
