'use client';

import { useEffect, useState } from 'react';
import { getBlogBySlug } from './BlogService';
import { useRouter } from 'next/router';

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      getBlogBySlug(slug)
        .then((res) => setBlog(res))
        .catch((err) => setError('Blog not found or failed to load.'));
    }
  }, [slug]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!blog) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}