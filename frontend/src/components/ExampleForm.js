import React, { useState, useEffect } from 'react';
import './ExampleForm.css';

const ExampleForm = ({ onSubmit, editingExample, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (editingExample) {
      setFormData({
        name: editingExample.name,
        description: editingExample.description
      });
    } else {
      setFormData({
        name: '',
        description: ''
      });
    }
  }, [editingExample]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingExample) {
      setFormData({ name: '', description: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    onCancelEdit();
  };

  return (
    <div className="form-container">
      <h2>{editingExample ? 'Edit Item' : 'Add New Item'}</h2>
      <form onSubmit={handleSubmit} className="example-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter item description"
            rows="4"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingExample ? 'Update' : 'Add'} Item
          </button>
          {editingExample && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExampleForm;
