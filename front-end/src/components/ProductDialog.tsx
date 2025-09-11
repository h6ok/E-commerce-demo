import { useState } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import ProductImg from "./ProductImg";
import type { ProductImgProps } from "./ProductImg";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useRootState from "../hooks/useState";
import useToast from "../hooks/useToast";

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
  onClose,
}: ProductDialogProps) {
  const [quantity, setQuantity] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useRootState();
  const showToast = useToast();

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
    if (!onClose) return;
    onClose(false);
  };

  const toSignUp = () => {
    navigate("/user");
  };

  const addCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: quantity,
    };
    setCartItems([...cartItems, item]);
    onClose(false);
    showToast("Done", "Check your cart items", "success");
  };

  const buttonClass = () => {
    if (quantity > 0) {
      return "mb-5 text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white";
    }
    return "mb-5 text-lg bg-gray-400 text-black";
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
              onClick={(e) => e.stopPropagation()}
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
                {isAuthenticated && (
                  <>
                    <div className="scale-200" onClick={subCount}>
                      <FiMinusCircle />
                    </div>
                    <div className="text-4xl font-bold pl-20 pr-20">
                      {quantity}
                    </div>
                    <div className="scale-200" onClick={addCount}>
                      <FiPlusCircle />
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center">
                {isAuthenticated && (
                  <button
                    className={buttonClass()}
                    onClick={addCart}
                    disabled={quantity === 0}
                  >
                    Add Cart
                  </button>
                )}
                {!isAuthenticated && (
                  <button
                    className="mb-5 text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
                    onClick={toSignUp}
                  >
                    Sign Up To Purchase
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
