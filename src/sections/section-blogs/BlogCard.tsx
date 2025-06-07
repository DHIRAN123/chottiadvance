import Link from 'next/link';

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
      <Link href={`/blogs/${blog.slug}`} className="text-blue-600 hover:underline">Read more</Link>
    </div>
  );
}
