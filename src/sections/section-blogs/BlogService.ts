import axios from 'axios';

// Define the Blog type
export interface Blog {
  id: number;
  title: string;
  content: string;
  slug: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Change this baseURL if your backend uses a different path or port
const API = axios.create({
  baseURL: 'http://localhost:8080/api', // 🔁 Change if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all blogs
export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await API.get('/blogs/'); // 🔁 Make sure this matches backend route
    return response.data;
  } catch (error: any) {
    if (error.message === 'Network Error') {
      console.error('⚠️ Network Error: Backend is unreachable. Is the server running?');
    } else if (error.response?.status === 404) {
      console.error('❌ 404 Error: /blogs endpoint not found on backend.');
    } else {
      console.error('❗ Unexpected Error:', error.message || error);
    }
    return []; // Optional: return empty list to prevent frontend crash
  }
};

// Fetch a blog by slug
export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  try {
    const Slug = slug.replace(/\/$/, ''); // Remove trailing slash if present
    const response = await API.get(`/blogs/${Slug}`);
    return response.data;
  } catch (error: any) {
    if (error.message === 'Network Error') {
      console.error('⚠️ Network Error: Backend is unreachable.');
    } else if (error.response?.status === 404) {
      console.error(`❌ 404 Error: Blog with slug "${slug}" not found.`);
    } else {
      console.error('❗ Unexpected Error:', error.message || error);
    }
    throw error;
  }
};
