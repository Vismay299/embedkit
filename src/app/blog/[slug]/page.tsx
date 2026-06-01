import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-sm text-[#FF6B00] hover:underline mb-6 inline-block">
        ← Back to Blog
      </Link>

      <article>
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm text-gray-400">{formatDate(post.publishedAt)}</time>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            #{post.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

        <div className="prose max-w-none text-gray-700">
          <p>{post.excerpt}</p>
          <p className="mt-4">
            This is a placeholder for the full blog post content. In production, this would be
            rendered from a rich text editor or markdown content stored in the database.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4">Getting Started</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4">Key Takeaways</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>First important point about this topic</li>
            <li>Second key insight that matters</li>
            <li>Third actionable takeaway for readers</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8 mb-4">Conclusion</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
        </div>
      </article>
    </div>
  );
}
