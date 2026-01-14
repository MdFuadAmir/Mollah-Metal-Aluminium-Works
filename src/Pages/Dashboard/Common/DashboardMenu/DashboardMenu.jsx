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
            ? "text-md font-semibold text-orange-500 underline"
            : "text-white text-md  hover:text-orange-500 hover:underline"
        }
      >
        {Icon && <Icon className="text-lg" />} {labal}
      </NavLink>
    </li>
  );
};

export default DashboardMenu;