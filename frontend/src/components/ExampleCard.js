import React from 'react';
import './ExampleCard.css';

const ExampleCard = ({ example, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="example-card">
      <div className="card-header">
        <h3 className="card-title">{example.name}</h3>
        <div className="card-actions">
          <button
            onClick={() => onEdit(example)}
            className="btn-icon btn-edit"
            title="Edit item"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete(example._id)}
            className="btn-icon btn-delete"
            title="Delete item"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="card-content">
        <p className="card-description">{example.description}</p>
      </div>

      <div className="card-footer">
        <span className="card-date">
          Created: {formatDate(example.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default ExampleCard;
