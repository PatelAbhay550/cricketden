
import Link from "next/link";
import DarkLightSwitch from "./DarkLightSwitch";

const Header = () => {
  return (
    <nav className="navbar flex items-center justify-between px-4 h-16  text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="le">
          <Link href='/' className="flex items-center ink">
            <p className="text-2xl font-bold" title="Cricketden" aria-label="site-logo">Cricket<span className="text-[#E63946]">den</span></p>
            </Link>
        </div>
        <div className="right">
            <DarkLightSwitch  />
        </div>
    </nav>
  )
}

export default Header
