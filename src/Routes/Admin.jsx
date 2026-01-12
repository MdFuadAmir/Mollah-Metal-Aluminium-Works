import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";


const Admin = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (user && role === "admin") {
    return children;
  }

  return (
    <Navigate
      to="/forbidden"
      state={{ from: location?.pathname }}
      replace
    />
  );
};

export default Admin;
