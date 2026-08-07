import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm flex items-center justify-between px-6 z-50">

      <div className="flex items-center gap-4">

        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={22} />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            SH
          </div>

          <span className="text-xl font-bold text-slate-800">
            SmartHire
          </span>
        </Link>

      </div>

      <div className="hidden md:flex items-center gap-6">

        <Link
          to="/jobs"
          className="hover:text-blue-600 transition"
        >
          Jobs
        </Link>

        <Link
          to="/applications"
          className="hover:text-blue-600 transition"
        >
          Applications
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-600 transition"
        >
          Profile
        </Link>

      </div>

      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </Link>

    </nav>
  );
}

export default Navbar;