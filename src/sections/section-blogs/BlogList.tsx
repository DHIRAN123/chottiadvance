'use client';

import { useEffect, useState } from 'react';
import { getAllBlogs } from './BlogService';
import BlogCard from './BlogCard';

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    getAllBlogs().then((res) => setBlogs(res));
  }, []);

  return (
    <div className="grid gap-4 p-4">
      {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
}
