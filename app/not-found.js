import { BiSolidCricketBall } from "react-icons/bi";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="bg-white shadow-md rounded-md p-6 max-w-md w-full">
        <BiSolidCricketBall className="text-6xl text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          Oops! It looks like the page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <p className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
            Go Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
}
