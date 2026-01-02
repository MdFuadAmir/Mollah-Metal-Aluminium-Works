import { NavLink } from "react-router";

const DashboardMenu = ({ to, labal, icon: Icon, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) =>
          isActive
            ? "text-gray-500 font-semibold bg-gray-50"
            : "text-white font-bold"
        }
      >
        {Icon && <Icon className="text-lg" />} {labal}
      </NavLink>
    </li>
  );
};

export default DashboardMenu;