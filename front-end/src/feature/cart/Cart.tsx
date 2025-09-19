import { useEffect } from "react";
import type { CartItemProps } from "./CartItem";
import { CartItem } from "./CartItem";
import useRootState from "../../hooks/useState";
import useAuth from "../../hooks/useAuth";
import { Post } from "../../util/Http";
import { END_POINT } from "../../consts/Const";
import useToast from "../../hooks/useToast";

type CartInfo = {
  items: CartItemProps[];
};

export default function Cart() {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  });

  const { cartItems, setCartItems } = useRootState();
  const { userId, userEmail } = useAuth();
  const showToast = useToast();
  const info: CartInfo = {
    items: cartItems,
  };

  const totalAmount = cartItems.reduce((acc, cur) => {
    return acc + cur.unitPrice * cur.quantity;
  }, 0);

  const handleDelete = (id: string) => {
    const filtered = cartItems.filter((item) => item.id !== id);
    setCartItems(filtered);
  };

  const purchase = async () => {
    try {
      const resp = await Post<object>(END_POINT.PURCHASE, {
        userId,
        totalAmount,
        email: userEmail,
      });
      if (resp.status !== 200) {
        showToast("Error", resp.error.message, "error");
        return;
      }

      setCartItems([]);
      showToast("Success", "Thank you", "success");
    } catch (err) {
      console.log(err);
      showToast("Error", "Purchase failed", "error");
    }
  };

  return (
    <div className="size-full">
      <div className="min-h-80 w-full items-center justify-center flex flex-col">
        <div className="flex items-center justify-center w-full text-4xl pt-10">
          <div className="border-b-4 border-double">Cart Items</div>
        </div>
        <div className="min-h-50 items-center justify-center pt-20">
          {info.items.map((item) => (
            <CartItem {...item} onDelete={handleDelete} />
          ))}
        </div>
        {info.items.length > 0 ? (
          <>
            <div className="text-center text-2xl pt-5">{`total amount: ${totalAmount}`}</div>
            <div className="pt-10 pb-20 flex justify-center">
              <button
                className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
                onClick={purchase}
              >
                Purchase
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-2xl pt-5 pb-70"> No Items </div>
        )}
      </div>
    </div>
  );
}
