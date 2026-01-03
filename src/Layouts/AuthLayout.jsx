import { Outlet } from "react-router";
import bg from "../assets/bg-images/body.jpg";
import Login from "../Authentication/Login/Login";
const AuthLayout = () => {
  return (
    <div className="relative">
        {/* background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"/>
      </div>
      {/* main */}
      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default AuthLayout;
