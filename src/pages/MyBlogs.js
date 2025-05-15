import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import api from '../utils/api';
import { toast } from 'react-toastify';

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get('/blogs/my-blogs');
        setBlogs(res.data.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch blogs', {
          className: 'toast-error',
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter((blog) => blog._id !== blogId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
        My Blogs
      </h2>
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600 text-lg mt-4">Loading your blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600 text-lg">No blogs yet. Create your first blog!</p>
          <a
            href="/create-blog"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            aria-label="Create a new blog"
          >
            Create Blog
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="animate-fade-in">
              <BlogCard blog={blog} isMyBlog={true} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBlogs;