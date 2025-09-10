import Banner from "../../components/Banner";
import HomeBanner from "./../../assets/banner.png";
import { PRODUCTS } from "../../consts/Products";
import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  });

  const mensProducts = {
    content: PRODUCTS.filter((p) => p.category === "men"),
    title: "Product",
    displayCategory: true,
    linkTo: "men",
    linkLabel: "see more men's items...",
  } as SlideProps<ProductImgProps>;

  const womensProducts = {
    content: PRODUCTS.filter((p) => p.category === "women"),
    displayCategory: true,
    linkTo: "women",
    linkLabel: "see more women's items...",
  } as SlideProps<ProductImgProps>;

  const kidsProducts = {
    content: PRODUCTS.filter((p) => p.category === "kids"),
    displayCategory: true,
    linkTo: "kids",
    linkLabel: "see more kids items...",
  } as SlideProps<ProductImgProps>;

  return (
    <div className="w-full flex-col items-center">
      <Banner path={HomeBanner} alt="home banner image" />
      <div className="pt-20">
        <Slide {...mensProducts} />
        <Slide {...womensProducts} />
        <Slide {...kidsProducts} />
      </div>
    </div>
  );
}
