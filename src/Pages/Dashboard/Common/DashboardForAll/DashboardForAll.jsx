import AdminDashboard from "../../Admin/AdminDashboard/AdminDashboard";
import UserDashboard from "../../User/UserDashboard/UserDashboard";


const DashboardForAll = () => {
    return (
        <div>
            <AdminDashboard/>
            <UserDashboard/>
        </div>
    );
};

export default DashboardForAll;