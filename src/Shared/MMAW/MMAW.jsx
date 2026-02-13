import { Link } from "react-router";
import logo from "../../assets/mmaw.png";

const MMAW = () => {
  return (
    <Link to={"/"} className=" flex lg:justify-center">
      <img src={logo} className="w-16" />
    </Link>
  );
};

export default MMAW;
