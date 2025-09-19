import { Link } from "react-router-dom";
import type { ProductImgProps } from "./ProductImg";
import ProductImg from "./ProductImg";

export type SlideProps<T> = {
  content: T[];
  title?: string;
  linkTo?: string;
  linkLabel?: string;
  displayCategory?: boolean;
  isHome?: boolean;
};

export default function Slide({
  content,
  title,
  displayCategory,
  linkTo,
  linkLabel,
  isHome,
}: SlideProps<ProductImgProps>) {
  const displayItem = isHome ? content.slice(0, 3) : content;

  return (
    <>
      <div className="text-4xl flex items-center justify-center pt-10">
        <div className="border-b-4 border-double"> {title} </div>
      </div>
      <div className="w-0.8 flex items-center justify-center pt-15">
        <div className="grid grid-cols-3 gap-30 pb-15">
          {displayItem.map((c) => (
            <ProductImg {...c} displayCategory={displayCategory} />
          ))}
        </div>
      </div>
      {linkTo && (
        <div className="text-xl flex justify-center items-center pb-10">
          <Link to={`/${linkTo}`}>{linkLabel}</Link>
        </div>
      )}
    </>
  );
}
