import SA20Header from "@/components/SA20Header";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <SA20Header />
      <div className="options flex w-full mx-auto py-4 px-4 gap-4">
        <Link
          href="/sa20-2025"
          className="bg-blue-500 text-white font-bold text-xl px-2 py-1 rounded-lg"
        >
          Matches
        </Link>
        <Link
          href="/sa20-2025/table"
          className="bg-blue-500 text-white font-bold text-xl px-2 py-1 rounded-lg"
        >
          Points Table
        </Link>
      </div>
      {children}
    </section>
  );
}
