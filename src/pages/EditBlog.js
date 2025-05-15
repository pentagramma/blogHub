import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';

function EditBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const categories = ['Career', 'Finance', 'Travel', 'Technology', 'Health', 'Other'];

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        const blog = res.data.data;
        setTitle(blog.title);
        setCategory(blog.category);
        setContent(blog.content);
        setImage(blog.image || '');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch blog');
      }
    };
    fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !content) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      await api.put(`/blogs/${id}`, { title, category, content, image });
      toast.success('Blog updated successfully!');
      navigate('/my-blogs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update blog');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">
        Edit Blog
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg space-y-6"
        aria-label="Edit blog form"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
              !title && title !== '' ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            aria-required="true"
            aria-label="Blog title"
          />
          {!title && title !== '' && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
              !category && category !== '' ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            aria-required="true"
            aria-label="Blog category"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {!category && category !== '' && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content"
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-y h-48 ${
              !content && content !== '' ? 'border-red-500' : 'border-gray-300'
            }`}
            required
            aria-required="true"
            aria-label="Blog content"
          />
          {!content && content !== '' && (
            <p className="text-red-500 text-sm mt-1">Content is required</p>
          )}
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            aria-label="Upload blog image"
          />
        </div>
        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt="Blog preview"
              className="max-w-full max-h-64 object-contain rounded-md shadow-sm"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label="Update blog"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;