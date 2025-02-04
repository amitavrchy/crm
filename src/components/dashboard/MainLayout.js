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
import AppliedJobs from "./Employee/AppliedJobs";
import ApprovedJobs from "./Employee/ApprovedJobs";
import RejectedJobs from "./Employee/RejectedJobs";
import CompletedJobs from "./Employee/CompletedJobs";
import PostedJobs from "./Client/PostedJobs";
import CompletedJobsClient from "./Client/CompletedJobsClient";
import PaymentHistory from "./Client/PaymentHistory";
import UserManagement from "./Admin/UserManagement";
import JobManagement from "./Admin/JobManagement";
import ReportsAnalytics from "./Admin/ReportAnalytics";
import JobManagementV from "./Vendor/JobManagement";
import EmployeeManagement from "./Vendor/EmployeeManagement";
import ReportsAnalyticsV from "./Vendor/ReportsAnalytics";
import JobApplyManagement from "./Employee/JobApplyManagement";
import JobHistory from "./Employee/JobHistory";
import ProfileManagement from "./Employee/ProfileManagement";
import JobManagementC from "./Client/JobManagement";
import VendorInteraction from "./Client/VendorInteraction";
import JobHistoryReports from "./Client/JobHistoryReports";


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
            {pathname === "/dashboard/client/completedJobsClient" && <CompletedJobsClient />}
            {pathname === "/dashboard/client/paymentHistory" && <PaymentHistory />}
            {pathname === "/dashboard/client/jobManagement" && <JobManagementC />}
            {pathname === "/dashboard/client/vendorInteraction" && <VendorInteraction />}
            {pathname === "/dashboard/client/jobHistoryReports" && <JobHistoryReports />}

            {pathname === "/dashboard/vendor" && <Vendor />}
            {pathname === "/dashboard/vendor/jobManagement" && <JobManagementV />}
            {pathname === "/dashboard/vendor/employeeManagement" && <EmployeeManagement />}
            {pathname === "/dashboard/vendor/reportsAnalytics" && <ReportsAnalyticsV />}

            {pathname === "/dashboard/admin" && <Admin />}
            {pathname === "/dashboard/admin/userManagement" && <UserManagement />}
            {pathname === "/dashboard/admin/jobManagement" && <JobManagement />}
            {pathname === "/dashboard/admin/reportsAnalytics" && <ReportsAnalytics />}

            {pathname === "/dashboard/employee" && <Employee />}
            {pathname === "/dashboard/employee/appliedJobs" && <AppliedJobs />}
            {pathname === "/dashboard/employee/approvedJobs" && <ApprovedJobs />}
            {pathname === "/dashboard/employee/rejectedJobs" && <RejectedJobs />}
            {pathname === "/dashboard/employee/completedJobs" && <CompletedJobs />}
            {pathname === "/dashboard/employee/jobApplyManagement" && <JobApplyManagement />}
            {pathname === "/dashboard/employee/jobHistory" && <JobHistory />}
            {pathname === "/dashboard/employee/profileManagement" && <ProfileManagement />}
          </div>

        </section>
      </div>
    </div>
  );
};

export default MainLayout;
