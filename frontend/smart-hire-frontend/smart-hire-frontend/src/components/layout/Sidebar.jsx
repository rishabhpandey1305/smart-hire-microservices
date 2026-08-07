import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Candidates",
      path: "/candidates",
      icon: <FaUsers />,
    },
    {
      name: "Applications",
      path: "/applications",
      icon: <FaFileAlt />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  function handleLogout() {

    logout();

    toast.success(
      "Logged out successfully."
    );

    navigate("/login");

  }

  return (
    <aside
      className={`
        fixed
        top-16
        left-0
        h-[calc(100vh-4rem)]
        w-64
        bg-white
        border-r
        shadow-lg
        transform
        transition-transform
        duration-300
        z-40

        ${sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"}

        md:translate-x-0
      `}
    >
      <div className="p-5 text-xl font-bold border-b">
        Menu
      </div>

      <nav className="p-4 space-y-2">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            onClick={() =>
              setSidebarOpen(false)
            }
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>

        ))}

      </nav>

      <div className="absolute bottom-6 w-full px-4">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;