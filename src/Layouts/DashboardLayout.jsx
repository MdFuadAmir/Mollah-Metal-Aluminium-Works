import { Link, Outlet } from "react-router";
import bg from "../assets/bg-images/body.jpg";
import MMAW from "../Shared/MMAW/MMAW";
import { FaAlignJustify, FaSignOutAlt } from "react-icons/fa";
import AdminMenu from "../Pages/Dashboard/Admin/AdminMenu/AdminMenu";
import UserMenu from "../Pages/Dashboard/User/UserMenu/UserMenu";
import DashboardMenu from "../Pages/Dashboard/Common/DashboardMenu/DashboardMenu";
import { MdAssessment } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
const DashboardLayout = () => {
  const closeSidebar = () => {
    const drawer = document.getElementById("my-drawer-2");
    if (drawer) drawer.checked = false;
  };
  return (
    <div className="relative">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 " />
      </div>
      {/* main section */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Mobile Navbar */}
          <div className="navbar bg-black/50  sticky top-0 z-50 lg:hidden flex flex-row-reverse">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <FaAlignJustify size={20} className="text-white" />
            </label>
            <span className="mx-2 flex-1 text-green-600 font-semibold">
              <MMAW />
            </span>
          </div>

          <div className="flex flex-col justify-between">
            <div className="min-h-screen p-4 md:p-8">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-black/50 text-gray-300 min-h-full w-64 p-4 flex flex-col justify-between">
            {/* navber top */}
            <div>
              <MMAW />
              <div className="mt-6 space-y-2">
                <DashboardMenu
                  labal={"Dashboard"}
                  to={"/dashboard"}
                  icon={MdAssessment}
                  onClick={closeSidebar}
                />
                <AdminMenu closeSidebar={closeSidebar} />
                <UserMenu closeSidebar={closeSidebar} />
              </div>
            </div>
            {/* navber bottom */}
            <div className="bg-gray-700/50 p-4 rounded-lg space-y-2">
              <DashboardMenu
                labal={"Profile"}
                to={"/dashboard/profile"}
                icon={ImUserTie}
                onClick={closeSidebar}
              />
              <li>
                <Link
                  // onClick={handleLogOut}
                  className="flex font-bold items-center rounded gap-1 text-red-500"
                >
                  <FaSignOutAlt className="text-lg" /> LogOut
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
