import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";



// Fetch blogs server-side
export async function getBlogs() {
  const blogsRef = collection(db, "allblogs");
  const q = query(blogsRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

const Blogs = async () => {
  const blogs = await getBlogs();

  // Helper function to truncate text
  const truncate = (text, length) => {
    if (text.length > length) {
      return `${text.slice(0, length)}...`;
    }
    return text;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog-card bg-white shadow-md rounded-lg overflow-hidden "
        >
          <Link href={`/Blogs/${blog.slug}`}>
            <div className="relative w-full h-48">
              <img
                src={blog.coverimage}
                alt={blog.title}
               
                className="rounded-t-lg w-[400px] h-[250px] aspect-square overflow-hidden object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">{blog.category}</p>
              <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {truncate(blog.desc || "No description available.", 100)}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                {new Date(blog.timestamp.seconds * 1000).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
