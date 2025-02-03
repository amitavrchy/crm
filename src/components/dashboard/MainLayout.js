// app/layout.js or a similar layout component

'use client'
import { useState } from "react";
import { usePathname } from "next/navigation"; // usePathname hook for Next.js 13+
import Sidebar from "./SidebarLayout";
import Header from "./HeaderLayout";
import Dashboard1 from "./layouts/Dashboard1";
import Client from "./Client";
import Vendor from "./Vendor";
import Admin from "./Admin";
import Employee from "./Employee";
import AppliedJobs from "./AppliedJobs";
import ApprovedJobs from "./ApprovedJobs";
import RejectedJobs from "./RejectedJobs";
import CompletedJobs from "./CompletedJobs";
import PostedJobs from "./PostedJobs";


const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const pathname = usePathname();  // usePathname instead of useRouter()

  return (
    <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Sidebar toggle button */}
        <button
          id="toggle-sidebar"
          onClick={toggleSidebar}
          className="lg:hidden w-8 h-8 z-[100] fixed top-[36px] left-[10px] cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full outline-none transition-all duration-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-3 h-3" viewBox="0 0 55.752 55.752">
            <path d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z" />
          </svg>
        </button>

        {/* Main Content */}
        <section className="main-content w-full px-8">
          <Header toggleDropdown={toggleDropdown} isDropdownOpen={isDropdownOpen} />

          {/* Content based on route */}
          <div className="mt-8">
            {pathname === "/dashboard" && <Dashboard1 />}

            {pathname === "/dashboard/client" && <Client />}
            {pathname === "/dashboard/client/postedJobs" && <PostedJobs />}

            {pathname === "/dashboard/vendor" && <Vendor />}

            {pathname === "/dashboard/admin" && <Admin />}

            {pathname === "/dashboard/employee" && <Employee />}
            {pathname === "/dashboard/employee/appliedJobs" && <AppliedJobs />}
            {pathname === "/dashboard/employee/approvedJobs" && <ApprovedJobs />}
            {pathname === "/dashboard/employee/rejectedJobs" && <RejectedJobs />}
            {pathname === "/dashboard/employee/completedJobs" && <CompletedJobs />}
          </div>

        </section>
      </div>
    </div>
  );
};

export default MainLayout;
