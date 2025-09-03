import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";
import { WOMENS_PRODUCT } from "../../consts/Products";

export default function Women() {
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
