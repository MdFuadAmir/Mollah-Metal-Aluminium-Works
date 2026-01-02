import { FaShoppingBag } from "react-icons/fa";
import DashboardMenu from "../../Common/DashboardMenu/DashboardMenu";

const UserMenu = ({ closeSidebar }) => {
  return (
    <div className="space-y-2">
      <DashboardMenu
        labal={"My Orders"}
        to={"/dashboard/my-orders"}
        icon={FaShoppingBag}
        onClick={closeSidebar}
      />
      
    </div>
  );
};

export default UserMenu;
