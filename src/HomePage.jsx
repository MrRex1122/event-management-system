import React, { useState } from 'react';

function EventCreationPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send new event data to the server
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, description })
      });
      if (response.ok) {
        alert('Event created successfully!');
        // Clear form fields after successful creation
        setTitle('');
        setDate('');
        setDescription('');
      } else {
        alert('Error creating event');
      }
    } catch (error) {
      console.error('Event creation error:', error);
      alert('Could not connect to the server');
    }
  };

  return (
    <div className="event-creation-page">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Date:
          <input 
            type="date" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Description:
          <textarea 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}

export default EventCreationPage;