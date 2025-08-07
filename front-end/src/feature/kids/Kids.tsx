import Banner from "../../components/Banner";
import KidsBanner from "./../../assets/Kids.png";

export default function Kids() {
  return (
    <>
      <Banner path={KidsBanner} alt="kids banner image" />
      <div>this is kids page</div>
    </>
  );
}
