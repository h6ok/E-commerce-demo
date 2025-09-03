import ProductIcon from "../assets/product.png";

export type ProductImgProps = {
  name: string;
  price: number;
  category: string;
};

export default function ProductImg({ name, price, category }: ProductImgProps) {
  return (
    <div className="flex flex-col items-center justify-center shadow-xl rounded-lg bg-gray-200">
      <div className="transition hover:-translate-y-1 cursor-pointer">
        <img className="scale-75 z-0" src={ProductIcon} />
      </div>
      <div className="text-center">{name}</div>
      <div className="text-center">{`$ ${price}`}</div>
      <div>{category}</div>
    </div>
  );
}
