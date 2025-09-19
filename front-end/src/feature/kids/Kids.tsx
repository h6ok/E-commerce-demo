import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";
import { useEffect } from "react";
import { END_POINT } from "../../consts/Const";
import { Get } from "../../util/Http";
import useRootState from "../../hooks/useState";

export default function Kids() {
  const { products, setProducts } = useRootState();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });

    if (products.length === 0) {
      const baseUrl = END_POINT.PRODUCT;
      Get<ProductImgProps[]>(baseUrl)
        .then((resp) => {
          if (resp.status === 200) {
            setProducts(resp.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const childProps = {
    content: products.filter((p) => p.category === "kids"),
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
