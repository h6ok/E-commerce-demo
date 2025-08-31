import type { CartItemProps } from "./CartItem";
import { CartItem } from "./CartItem";

type CartInfo = {
  totalAmount: number;
  items: CartItemProps[];
};

export default function Cart() {
  const info: CartInfo = {
    totalAmount: 10000,
    items: [
      {
        id: "1",
        name: "product A",
        unitPrice: 1000,
        quantity: 10,
      },
      {
        id: "2",
        name: "product B",
        unitPrice: 1200,
        quantity: 3,
      },
    ],
  };

  return (
    <div className="size-full">
      <div className="min-h-80 w-full items-center justify-center flex flex-col">
        <div className="flex items-center justify-center w-full text-4xl pt-10">
          <div className="border-b-4 border-double">Cart Items</div>
        </div>
        <div className="items-center justify-center pt-20">
          {info.items.map((item) => (
            <CartItem {...item} />
          ))}
        </div>
        <div className="text-center text-2xl pt-5">{`total amount: ${info.totalAmount}`}</div>
        <div className="pt-10 pb-20 flex justify-center">
          <button
            className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
            onClick={() => console.log("check in")}
          >
            Check In
          </button>
        </div>
      </div>
    </div>
  );
}
