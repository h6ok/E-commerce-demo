import { useContext } from "react";
import { ToastContext, type Variant } from "../context/ToastContext";

type ToastProps = {
  title: string;
  message: string;
  variant: Variant;
};

export default function Toast({ title, message, variant }: ToastProps) {
  const context = useContext(ToastContext);
  if (!context) {
    Toast({ title, message, variant });
    return;
  }
  const { setOpen } = context;

  const color = () => {
    switch (variant) {
      case "error":
        return "bg-red-500";
      case "success":
        return "bg-emerald-500";
      default:
        return "bg-grey-500";
    }
  };

  return (
    <div className={color()}>
      <div>{title}</div>
      <div onClick={() => setOpen(false)}> X </div>
      <div>{message}</div>
    </div>
  );
}
