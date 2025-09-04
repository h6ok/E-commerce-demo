import { useState } from "react";
import ProductImg from "./ProductImg";
import type { ProductImgProps } from "./ProductImg";

type ProductDialogProps = {
  product: ProductImgProps;
  note?: string;
  open: boolean;
};

export default function ProductDialog({
  product,
  note,
  open,
}: ProductDialogProps) {
  const [quantity, setQuantity] = useState(0);

  return (
    <>
      {open && (
        <div className="fixed w-full h-full bg-black opacity-25 z-150">
          <div className="flex justify-center items-center">
            <div className="rounded-2xl bg-white">
              <div className="text-center border-b-gray-200 border-b-2">
                Detail
              </div>
              <ProductImg {...product} />
              <p>{note}</p>
              <div>{quantity}</div>
              <button
                className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
                onClick={() => setQuantity(0)}
              >
                Add Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
