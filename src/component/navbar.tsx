import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  label: string;
  current: boolean;
}

const NavLink: FC<NavLinkProps> = ({ to, label, current }) => (
  <Link
    to={to}
    className={`px-4 py-3 rounded-lg text-sm font-medium w-full flex items-center gap-3 transition-all duration-200 ${
      current
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-indigo-500/20 hover:text-black"
    }`}
  >
    <span>{label}</span>
  </Link>
);

const Navbar: FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/homedash", label: "Dashboard" },
    { path: "/media", label: "Media" },
    { path: "/reports", label: "Reports" },
    { path: "/alerts", label: "Alerts Management" },
    { path: "/clipUpload", label: "Clip Upload" },
    { path: "/workspace", label: "Workspace" },
    { path: "/support", label: "Support" },
    
  ];

  return (
    <div className="w-64 bg-gray-100 p-4 shadow-lg h-screen flex flex-col">
      <div className="py-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            label={link.label}
            current={location.pathname === link.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
