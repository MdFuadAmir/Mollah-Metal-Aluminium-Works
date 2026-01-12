import Loading from "../../../../Components/Loading/Loading";
import useRole from "../../../../Hooks/useRole";
import AdminDashboard from "../../Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "../../User/UserDashboard/UserDashboard";

const DashboardForAll = () => {
  const [role, roleLoading] = useRole();
  if (roleLoading) {
    return <Loading />;
  }
  return (
    <div>
      {role === "admin" && <AdminDashboard />}
      {role === "moderator" && <AdminDashboard/>}
      {role === "user" && <UserDashboard />}
    </div>
  );
};

export default DashboardForAll;
