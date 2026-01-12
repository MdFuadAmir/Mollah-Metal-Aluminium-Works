import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";

const Private = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location?.pathname }}
        replace
      ></Navigate>
    );
  }
  return children;
};

export default Private;
