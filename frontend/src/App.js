import { useState, useEffect } from 'react';
import ExampleForm from './components/ExampleForm';
import ExampleList from './components/ExampleList';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [examples, setExamples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingExample, setEditingExample] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, exampleId: null });

  useEffect(() => {
    fetchExamples();
  }, []);

  const fetchExamples = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/examples');
      if (!response.ok) {
        throw new Error('Failed to fetch examples');
      }
      const data = await response.json();
      setExamples(data);
      setError('');
    } catch (err) {
      console.error('Error fetching examples:', err);
      setError('Failed to load items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const url = editingExample
        ? `/api/examples/${editingExample._id}`
        : '/api/examples';

      const method = editingExample ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingExample ? 'update' : 'create'} example`);
      }

      const data = await response.json();

      if (editingExample) {
        setExamples(examples.map(ex => ex._id === editingExample._id ? data : ex));
        setEditingExample(null);
      } else {
        setExamples([...examples, data]);
      }

      setError('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(`Failed to ${editingExample ? 'update' : 'add'} item. Please try again.`);
    }
  };

  const handleEdit = (example) => {
    setEditingExample(example);
    // Scroll to top where the form is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExample(null);
  };

  const handleDeleteClick = (exampleId) => {
    setDeleteModal({ isOpen: true, exampleId });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/examples/${deleteModal.exampleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete example');
      }

      setExamples(examples.filter(ex => ex._id !== deleteModal.exampleId));
      setDeleteModal({ isOpen: false, exampleId: null });
      setError('');
    } catch (err) {
      console.error('Error deleting example:', err);
      setError('Failed to delete item. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, exampleId: null });
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🚀</span>
          MERN Stack Dashboard
        </h1>
        <p className="app-subtitle">Manage your items with style</p>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
          <button
            className="error-dismiss"
            onClick={() => setError('')}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      <ExampleForm
        onSubmit={handleSubmit}
        editingExample={editingExample}
        onCancelEdit={handleCancelEdit}
      />

      <ExampleList
        examples={examples}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        loading={loading}
      />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Item"
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}

export default App;