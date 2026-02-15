import { Link, useNavigate } from "react-router";
import logo from "../../assets/mmaw.png";

const MMAW = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/"); 
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Link
      to="/"
      className="flex lg:justify-center"
      onClick={handleClick}
    >
      <img src={logo} className="w-16 cursor-pointer" />
    </Link>
  );
};

export default MMAW;
