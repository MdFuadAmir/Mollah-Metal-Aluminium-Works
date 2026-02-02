import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";

const RoleGuard = ({ allow, children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole(); // ✅ object destructuring
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allow.includes(role)) {
    return children;
  }

  return <Navigate to="/forbidden" state={{ from: location }} replace />;
};

export default RoleGuard;
