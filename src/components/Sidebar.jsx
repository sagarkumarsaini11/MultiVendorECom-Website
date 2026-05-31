import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiUserCheck,
  FiList,
} from "react-icons/fi";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
    isActive
      ? "bg-primary-600 text-white shadow-sm"
      : "text-slate-600 hover:bg-slate-100"
  }`;

export default function Sidebar({ type = "vendor" }) {
  const vendorLinks = [
    { to: "/vendor/dashboard", label: "Dashboard", icon: FiGrid },
    { to: "/vendor/products", label: "Products", icon: FiPackage },
    { to: "/vendor/orders", label: "Orders", icon: FiShoppingBag },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
    { to: "/admin/users", label: "Users", icon: FiUsers },
    { to: "/admin/vendors", label: "Vendors", icon: FiUserCheck },
    { to: "/admin/products", label: "Products", icon: FiPackage },
    { to: "/admin/orders", label: "Orders", icon: FiList },
  ];

  const links = type === "admin" ? adminLinks : vendorLinks;

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="card sticky top-24 p-3">
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {type === "admin" ? "Admin Panel" : "Vendor Panel"}
        </p>
        <nav className="flex flex-col gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass}>
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
