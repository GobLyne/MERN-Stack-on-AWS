import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [examples, setExamples] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchExamples();
  }, []);

  const fetchExamples = async () => {
    try {
      const response = await fetch('/api/examples');
      const data = await response.json();
      setExamples(data);
    } catch (err) {
      console.error('Error fetching examples:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/examples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newExample = await response.json();
      setExamples([...examples, newExample]);
      setFormData({ name: '', description: '' });
    } catch (err) {
      console.error('Error adding example:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App">
      <h1>MERN Stack on AWS</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">Add Example</button>
      </form>

      <h2>Examples</h2>
      <ul>
        {examples.map((example) => (
          <li key={example._id}>
            <h3>{example.name}</h3>
            <p>{example.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;