import Blogs from "@/components/Blogs";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

// Use generateMetadata to fetch and set dynamic metadata
export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const blogsRef = collection(db, "allblogs");
  const q = query(blogsRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    // Handle case where no blog is found for the given slug
    return {
      title: "CricketDen Blogs - Cricket Blog Not Found",
      description: "The blog you were looking for could not be found.",
    };
  }

  const blog = querySnapshot.docs[0].data();
  const keywords = blog.tags?.join(", ") || "cricket, blogs, CricketDen";

  return {
    title: blog ? `${blog.title} - CricketDen` : "CricketDen Blogs - Latest Cricket Blogs and Analysis",
    description: blog
      ? truncate(blog.desc || "No description available.", 150)
      : "Read the latest cricket blogs and analysis on CricketDen. Stay updated with the latest cricket news, match previews, and more.",
    keywords, // Include keywords in metadata
    openGraph: {
      images: [blog.coverimage],
    },
  };
};

// Helper function to truncate text
const truncate = (text, length) => {
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }
  return text;
};

const BlogPage = async ({ params }) => {
  const { slug } = params;

  async function fetchBlogBySlug(slug) {
    const blogsRef = collection(db, "allblogs");
    const q = query(blogsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Return the first matching document
      return querySnapshot.docs[0].data();
    } else {
      throw new Error("Blog not found");
    }
  }

  async function fetchSuggestedBlogs(category) {
    const blogsRef = collection(db, "allblogs");
    const q = query(blogsRef, where("category", "==", category));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => doc.data())
      .filter((blog) => blog.slug !== slug); // Filter out the current blog
  }

  try {
    const blog = await fetchBlogBySlug(slug);
    const suggestedBlogs = await fetchSuggestedBlogs(blog.category); // Assuming each blog has a `category` field

    return (
      <div className="max-w-4xl mx-auto px-3 py-12 bg-gray-50 pb-20 min-h-screen">
        <script
          id={`json-ld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              image: blog.coverimage,
              datePublished: new Date(blog.timestamp.seconds * 1000).toISOString(),
              dateModified: new Date(blog.timestamp.seconds * 1000).toISOString(),
              author: [
                {
                  "@type": "Person",
                  name: blog.author, // Replace with the actual author name or fetch from blog data if available
                },
              ],
              publisher: {
                "@type": "Organization",
                name: "CricketDen",
                logo: {
                  "@type": "ImageObject",
                  url: "https://cricket-den.vercel.app/favicon.ico", // Replace with the actual logo URL
                },
              },
              description: truncate(blog.desc || "No description available.", 200),
            }),
          }}
        />
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600">
            {blog.title}
          </h1>
          <p className="text-gray-600 text-sm text-center mt-2">
            Published on{" "}
            {new Date(blog.timestamp.seconds * 1000).toLocaleDateString()} |{" "}
            <span className="font-semibold text-gray-800">{blog.author}</span>
          </p>
        </header>

        {/* Cover Image */}
        <div className="relative w-full overflow-hidden h-80 md:h-[30rem] mb-2">
          <img
            src={blog.coverimage}
            alt={blog.title}
            loading="eager"
            className="rounded-md w-full shadow-md mb-3 object-cover"
          />
          <div className="alt bg-accent text-white text-center text-sm py-1">
            <p className="caption-text">{blog.desc}</p>
          </div>
        </div>

        {/* Content Section */}
        <div
          className="prose max-w-none py-0 md:py-24"
          dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
        ></div>

        {/* Suggested Blogs Section */}
        {suggestedBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-8 text-blue-600">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suggestedBlogs.map((suggestedBlog) => (
                <div
                  key={suggestedBlog.slug}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <img
                    src={suggestedBlog.coverimage}
                    alt={suggestedBlog.title}
                    className="aspect-square w-full rounded-md object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800">
                    {suggestedBlog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {truncate(suggestedBlog.desc, 100)}
                  </p>
                  <Link href={`/Blogs/${suggestedBlog.slug}`}>
                    <p className="text-blue-600 mt-4 inline-block">Read more →</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          404 - Blog Not Found
        </h1>
        <p className="text-gray-600">
          The blog you are looking for does not exist or may have been removed.
        </p>
        <Link href="/blogs">
          <p className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            ← Back to Blogs
          </p>
        </Link>
      </div>
    );
  }
};

export default BlogPage;
