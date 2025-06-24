import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BlogPlatform = () => {
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('blogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleSubmit = () => {
    if (!title || !content) return;

    if (editingId) {
      setBlogs(
        blogs.map(blog =>
          blog.id === editingId ? { ...blog, title, content } : blog
        )
      );
      setEditingId(null);
    } else {
      setBlogs([
        ...blogs,
        {
          id: Date.now(),
          title,
          content,
          createdAt: new Date().toLocaleString(),
        },
      ]);
    }

    setTitle('');
    setContent('');
  };

  const handleEdit = (id) => {
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container py-5"
      style={{
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 className="text-center text-success fw-bold mb-4">
         Blog Platform
      </h2>

      <div className="mb-4 p-4 rounded shadow-sm bg-white">
        <input
          type="text"
          className="form-control mb-3 rounded-pill"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-3 rounded"
          rows="4"
          placeholder="Enter Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={`btn ${editingId ? 'btn-warning' : 'btn-primary'} w-100 rounded-pill fw-bold`}
          onClick={handleSubmit}
        >
          {editingId ? 'Update Blog ✏️' : 'Add Blog '}
        </button>
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <p className="text-center text-muted">No blogs yet. Start writing!</p>
      ) : (
        blogs.map((blog) => (
          <motion.div
            key={blog.id}
            className="p-4 mb-4 rounded shadow-sm bg-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              borderLeft: '6px solid #4caf50',
              background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0 fw-bold text-primary">{blog.title}</h5>
              <span className="text-muted small">{blog.createdAt}</span>
            </div>
            <p>{blog.content}</p>
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => handleEdit(blog.id)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-sm btn-outline-danger rounded-pill"
                onClick={() => handleDelete(blog.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default BlogPlatform;
