import IPLHeader from "@/components/IPLHeader";
import Link from "next/link";
import { IoBarChart, IoCalendar, IoTrophy } from "react-icons/io5";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <IPLHeader />
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1 py-4">            <Link
              href="/ipl2024"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 bg-blue-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <IoCalendar className="w-4 h-4" />
              Matches
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
            </Link>
              <Link
              href="/ipl2024/table"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transform hover:-translate-y-0.5"
            >
              <IoTrophy className="w-4 h-4" />
              Points Table
            </Link>
              <Link
              href="/ipl2024/stats"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transform hover:-translate-y-0.5"
            >
              <IoBarChart className="w-4 h-4" />
              Stats
            </Link>
          </nav>
        </div>
      </div>

      {children}
    </section>
  );
}
