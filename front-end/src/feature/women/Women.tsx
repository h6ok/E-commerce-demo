import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";
import { WOMENS_PRODUCT } from "../../consts/Products";
import { useEffect } from "react";

export default function Women() {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  });

  const childProps = {
    content: WOMENS_PRODUCT,
    title: "Women",
  } as SlideProps<ProductImgProps>;

  return (
    <div className="w-full flex-col items-center">
      <div>
        <Slide {...childProps} />
      </div>
    </div>
  );
}
