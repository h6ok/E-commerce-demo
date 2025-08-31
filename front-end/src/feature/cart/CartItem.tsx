import ProductIcon from "../../assets/product.png";

export type CartItemProps = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

export function CartItem({ id, name, unitPrice, quantity }: CartItemProps) {
  return (
    <div id={id} className="flex rounded-lg bg-gray-200 pr-5 shadow-xl mb-10">
      <div className="transition hover:-translate-y-1 cursor-pointer">
        <img className="scale-75 z-0" src={ProductIcon} />
      </div>
      <div className=" pl-6 flex flex-col justify-center">
        <div>
          <p className="border-b-black">{`product name: ${name}`}</p>
        </div>
        <p className="border-b-black pt-5">{`unit price: ${unitPrice}`}</p>
        <p className="border-b-black pt-5">{`quantity: ${quantity}`}</p>
      </div>
    </div>
  );
}
