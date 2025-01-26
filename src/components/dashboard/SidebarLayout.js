import { MdOutlineDashboard } from "react-icons/md";
import { usePathname } from "next/navigation"; // Import usePathname hook
import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname(); // Get the current route

  // A helper function to check if the link is active
  const isActive = (route) =>
    pathname === route
      ? "bg-[#d9f3ea] text-green-700"
      : "text-gray-800 hover:bg-[#d9f3ea]";

  return (
    <nav
      id="sidebar"
      className={`lg:min-w-[250px] w-max max-lg:min-w-8 transition-all duration-500 ${
        isSidebarOpen ? "w-max" : "max-lg:w-0 max-lg:invisible"
      }`}
    >
      <div
        id="sidebar-collapse-menu"
        className="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99]"
      >
        <div className="pt-8 pb-2 px-6 sticky top-0 bg-white min-h-[80px] z-[100]">
          <button type="button" onClick={toggleSidebar}>
            {" "}
          </button>
        </div>
        <div className="py-6 px-6">
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className={`menu-item text-sm flex items-center cursor-pointer rounded-md px-3 py-3 transition-all duration-300 ${isActive(
                  "/dashboard"
                )}`}
              >
                <MdOutlineDashboard className="text-2xl mr-2" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <Link
                href="/"
                className={`menu-item text-sm flex items-center cursor-pointer rounded-md px-3 py-3 transition-all duration-300 ${isActive(
                  "/"
                )}`}
              >
                <BiHomeAlt className="text-2xl mr-2" />
                <span>Back to Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
