
import Link from "next/link";
import DarkLightSwitch from "./DarkLightSwitch";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary dark:bg-dark shadow-md">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Link href='/' className="flex items-center">
            <p className="text-xl md:text-2xl font-bold text-white" 
               title="Cricketden" 
               aria-label="site-logo">
              Cricket<span className="text-accent-light">den</span>
            </p>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/90">
            <Link href="/Blogs" className="hover:text-accent-light transition-colors duration-200">
              Blogs
            </Link>
            <Link href="/ipl2025/matches" className="hover:text-accent-light transition-colors duration-200">
              IPL 2025
            </Link>
            <Link href="/champions-trophy-2025" className="hover:text-accent-light transition-colors duration-200">
              Champions Trophy
            </Link>
          </div>
          <div className="flex items-center">
            <DarkLightSwitch />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
