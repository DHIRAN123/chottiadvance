import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import BlogDetail from "@/sections/section-blogs/BlogDetail";
import "@/app/globals.css";

const BlogSlugPage = () => {
  return (
    <>
      <Header />
      <main className="p-4">
        <BlogDetail />
      </main>
      <Footer />
    </>
  );
};

export default BlogSlugPage;
