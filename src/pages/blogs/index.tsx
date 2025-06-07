import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import BlogList from "@/sections/section-blogs/BlogList";
import "@/app/globals.css";

const BlogsPage = () => {
  return (
    <>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Latest Blogs</h1>
        <BlogList />
      </main>
      <Footer />
    </>
  );
};

export default BlogsPage;
