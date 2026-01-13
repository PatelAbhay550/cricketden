import SA20Header2026 from "@/components/SA20Header2026";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <section>
      <SA20Header2026 />
      <div className="options flex w-full mx-auto py-4 px-4 gap-4">
        <Link
          href="/sa20-2026"
          className="bg-primary text-white font-bold text-xl px-3 py-1.5 rounded-lg hover:bg-primary/90 transition"
        >
          Matches
        </Link>
        <Link
          href="/sa20-2026/table"
          className="bg-primary text-white font-bold text-xl px-3 py-1.5 rounded-lg hover:bg-primary/90 transition"
        >
          Points Table
        </Link>
      </div>
      {children}
    </section>
  );
}
