import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../utils/api';

function BlogCard({ blog, isMyBlog, onDelete }) {
  const navigate = useNavigate();
  const [showFullTitle, setShowFullTitle] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await api.delete(`/blogs/${blog._id}`);
        toast.success('Blog deleted successfully!');
        onDelete(blog._id);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  // Format the timestamp
  const formatTimePosted = (timestamp) => {
    const posted = new Date(timestamp);
    const now = new Date();
    const diffHours = (now - posted) / (1000 * 60 * 60);

    if (diffHours >= 24) {
      return posted.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } else {
      if (diffHours < 1) {
        const diffMinutes = Math.floor(diffHours * 60);
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
      } else {
        const hours = Math.floor(diffHours);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      }
    }
  };

  // Truncate content to a specific word count with ellipsis
  const truncateContent = (content, wordCount = 20) => {
    const words = content.split(' ');
    if (words.length <= wordCount) return content;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  // Truncate title to 25 characters
  const truncateTitle = (title, charLimit = 25) => {
    if (title.length <= charLimit) return title;
    return title.slice(0, charLimit);
  };

  // Category color mapping
  const categoryStyles = {
    Career: 'bg-indigo-100 text-indigo-800',
    Finance: 'bg-green-100 text-green-800',
    Travel: 'bg-blue-100 text-blue-800',
    Technology: 'bg-purple-100 text-purple-800',
    Health: 'bg-red-100 text-red-800',
    Other: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:translate-y-1">
      {/* Header section with title and timestamp */}
      <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">
          {showFullTitle || blog.title.length <= 25 ? (
            blog.title
          ) : (
            <>
              {truncateTitle(blog.title)}
              <button
                onClick={() => setShowFullTitle(true)}
                className="text-blue-600 hover:underline text-sm ml-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Show full title"
              >...
              </button>
            </>
          )}
        </h3>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{formatTimePosted(blog.createdAt)}</span>
        </div>
      </div>

      {/* Image section with proper sizing */}
      {blog.image && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-w-full max-h-48 object-contain"
          />
        </div>
      )}

      {/* Content section */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`text-xs px-2 py-1 rounded-full ${categoryStyles[blog.category] || categoryStyles.Other}`}
          >
            {blog.category}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            By {blog.author}
          </span>
        </div>

        <p className="text-gray-700 mb-4 text-sm">{truncateContent(blog.content)}</p>

        <div className="flex justify-between items-center">
          {isMyBlog && (
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/edit-blog/${blog._id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center text-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label={`Edit blog titled ${blog.title}`}
              >
                <Edit size={14} className="mr-1" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded flex items-center text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Delete blog titled ${blog.title}`}
              >
                <Trash2 size={14} className="mr-1" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;