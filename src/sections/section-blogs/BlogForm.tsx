// 'use client';
// import { useState } from 'react';
// import { createBlog } from './BlogService';

// export default function BlogForm() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [slug, setSlug] = useState('');

//   const handleSubmit = async () => {
//     await createBlog({ title, content, slug });
//     setTitle('');
//     setContent('');
//     setSlug('');
//     alert('Blog created');
//   };

//   return (
//     <div className="space-y-4">
//       <input
//         className="w-full p-2 border"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <input
//         className="w-full p-2 border"
//         placeholder="Slug"
//         value={slug}
//         onChange={(e) => setSlug(e.target.value)}
//       />
//       <textarea
//         className="w-full p-2 border"
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       ></textarea>
//       <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
//         Create Blog
//       </button>
//     </div>
//   );
// }
