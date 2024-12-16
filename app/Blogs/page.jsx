import Blogs, { getBlogs } from "@/components/Blogs";
import Link from "next/link";


export const metadata = {
  title: "CricketDen Blogs - Latest Cricket Blogs and Analysis",
  description: "Read the latest cricket blogs and analysis on CricketDen. Stay updated with the latest cricket news, match previews, and more.",
  openGraph: {
  images: [
     "https://firebasestorage.googleapis.com/v0/b/myblog-65oq23.appspot.com/o/for-cricket-den%2Fblogs%20page.png?alt=media&token=5ee21d06-aa48-464c-ad5b-c833d01c3f34"],}
    
};

const page = async () => {
  const blogs = await getBlogs();
  console.log(blogs)
  const featuredblog = blogs[0];
  
  
    // Helper function to truncate text
    const truncate = (text, length) => {
      if (text.length > length) {
        return `${text.slice(0, length)}...`;
      }
      return text;
    };
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="blog px-4 md:px-20 mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-600">
        CricketDen Blogs - Latest Cricket Blogs and Analysis
        </h1>
        <p className="text-gray-600 mt-2">
        Read the latest cricket blogs and analysis on CricketDen. Stay updated with the latest cricket news, match previews, and more. 
        </p>
      </div>
      <div className="main px-2 flex flex-col items-center justify-center mt-4">
        {/* Featured Section */}
        <div className="featured px-3 w-full md:w-[70vw] bg-white shadow-md rounded-lg flex flex-col md:flex-row items-center overflow-hidden">
          <div className="imgarea flex w-full md:w-1/2">
            <img
              className="w-full md:w-3/4 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              src={featuredblog.coverimage}
              alt="ind-vs-aus"
            />
          </div>
          <div className="textarea w-full md:w-1/2 p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2">
              {featuredblog.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {truncate(featuredblog.desc || "No description available.", 200)}
            </p>
            <Link href={`/Blogs/${featuredblog.slug}`}>
            <button className="btn px-4 py-2 text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              Read Full Story
            </button>
            </Link>
          </div>
        </div>
<h3 className="text-xl font-semibold mt-8 mb-4">Latest Cricket Blogs to Read</h3>
        {/* Other Blogs */}
        <div className="otherart mt-8 w-full px-4 md:px-20">
          <Blogs />
        </div>
      </div>
    </div>
  );
};

export default page;
