import { useEffect } from "react";
import type { ProductImgProps } from "../../components/ProductImg";
import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import { MENS_PRODUCT } from "../../consts/Products";
import useRootState from "../../hooks/useState";
import { END_POINT } from "../../consts/Const";
import { Get } from "../../util/Http";

export default function Men() {
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
    content: products.filter((p) => p.category === "men"),
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
