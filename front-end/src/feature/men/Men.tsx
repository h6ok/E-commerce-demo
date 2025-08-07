import Banner from "../../components/Banner";
import MensBanner from "./../../assets/Men.png";

export default function Men() {
  return (
    <>
      <Banner path={MensBanner} alt="men banner image" />
      <div>this is mens page</div>
    </>
  );
}
