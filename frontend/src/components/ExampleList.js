import React from 'react';
import ExampleCard from './ExampleCard';
import './ExampleList.css';

const ExampleList = ({ examples, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading items...</p>
      </div>
    );
  }

  if (examples.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3>No items yet</h3>
        <p>Start by adding your first item using the form above.</p>
      </div>
    );
  }

  return (
    <div className="examples-section">
      <div className="section-header">
        <h2>Your Items ({examples.length})</h2>
        <div className="section-divider"></div>
      </div>

      <div className="examples-grid">
        {examples.map((example, index) => (
          <ExampleCard
            key={example._id}
            example={example}
            onEdit={onEdit}
            onDelete={onDelete}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ExampleList;
