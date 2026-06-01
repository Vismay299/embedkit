import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#FFF5EB] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold text-gray-900">Our Blog</h1>
          <p className="mt-2 text-gray-600">Insights, tutorials, and updates from our development journey</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#FF6B00]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs text-gray-400">{formatDate(post.publishedAt)}</time>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  #{post.category}
                </span>
              </div>
              <h2 className="font-semibold text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
