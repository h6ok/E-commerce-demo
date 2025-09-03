import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";
import { KIDS_PRODUCT } from "../../consts/Products";

export default function Kids() {
  const childProps = {
    content: KIDS_PRODUCT,
    title: "Kids",
  } as SlideProps<ProductImgProps>;

  return (
    <div className="w-full flex-col items-center">
      <div>
        <Slide {...childProps} />
      </div>
    </div>
  );
}
