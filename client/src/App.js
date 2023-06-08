import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [classForm, setClassForm] = useState({ name: '', room: '', location: '', gradeLevel: '' });
  const [studentForm, setStudentForm] = useState({ name: '', subName: '', birthdate: '', address: '', homeAddress: '', nationality: '', legalGuardian: '', classId: '' });

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('/api/classes');
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createClass = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/classes', classForm);
      setClasses([...classes, response.data]);
      setClassForm({ name: '', room: '', location: '', gradeLevel: '' });
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const createStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/students', studentForm);
      setStudents([...students, response.data]);
      setStudentForm({ name: '', subName: '', birthdate: '', address: '', homeAddress: '', nationality: '', legalGuardian: '', classId: '' });
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            {classItem.name} - {classItem.gradeLevel}
          </li>
        ))}
      </ul>

      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} {student.subName} - {student.birthdate}
          </li>
        ))}
      </ul>

      <h2>Create Class</h2>
      <form onSubmit={createClass}>
        <label>
          Name:
          <input
            type="text"
            value={classForm.name}
            onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Room:
          <input
            type="text"
            value={classForm.room}
            onChange={(e) => setClassForm({ ...classForm, room: e.target.value })}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={classForm.location}
            onChange={(e) => setClassForm({ ...classForm, location: e.target.value })}
          />
        </label>
        <br />
        <label>
          Grade Level:
          <input
            type="text"
            value={classForm.gradeLevel}
            onChange={(e) => setClassForm({ ...classForm, gradeLevel: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Create Class</button>
      </form>

      <h2>Create Student</h2>
      <form onSubmit={createStudent}>
        <label>
          Name:
          <input
            type="text"
            value={studentForm.name}
            onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Sub Name:
          <input
            type="text"
            value={studentForm.subName}
            onChange={(e) => setStudentForm({ ...studentForm, subName: e.target.value })}
          />
        </label>
        <br />
        <label>
          Birthdate:
          <input
            type="text"
            value={studentForm.birthdate}
            onChange={(e) => setStudentForm({ ...studentForm, birthdate: e.target.value })}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={studentForm.address}
            onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
          />
        </label>
        <br />
        <label>
          Home Address:
          <input
            type="text"
            value={studentForm.homeAddress}
            onChange={(e) => setStudentForm({ ...studentForm, homeAddress: e.target.value })}
          />
        </label>
        <br />
        <label>
          Nationality:
          <input
            type="text"
            value={studentForm.nationality}
            onChange={(e) => setStudentForm({ ...studentForm, nationality: e.target.value })}
          />
        </label>
        <br />
        <label>
          Legal Guardian:
          <input
            type="text"
            value={studentForm.legalGuardian}
            onChange={(e) => setStudentForm({ ...studentForm, legalGuardian: e.target.value })}
          />
        </label>
        <br />
        <label>
          Class ID:
          <input
            type="text"
            value={studentForm.classId}
            onChange={(e) => setStudentForm({ ...studentForm, classId: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Create Student</button>
      </form>
    </div>
  );
}

export default App;
