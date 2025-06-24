
import Link from "next/link";
import DarkLightSwitch from "./DarkLightSwitch";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800 shadow-sm">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href='/' className="flex items-center group">
            <div className="relative">
              <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white transition-colors" 
                 title="Cricketden" 
                 aria-label="site-logo">
                Cricket<span className="text-[#E63946] group-hover:text-[#ff4757] transition-colors">den</span>
              </p>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <Link href="/Blogs" className="hover:text-primary transition-colors duration-200">
              Blogs
            </Link>
            <Link href="/ipl2025/matches" className="hover:text-primary transition-colors duration-200">
              IPL 2025
            </Link>
            <Link href="/champions-trophy-2025" className="hover:text-primary transition-colors duration-200">
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
