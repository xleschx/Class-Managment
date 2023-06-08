import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [newClass, setNewClass] = useState({
    name: '',
    gradeLevel: '',
    room: '',
    location: ''
  });
  const [newStudent, setNewStudent] = useState({
    name: '',
    birthdate: '',
    classId: '',
    subName: '',
    gradeLevel: '',
    address: '',
    homeAddress: '',
    nationality: '',
    legalGuardian: ''
  });

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  // Fetch all classes
  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Create a new class
  const createClass = async () => {
    try {
      const response = await axios.post('/api/classes', newClass);
      setNewClass({ name: '', gradeLevel: '', room: '', location: '' });
      fetchClasses();
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  // Create a new student
  const createStudent = async () => {
    try {
      const response = await axios.post('/api/students', newStudent);
      setNewStudent({
        name: '',
        birthdate: '',
        classId: '',
        subName: '',
        gradeLevel: '',
        address: '',
        homeAddress: '',
        nationality: '',
        legalGuardian: ''
      });
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {classes.map((c) => (
          <li key={c._id}>{c.name}</li>
        ))}
      </ul>

      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>{s.name}</li>
        ))}
      </ul>

      <h2>Create Class</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newClass.name}
          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
        />
      </div>
      <div>
        <label>Grade Level:</label>
        <input
          type="text"
          value={newClass.gradeLevel}
          onChange={(e) => setNewClass({ ...newClass, gradeLevel: e.target.value })}
        />
      </div>
      <div>
        <label>Room:</label>
        <input
          type="text"
          value={newClass.room}
          onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={newClass.location}
          onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
        />
      </div>
      <button onClick={createClass}>Create Class</button>

      <h2>Create Student</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
      </div>
      <div>
        <label>Birthdate:</label>
        <input
          type="text"
          value={newStudent.birthdate}
          onChange={(e) => setNewStudent({ ...newStudent, birthdate: e.target.value })}
        />
      </div>
      <div>
        <label>Class ID:</label>
        <input
          type="text"
          value={newStudent.classId}
          onChange={(e) => setNewStudent({ ...newStudent, classId: e.target.value })}
        />
      </div>
      <div>
        <label>Subject Name:</label>
        <input
          type="text"
          value={newStudent.subName}
          onChange={(e) => setNewStudent({ ...newStudent, subName: e.target.value })}
        />
      </div>
      <div>
        <label>Grade Level:</label>
        <input
          type="text"
          value={newStudent.gradeLevel}
          onChange={(e) => setNewStudent({ ...newStudent, gradeLevel: e.target.value })}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={newStudent.address}
          onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
        />
      </div>
      <div>
        <label>Home Address:</label>
        <input
          type="text"
          value={newStudent.homeAddress}
          onChange={(e) => setNewStudent({ ...newStudent, homeAddress: e.target.value })}
        />
      </div>
      <div>
        <label>Nationality:</label>
        <input
          type="text"
          value={newStudent.nationality}
          onChange={(e) => setNewStudent({ ...newStudent, nationality: e.target.value })}
        />
      </div>
      <div>
        <label>Legal Guardian:</label>
        <input
          type="text"
          value={newStudent.legalGuardian}
          onChange={(e) => setNewStudent({ ...newStudent, legalGuardian: e.target.value })}
        />
      </div>
      <button onClick={createStudent}>Create Student</button>
    </div>
  );
}

export default App;