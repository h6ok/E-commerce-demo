import { createContext, useState } from "react";
import Toast from "../components/Toast";

type Variant = "success" | "error" | "info";

type ToastState = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  title: string;
  setTitle: (title: string) => void;
  message: string;
  setMessage: (message: string) => void;
  variant: Variant;
  setVariant: (variant: Variant) => void;
};

const ToastContext = createContext<ToastState | null>(null);

function ToastProvider(props: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<Variant>("info");

  const toastContext = {
    isOpen,
    setOpen,
    title,
    setTitle,
    message,
    setMessage,
    variant,
    setVariant,
  };

  return (
    <ToastContext.Provider value={toastContext}>
      {isOpen && <Toast title={title} message={message} variant={variant} />}
      {props.children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider };
export type { Variant };
