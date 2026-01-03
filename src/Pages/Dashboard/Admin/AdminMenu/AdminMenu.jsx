import {
  FaUsersCog,
  FaPlusSquare,
  FaBoxOpen,
  FaClipboardList,
  FaCheckCircle,
  FaFileInvoice,
} from "react-icons/fa";
import DashboardMenu from "../../Common/DashboardMenu/DashboardMenu";

const AdminMenu = ({ closeSidebar }) => {
  return (
    <div className="space-y-2">
      <DashboardMenu
        labal={"Manage Users"}
        to={"/dashboard/manage-users"}
        icon={FaUsersCog}
        onClick={closeSidebar}
      />

      <DashboardMenu
        labal={"Add Products"}
        to={"/dashboard/add-products"}
        icon={FaPlusSquare}
        onClick={closeSidebar}
      />

      <DashboardMenu
        labal={"Our Products"}
        to={"/dashboard/our-products"}
        icon={FaBoxOpen}
        onClick={closeSidebar}
      />

      <DashboardMenu
        labal={"Manage Orders"}
        to={"/dashboard/manage-orders"}
        icon={FaClipboardList}
        onClick={closeSidebar}
      />

      <DashboardMenu
        labal={"Completed Orders"}
        to={"/dashboard/completed-orders"}
        icon={FaCheckCircle}
        onClick={closeSidebar}
      />

      <DashboardMenu
        labal={"All Vautchers"}
        to={"/dashboard/all-vautchers"}
        icon={FaFileInvoice}
        onClick={closeSidebar}
      />
    </div>
  );
};

export default AdminMenu;
