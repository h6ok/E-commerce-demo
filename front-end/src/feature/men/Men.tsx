import { useEffect } from "react";
import type { ProductImgProps } from "../../components/ProductImg";
import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import { MENS_PRODUCT } from "../../consts/Products";

export default function Men() {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  });

  const childProps = {
    content: MENS_PRODUCT,
    title: "Men",
  } as SlideProps<ProductImgProps>;
  return (
    <div className="w-full flex-col items-center">
      <div>
        <Slide {...childProps} />
      </div>
    </div>
  );
}
