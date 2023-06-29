import React, { useState } from 'react';
import { createClass } from '../../api/classApi';
import './CreateClass.css';

const CreateClass = ({ onClassCreated }) => {
  const [newClassName, setNewClassName] = useState('');
  const [newClassRoom, setNewClassRoom] = useState('');
  const [newClassLocation, setNewClassLocation] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('');

  const handleCreateClass = async (event) => {
    event.preventDefault(); // This prevents the default form submission behavior.

    try {
      const newClass = await createClass({
        name: newClassName,
        room: newClassRoom,
        location: newClassLocation,
        gradeLevel: newClassGrade,
      });

      onClassCreated(newClass);
      setNewClassName('');
      setNewClassRoom('');
      setNewClassLocation('');
      setNewClassGrade('');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  return (
    <div className="createClass">
      <h2>Create Class</h2>
      <form onSubmit={handleCreateClass}>
        <input
          type="text"
          placeholder="Name"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Room"
          value={newClassRoom}
          onChange={(e) => setNewClassRoom(e.target.value)}
  
        />
        <input
          type="text"
          placeholder="Location"
          value={newClassLocation}
          onChange={(e) => setNewClassLocation(e.target.value)}

        />
        <input
          type="text"
          placeholder="Grade Level"
          value={newClassGrade}
          onChange={(e) => setNewClassGrade(e.target.value)}
         
          pattern="\d+" // The pattern \d+ matches any positive integer.
          title="Grade Level must be a positive integer"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateClass;
