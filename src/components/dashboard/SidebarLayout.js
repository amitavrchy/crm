import { MdOutlineDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();

  // Helper function to check if the link is active
  const isActive = (route) =>
    pathname === route
      ? "bg-[#d9f3ea] text-green-700"
      : "text-gray-800 hover:bg-[#d9f3ea]";

  // Define common menu items
  const commonMenuItems = [
    {
      href: "/dashboard",
      icon: <MdOutlineDashboard className="text-2xl mr-2" />,
      label: "Dashboard",
    },
    {
      href: "/",
      icon: <BiHomeAlt className="text-2xl mr-2" />,
      label: "Back to Home",
    },
  ];

  // Define menu items based on the current route
  const getMenuItems = () => {
    if (pathname.startsWith("/dashboard/vendor")) {
      return [
        ...commonMenuItems,
        // Add vendor-specific items here
      ];
    } else if (pathname.startsWith("/dashboard/client")) {
      return [
        ...commonMenuItems,
        {
          href: "/dashboard/client/postedJobs",
          icon: <MdOutlineDashboard className="text-2xl mr-2" />,
          label: "Posted Jobs",
        },
        {
          href: "/dashboard/client/completedJobsClient",
          icon: <MdOutlineDashboard className="text-2xl mr-2" />,
          label: "Completed Jobs Client",
        },
        {
          href: "/dashboard/client/paymentHistory",
          icon: <MdOutlineDashboard className="text-2xl mr-2" />,
          label: "Payment History",
        },
      ];
    } else if (pathname.startsWith("/dashboard/admin")) {
      return [
        ...commonMenuItems,
        // Add admin-specific items here
      ];
    } else if (pathname.startsWith("/dashboard/employee")) {
      return [
        ...commonMenuItems,
        {
          href: "/dashboard/employee/appliedJobs",
          icon: <MdOutlineDashboard className="text-2xl mr-2" />,
          label: "Applied Jobs",
        },
        {
          href: "/dashboard/employee/approvedJobs",
          icon: <MdOutlineDashboard className="text-2xl mr-2" />,
          label: "Approved Jobs",
        },
        {
          href: "/dashboard/employee/rejectedJobs",
          icon: <MdOutlineDashboard className="text-2xl mr-2" />,
          label: "Rejected Jobs",
        },
        {
          href: "/dashboard/employee/completedJobs",
          icon: <MdOutlineDashboard className="text-2xl mr-2" />,
          label: "Completed Jobs",
        },
      ];
    } else {
      return commonMenuItems;
    }
  };


  return (
    <nav
      id="sidebar"
      className={`lg:min-w-[250px] w-max max-lg:min-w-8 transition-all duration-500 ${isSidebarOpen ? "w-max" : "max-lg:w-0 max-lg:invisible"
        }`}
    >
      <div
        id="sidebar-collapse-menu"
        className="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99]"
      >
        <div className="pt-8 pb-2 px-6 sticky top-0 bg-white min-h-[80px] z-[100]">
          <button type="button" onClick={toggleSidebar}> </button>
        </div>
        <div className="py-6 px-6">
          <ul className="space-y-2">
            {getMenuItems().map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`menu-item text-sm flex items-center cursor-pointer rounded-md px-3 py-3 transition-all duration-300 ${isActive(
                    item.href
                  )}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;