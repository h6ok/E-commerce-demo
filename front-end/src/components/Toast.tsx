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

  const color = () => {
    switch (variant) {
      case "error":
        return "bg-red-500 rounded w-70 text-white absolute top-50 left-20";
      case "success":
        return "bg-emerald-500 rounded w-70 absolute top-50 left-20";
      default:
        return "bg-grey-500";
    }
  };

  return (
    <div className="fixed z-500">
      <div className={color()}>
        <div className="p-5 flex flex-col items-center justify-center">
          <div className="text-2xl mb-5">{title}</div>
          <div className="text-xl">{message}</div>
        </div>
      </div>
    </div>
  );
}
