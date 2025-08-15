import Banner from "../../components/Banner";
import HomeBanner from "./../../assets/banner.png";

export default function Home() {
  return (
    <div className="w-full flex-col items-center">
      <Banner path={HomeBanner} alt="home banner image" />
      <div>this is home page</div>
    </div>
  );
}
