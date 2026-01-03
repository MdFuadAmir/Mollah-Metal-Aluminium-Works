import { FaShoppingBag, FaHistory, FaTicketAlt, FaTruck } from "react-icons/fa";
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
      <DashboardMenu
        labal={"My Order History"}
        to={"/dashboard/my-order-history"}
        icon={FaHistory}
        onClick={closeSidebar}
      />
      <DashboardMenu
        labal={"My Vautchers"}
        to={"/dashboard/my-vautchers"}
        icon={FaTicketAlt}
        onClick={closeSidebar}
      />
      <DashboardMenu
        labal={"Tracking Orders"}
        to={"/dashboard/track"}
        icon={FaTruck}
        onClick={closeSidebar}
      />
    </div>
  );
};

export default UserMenu;
