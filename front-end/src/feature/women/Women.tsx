import Banner from "../../components/Banner";
import WomensBanner from "./../../assets/Women.png";

export default function Women() {
  return (
    <>
      <Banner path={WomensBanner} alt="women banner image" />
      <div>this is womens page</div>
    </>
  );
}
