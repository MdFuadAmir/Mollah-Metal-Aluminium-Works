import {
  FaUsersCog,
  FaPlusSquare,
  FaBoxOpen,
  FaCheckCircle,
  FaFileInvoice,
  FaChevronDown,
  FaUserShield,
  FaUsers,
  FaShoppingBag,
  FaHourglassHalf,
  FaCogs,
  FaTruck,
  FaUndoAlt,
  FaTimesCircle,
} from "react-icons/fa";
import DashboardMenu from "../../Common/DashboardMenu/DashboardMenu";
import { useState } from "react";

const AdminMenu = ({ closeSidebar }) => {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  return (
    <div className="space-y-2">
      <div>
        {/* Parent Button */}
        <button
          onClick={() => setOpenA(!openA)}
          className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md"
        >
          <span className="flex items-center gap-2">
            <FaUsersCog />
            User Management
          </span>

          <FaChevronDown
            className={`transition-transform duration-200 ${
              openA ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Child Menus */}
        {openA && (
          <div className="ml-6 mt-1 space-y-1">
            <DashboardMenu
              labal={"Admin & Moderators"}
              to={"/dashboard/manage-admin&moderators"}
              icon={FaUserShield}
              onClick={closeSidebar}
            />

            <DashboardMenu
              labal={"Manage Users"}
              to={"/dashboard/manage-users"}
              icon={FaUsers}
              onClick={closeSidebar}
            />
          </div>
        )}
      </div>
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
      <div>
        <button
          onClick={() => setOpenB(!openB)}
          className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md"
        >
          <span className="flex items-center gap-2">
            <FaShoppingBag />
            Orders Management
          </span>

          <FaChevronDown
            className={`transition-transform duration-200 ${
              openB ? "rotate-180" : ""
            }`}
          />
        </button>
        {openB && (
          <div className="ml-6 mt-1 space-y-1">
            <DashboardMenu
              labal={"Pending Orders"}
              to={"/dashboard/pending-orders"}
              icon={FaHourglassHalf}
              onClick={closeSidebar}
            />
            <DashboardMenu
              labal={"Processing Orders"}
              to={"/dashboard/processing-orders"}
              icon={FaCogs}
              onClick={closeSidebar}
            />
            <DashboardMenu
              labal={"Shipped Orders"}
              to={"/dashboard/shipped-orders"}
              icon={FaTruck}
              onClick={closeSidebar}
            />
            <DashboardMenu
              labal={"Delivered Orders"}
              to={"/dashboard/delivered-orders"}
              icon={FaCheckCircle}
              onClick={closeSidebar}
            />
            <DashboardMenu
              labal={"Cancelled Orders"}
              to={"/dashboard/cancelled-orders"}
              icon={FaTimesCircle}
              onClick={closeSidebar}
            />
            <DashboardMenu
              labal={"Returned Orders"}
              to={"/dashboard/returned-orders"}
              icon={FaUndoAlt}
              onClick={closeSidebar}
            />
          </div>
        )}
      </div>

      <DashboardMenu
        labal={"All Receipts"}
        to={"/dashboard/all-receipts"}
        icon={FaFileInvoice}
        onClick={closeSidebar}
      />
    </div>
  );
};

export default AdminMenu;
