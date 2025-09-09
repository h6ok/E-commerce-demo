import { useState } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import ProductImg from "./ProductImg";
import type { ProductImgProps } from "./ProductImg";

type ProductDialogProps = {
  product: ProductImgProps;
  note?: string;
  open: boolean;
  onClick?: () => void;
  onClose?: (close: boolean) => void;
};

export default function ProductDialog({
  product,
  note,
  open,
  onClick,
  onClose,
}: ProductDialogProps) {
  const [quantity, setQuantity] = useState(0);

  const addCount = () => {
    const count = quantity;
    setQuantity(count + 1);
  };

  const subCount = () => {
    let count = quantity;
    if (count - 1 < 0) count = 1;
    setQuantity(count - 1);
  };

  const handleClose = () => {
    onClose(false);
  };

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {open && (
        <div
          onClick={handleClose}
          className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-150"
        >
          <div className="mt-20 h-150 w-200">
            <div
              onClick={stopPropagation}
              className="z-200 opacity-100 rounded-2xl bg-white"
            >
              <div className="h-20 text-center border-b-gray-200 border-b-2 text-4xl">
                <p className="pt-5">Detail</p>
              </div>
              <div className="pt-5 flex items-center justify-center">
                <ProductImg {...product} active={true} />
                <p className="pl-30"> Some explanations...</p>
              </div>
              <p>{note}</p>
              <div className="flex items-center justify-center mt-5 pb-5">
                <div className="scale-200" onClick={subCount}>
                  <FiMinusCircle />
                </div>
                <div className="text-4xl font-bold pl-20 pr-20">{quantity}</div>
                <div className="scale-200" onClick={addCount}>
                  <FiPlusCircle />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="mb-5 text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
                  onClick={onClick}
                >
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
