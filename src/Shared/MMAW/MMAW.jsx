import { Link } from "react-router";
import logo from "../../assets/mmaw.png";

const MMAW = () => {
  return (
    <Link to={'/'}>
      <img src={logo} className="w-32 drop-shadow-red-900 drop-shadow-lg"/>
    </Link>
  );
};

export default MMAW;
