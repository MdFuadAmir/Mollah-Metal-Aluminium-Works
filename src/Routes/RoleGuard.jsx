import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";

const RoleGuard = ({ allow, children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();
  // loading state
  if (loading || roleLoading) {
    return <Loading />;
  }
  // not logged in
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  if (allow.includes(role)) {
    return children;
  }

  return (
    <Navigate to="/forbidden" state={{ from: location }} replace />
  );
};

export default RoleGuard;
