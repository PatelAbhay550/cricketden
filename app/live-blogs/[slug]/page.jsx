import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";

// Use generateMetadata to fetch and set dynamic metadata
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const blogsRef = collection(db, "live_blog");
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
    title: blog
      ? `${blog.name} - CricketDen`
      : "CricketDen Blogs - Latest Cricket Blogs and Analysis",
    description: blog
      ? truncate(blog.description || "No description available.", 150)
      : "Read the latest cricket blogs and analysis on CricketDen. Stay updated with the latest cricket news, match previews, and more.",
    keywords, // Include keywords in metadata
    openGraph: {
      images: [blog.header_image],
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
    try {
      const blogsRef = collection(db, "live_blog");
      const q = query(blogsRef, where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        throw new Error("Blog not found");
      }
    } catch (error) {
      console.error("Error fetching blog by slug:", error);
      throw error;
    }
  }

  async function fetchSuggestedBlogs(category) {
    const blogsRef = collection(db, "live_blog");
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
              "@type": "LiveBlogPosting",
              headline: blog.name,
              description:
                blog.description ||
                "Live updates and insights about the ongoing cricket match.",
              image: blog.header_image,
              datePublished: new Date(
                blog.publish_date.seconds * 1000
              ).toISOString(),
              dateModified: new Date(
                blog.created_on.seconds * 1000
              ).toISOString(),
              liveBlogUpdate: [
                {
                  "@type": "BlogPosting",
                  headline: blog.head1,
                  articleBody: blog.description,
                  datePublished: new Date(
                    blog.created_on.seconds * 1000
                  ).toISOString(),
                },
                {
                  "@type": "BlogPosting",
                  headline: blog.head2,
                  articleBody: blog.description,
                  datePublished: new Date(
                    blog.created_on.seconds * 1000
                  ).toISOString(),
                },
              ],
              author: {
                "@type": "Person",
                name: blog.author,
              },
              publisher: {
                "@type": "Organization",
                name: "CricketDen",
                logo: {
                  "@type": "ImageObject",
                  url: "https://cricket-den.vercel.app/favicon.ico", // Replace with actual logo URL
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://cricket-den.vercel.app/live-blogs/${blog.slug}`,
              },
            }),
          }}
        />
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600">
            {blog.name}
          </h1>
          <p className="text-gray-600 text-sm text-center mt-2">
            Published on{" "}
            {new Date(blog.publish_date.seconds * 1000).toLocaleDateString()} |{" "}
            <span className="font-semibold text-gray-800">{blog.author}</span>
          </p>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-80 md:h-[30rem] mb-4">
          <img
            src={blog.header_image}
            alt={blog.name}
            loading="eager"
            className="rounded-md w-full shadow-md mb-3 object-cover"
          />
          <div className="alt bg-accent text-white text-center text-sm py-1 mb-0">
            <p className="caption-text">{blog.description}</p>
          </div>
          {/* Content Section */}
          <div
            className="prose max-w-none py-0 md:py-32"
            dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
          ></div>
        </div>
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
