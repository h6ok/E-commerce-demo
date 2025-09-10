import { useState } from "react";
import ProductIcon from "../assets/product.png";
import ProductDialog from "./ProductDialog";

export type ProductImgProps = {
  id: number;
  name: string;
  price: number;
  category: string;
  displayCategory?: boolean;
  active?: boolean;
};

export default function ProductImg(props: ProductImgProps) {
  const [open, setOpen] = useState(false);

  const hoverClass = () => {
    const isActive = props?.active ?? false;
    if (isActive) {
      return "";
    }
    return "transition hover:-translate-y-1 cursor-pointer";
  };

  const handleOpen = () => {
    if (props?.active) return;
    setOpen(!open);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center shadow-xl rounded-lg bg-gray-200 pb-5">
        <div className={hoverClass()} onClick={handleOpen}>
          <img className="scale-75 z-0" src={ProductIcon} />
        </div>
        <div className="text-center">{props.name}</div>
        <div className="text-center">{`$ ${props.price}`}</div>
        {props.displayCategory && <div>{props.category}</div>}
      </div>
      <ProductDialog product={props} open={open} onClose={setOpen} />
    </>
  );
}
