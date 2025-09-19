import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";
import { useEffect } from "react";
import { Get } from "../../util/Http";
import { END_POINT } from "../../consts/Const";
import useRootState from "../../hooks/useState";

export default function Women() {
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
    content: products.filter((p) => p.category === "women"),
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
