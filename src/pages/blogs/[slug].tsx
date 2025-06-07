import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import BlogDetail from "@/sections/section-blogs/BlogDetail";
import "@/app/globals.css";

export default function BlogSlugPage() {
  return (
    <>
      <Header />
      <main className="p-4">
        <BlogDetail />
      </main>
      <Footer />
    </>
  );
}