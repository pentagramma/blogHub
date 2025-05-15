import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import api from '../utils/api';
import { toast } from 'react-toastify';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [debouncedAuthor, setDebouncedAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['Career', 'Finance', 'Travel', 'Technology', 'Health', 'Other'];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAuthor(author);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [author]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const params = {};
        if (category) params.category = category;
        if (debouncedAuthor) params.author = debouncedAuthor;
        const res = await api.get('/blogs', { params });
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

    fetchBlogs();
  }, [category, debouncedAuthor]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
        All Blogs
      </h2>
      <div className="mb-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Filter by author"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            aria-label="Filter by author"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600 text-lg mt-4">Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600 text-lg">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="animate-fade-in">
              <BlogCard blog={blog} isMyBlog={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;