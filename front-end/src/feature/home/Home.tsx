import Banner from "../../components/Banner";
import HomeBanner from "./../../assets/banner.png";

export default function Home() {
  return (
    <>
      <Banner path={HomeBanner} alt="home banner image" />
      <div>this is home page</div>
    </>
  );
}
