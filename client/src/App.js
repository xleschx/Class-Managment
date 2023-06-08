import React, { useState, useEffect } from 'react';
import { getClasses, createClass, updateClass, deleteClass, getStudents, createStudent, updateStudent, deleteStudent } from './api';

const App = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [newClassName, setNewClassName] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentNationality, setNewStudentNationality] = useState('');

  const fetchClasses = async () => {
    try {
      const classes = await getClasses();
      setClasses(classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const students = await getStudents();
      setStudents(students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCreateClass = async () => {
    try {
      const newClass = await createClass({
        name: newClassName,
        gradeLevel: newClassGrade,
      });
      setClasses([...classes, newClass]);
      setNewClassName('');
      setNewClassGrade('');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleCreateStudent = async () => {
    try {
      const newStudent = await createStudent({
        name: newStudentName,
        nationality: newStudentNationality,
      });
      setStudents([...students, newStudent]);
      setNewStudentName('');
      setNewStudentNationality('');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleUpdateClass = async (classId, updatedName, updatedGrade) => {
    try {
      await updateClass(classId, {
        name: updatedName,
        gradeLevel: updatedGrade,
      });
      const updatedClasses = classes.map((cls) => {
        if (cls._id === classId) {
          return { ...cls, name: updatedName, gradeLevel: updatedGrade };
        }
        return cls;
      });
      setClasses(updatedClasses);
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  const handleUpdateStudent = async (studentId, updatedName, updatedNationality) => {
    try {
      await updateStudent(studentId, {
        name: updatedName,
        nationality: updatedNationality,
      });
      const updatedStudents = students.map((student) => {
        if (student._id === studentId) {
          return { ...student, name: updatedName, nationality: updatedNationality };
        }
        return student;
      });
      setStudents(updatedStudents);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      const filteredClasses = classes.filter((cls) => cls._id !== classId);
      setClasses(filteredClasses);
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      const filteredStudents = students.filter((student) => student._id !== studentId);
      setStudents(filteredStudents);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Classes</h2>
      <div>
        <input
          type="text"
          placeholder="Class Name"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade Level"
          value={newClassGrade}
          onChange={(e) => setNewClassGrade(e.target.value)}
        />
        <button onClick={handleCreateClass}>Create Class</button>
      </div>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            {cls.name} - {cls.gradeLevel}
            <div>
              <input
                type="text"
                placeholder="Updated Name"
                onChange={(e) => handleUpdateClass(cls._id, e.target.value, cls.gradeLevel)}
              />
              <input
                type="text"
                placeholder="Updated Grade"
                onChange={(e) => handleUpdateClass(cls._id, cls.name, e.target.value)}
              />
              <button onClick={() => handleDeleteClass(cls._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Students</h2>
      <div>
        <input
          type="text"
          placeholder="Student Name"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality"
          value={newStudentNationality}
          onChange={(e) => setNewStudentNationality(e.target.value)}
        />
        <button onClick={handleCreateStudent}>Create Student</button>
      </div>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.nationality}
            <div>
              <input
                type="text"
                placeholder="Updated Name"
                onChange={(e) => handleUpdateStudent(student._id, e.target.value, student.nationality)}
              />
              <input
                type="text"
                placeholder="Updated Nationality"
                onChange={(e) => handleUpdateStudent(student._id, student.name, e.target.value)}
              />
              <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
