import IPLHeader from "@/components/IPLHeader";
import Link from "next/link";
import { IoBarChart, IoCalendar, IoTrophy } from "react-icons/io5";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <IPLHeader />
      
      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1 py-4">
            <Link
              href="/ipl2024"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 bg-primary text-white shadow-md hover:bg-primary/90"
            >
              <IoCalendar className="w-4 h-4" />
              Matches
            </Link>
            <Link
              href="/ipl2024/table"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10"
            >
              <IoTrophy className="w-4 h-4" />
              Points Table
            </Link>
            <Link
              href="/ipl2024/stats"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10"
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
