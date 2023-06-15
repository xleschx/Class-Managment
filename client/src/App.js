import React, { useState, useEffect } from 'react';
import './App.css';
import { getClasses, updateClass, deleteClass, getStudentsByClassId } from './api/classApi';
import { updateStudent, deleteStudent } from './api/studentApi';
import CreateClass from './components/class/CreateClass';
import CreateStudent from './components/student/CreateStudent';

const App = () => {
  const [classes, setClasses] = useState([]);
  const [studentsByClass, setStudentsByClass] = useState({});
  const [editingClass, setEditingClass] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch classes from the server
  const fetchClasses = async () => {
    try {
      const classes = await getClasses();
      setClasses(classes);
      // Fetch students for each class
      classes.forEach((cls) => {
        fetchStudentsByClassId(cls._id);
      });
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  // Fetch classes
  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch students by class ID from the server
  const fetchStudentsByClassId = async (classId) => {
    try {
      const students = await getStudentsByClassId(classId);
      setStudentsByClass((prevState) => ({
        ...prevState,
        [classId]: students,
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Handle on Edit
  const handleEditClass = (cls) => {
    setEditingClass({ ...cls });
  };

  // Handle on Edit
  const handleEditStudent = (student) => {
    setEditingStudent({ ...student });
  };

  // Update a class
  const handleUpdateClass = async (classId) => {
    try {
      await updateClass(classId, editingClass);
      setEditingClass(null);
      fetchClasses();
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  // Update a student
  const handleUpdateStudent = async (studentId) => {
    try {
      await updateStudent(studentId, editingStudent);
      setEditingStudent(null);
      fetchClasses();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Delete a class
  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  // Delete a student
  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      fetchClasses();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Create a class
  const handleCreateClass = async () => {
    try {
      fetchClasses();
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  // Create a student
  const handleCreateStudent = async () => {
    try {
      fetchClasses();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="container">
      <h1>Class Management</h1>
      <CreateClass onClassCreated={handleCreateClass} />
      <CreateStudent classes={classes} onStudentCreated={handleCreateStudent} />

      <div className="section">
        <h2>Classes</h2>
        <ul>
          {classes.map((cls) => (
            <li className="class" key={cls._id}>
              {editingClass?._id === cls._id ? (
                <div className="editing">
                  <input
                    type="text"
                    value={editingClass.name}
                    onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingClass.room}
                    onChange={(e) => setEditingClass({ ...editingClass, room: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingClass.location}
                    onChange={(e) => setEditingClass({ ...editingClass, location: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingClass.gradeLevel}
                    onChange={(e) => setEditingClass({ ...editingClass, gradeLevel: e.target.value })}
                  />
                  <button className="button" onClick={() => handleUpdateClass(cls._id)}>Save</button>
                  <button className="button" onClick={() => setEditingClass(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <h3>{cls.name}</h3>
                  <p>Room: {cls.room}</p>
                  <p>Location: {cls.location}</p>
                  <p>Grade Level: {cls.gradeLevel}</p>
                  <button className="button" onClick={() => handleEditClass(cls)}>Edit</button>
                  <button className="button" onClick={() => handleDeleteClass(cls._id)}>Delete</button>
                </>
              )}

              <ul>
                {studentsByClass[cls._id] &&
                  studentsByClass[cls._id].map((student) => (
                    <li className="student" key={student._id}>
                      {editingStudent?._id === student._id ? (
                        <div className="editing">
                          <input
                            type="text"
                            value={editingStudent.name}
                            onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                          />
                          <input
                            type="text"
                            value={editingStudent.subName}
                            onChange={(e) => setEditingStudent({ ...editingStudent, subName: e.target.value })}
                          />
                          <input
                            type="date"
                            value={editingStudent.birthdate}
                            onChange={(e) => setEditingStudent({ ...editingStudent, birthdate: e.target.value })}
                          />
                          <input
                            type="text"
                            value={editingStudent.address?.street || ''}
                            onChange={(e) => setEditingStudent({ ...editingStudent, address: { ...editingStudent.address, street: e.target.value } })}
                          />
                          <input
                            type="text"
                            value={editingStudent.address?.city || ''}
                            onChange={(e) => setEditingStudent({ ...editingStudent, address: { ...editingStudent.address, city: e.target.value } })}
                          />
                          <input
                            type="text"
                            value={editingStudent.address?.plz || ''}
                            onChange={(e) => setEditingStudent({ ...editingStudent, address: { ...editingStudent.address, plz: e.target.value } })}
                          />
                          <input
                            type="text"
                            value={editingStudent.nationality}
                            onChange={(e) => setEditingStudent({ ...editingStudent, nationality: e.target.value })}
                          />
                          <input
                            type="text"
                            value={editingStudent.legalGuardian}
                            onChange={(e) => setEditingStudent({ ...editingStudent, legalGuardian: e.target.value })}
                          />
                          <button className="button" onClick={() => handleUpdateStudent(student._id)}>Save</button>
                          <button className="button" onClick={() => setEditingStudent(null)}>Cancel</button>
                        </div>
                      ) : (
                        <>
                          <h4>{student.name}</h4>
                          <p>Sub Name: {student.subName}</p>
                          <p>Birthdate: {student.birthdate}</p>
                          <p>
                            Address: {student.address?.street || ''}, {student.address?.city || ''}, {student.address?.plz || ''}
                          </p>
                          <p>Nationality: {student.nationality}</p>
                          <p>Legal Guardian: {student.legalGuardian}</p>
                          <button className="button" onClick={() => handleEditStudent(student)}>Edit</button>
                          <button className="button" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
