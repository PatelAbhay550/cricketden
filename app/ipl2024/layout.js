import IPLHeader from "@/components/IPLHeader";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <IPLHeader />
      <div className="options flex w-full mx-auto py-4 px-4 gap-4">
        <Link
          href="/ipl2024"
          className="bg-blue-500 text-white font-bold text-xl px-2 py-1 rounded-lg"
        >
          Matches
        </Link>
        <Link
          href="/ipl2024/table"
          className="bg-blue-500 text-white font-bold text-xl px-2 py-1 rounded-lg"
        >
          Points Table
        </Link>
        <Link
          href="/ipl2024/stats"
          className="bg-blue-500 text-white font-bold text-xl px-2 py-1 rounded-lg"
        >
          Stats
        </Link>
      </div>
      {children}
    </section>
  );
}
