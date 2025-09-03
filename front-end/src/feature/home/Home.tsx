import Banner from "../../components/Banner";
import HomeBanner from "./../../assets/banner.png";
import { PRODUCTS } from "../../consts/Products";
import Slide from "../../components/Slide";
import type { SlideProps } from "../../components/Slide";
import type { ProductImgProps } from "../../components/ProductImg";

export default function Home() {
  const childProps = {
    content: PRODUCTS,
    title: "Product",
  } as SlideProps<ProductImgProps>;

  return (
    <div className="w-full flex-col items-center">
      <Banner path={HomeBanner} alt="home banner image" />
      <div className="pt-20">
        <Slide {...childProps} />
      </div>
    </div>
  );
}
