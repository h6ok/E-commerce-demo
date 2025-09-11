import ProductIcon from "../../assets/product.png";
import { MdDeleteForever } from "react-icons/md";

export type CartItemProps = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  onDelete: (id: string) => void;
};

export function CartItem({
  id,
  name,
  unitPrice,
  quantity,
  onDelete,
}: CartItemProps) {
  const handleDelete = () => {
    onDelete(id);
  };

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
      <div className="ml-5 w-15 flex items-center justify-center">
        <div
          className="text-4xl transition hover:-translate-y-1 cursor-pointer"
          onClick={handleDelete}
        >
          <MdDeleteForever />
        </div>
      </div>
    </div>
  );
}
