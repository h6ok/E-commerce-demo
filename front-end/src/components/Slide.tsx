import type { ProductImgProps } from "./ProductImg";
import ProductImg from "./ProductImg";

export type SlideProps<T> = {
  content: T[];
  title: string;
};

export default function Slide({ content, title }: SlideProps<ProductImgProps>) {
  return (
    <>
      <div className="text-4xl flex items-center justify-center pt-10">
        <div className="border-b-4 border-double"> {title} </div>
      </div>
      <div className="w-0.8 flex items-center justify-center pt-15">
        <div className="grid grid-cols-3 gap-30 pb-20">
          {content.map((c) => (
            <ProductImg {...c} />
          ))}
        </div>
      </div>
    </>
  );
}
