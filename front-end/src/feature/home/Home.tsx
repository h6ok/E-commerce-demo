import Banner from "../../components/Banner";
import HomeBanner from "./../../assets/banner.png";
import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";
import { useEffect } from "react";
import { END_POINT } from "../../consts/Const";
import { Get } from "../../util/Http";
import useRootState from "../../hooks/useState";

export default function Home() {
  const { products, setProducts } = useRootState();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });

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
  }, []);

  const mensProducts = {
    content: products.filter((p) => p.category === "men"),
    title: "Product",
    displayCategory: true,
    linkTo: "men",
    linkLabel: "see more men's items...",
  } as SlideProps<ProductImgProps>;

  const womensProducts = {
    content: products.filter((p) => p.category === "women"),
    displayCategory: true,
    linkTo: "women",
    linkLabel: "see more women's items...",
  } as SlideProps<ProductImgProps>;

  const kidsProducts = {
    content: products.filter((p) => p.category === "kids"),
    displayCategory: true,
    linkTo: "kids",
    linkLabel: "see more kids items...",
  } as SlideProps<ProductImgProps>;

  return (
    <div className="w-full flex-col items-center">
      <Banner path={HomeBanner} alt="home banner image" />
      <div className="pt-20">
        <Slide isHome {...mensProducts} />
        <Slide isHome {...womensProducts} />
        <Slide isHome {...kidsProducts} />
      </div>
    </div>
  );
}
