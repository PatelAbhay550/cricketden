import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo text-2xl font-bold">
          <Link href="/">
            <span className="text-accent">Cricket</span>den
          </Link>
        </div>
        <div className="options">
          <ul className="flex items-center gap-5 ">
            <Link className="hover:text-accent" href="/players">
              <li>Players</li>
            </Link>
            <Link className="hover:text-accent" href="/privacy">
              <li>Privacy Policy</li>
            </Link>
            <Link className="hover:text-accent" href="/ContactUs">
              <li>Contact Us</li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
