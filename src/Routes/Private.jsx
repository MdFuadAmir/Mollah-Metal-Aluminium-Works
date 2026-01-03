import { Navigate } from "react-router";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";

const Private = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default Private;
