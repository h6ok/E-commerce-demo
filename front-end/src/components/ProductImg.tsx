import { useState } from "react";
import ProductIcon from "../assets/product.png";
import ProductDialog from "./ProductDialog";

export type ProductImgProps = {
  name: string;
  price: number;
  category: string;
  displayCategory?: boolean;
};

export default function ProductImg(props: ProductImgProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center shadow-xl rounded-lg bg-gray-200 pb-5">
        <div
          className="transition hover:-translate-y-1 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img className="scale-75 z-0" src={ProductIcon} />
        </div>
        <div className="text-center">{props.name}</div>
        <div className="text-center">{`$ ${props.price}`}</div>
        {props.displayCategory && <div>{props.category}</div>}
      </div>
      <ProductDialog product={props} open={open} />
    </>
  );
}
