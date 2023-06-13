import './App.css';
import React, { useState, useEffect } from 'react';
import { getClasses, createClass, updateClass, deleteClass, getStudentsByClassId } from '../api/classApi';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api/studentApi';

const App = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentsByClass, setStudentsByClass] = useState({});
  const [selectedClassId, setSelectedClassId] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newClassRoom, setNewClassRoom] = useState('');
  const [newClassLocation, setNewClassLocation] = useState('');
  const [newClassGrade, setNewClassGrade] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentSubName, setNewStudentSubName] = useState('');
  const [newStudentBirthdate, setNewStudentBirthdate] = useState('');
  const [newStudentHomeAddress, setNewStudentHomeAddress] = useState('');
  const [newStudentNationality, setNewStudentNationality] = useState('');
  const [newStudentLegalGuardian, setNewStudentLegalGuardian] = useState('');
  const [editingClass, setEditingClass] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch classes and students
  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, []);

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

  // Fetch students from the server
  const fetchStudents = async () => {
    try {
      const students = await getStudents();
      setStudents(students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

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

  // Create a new class
  const handleCreateClass = async () => {
    try {
      const newClass = await createClass({
        name: newClassName,
        room: newClassRoom,
        location: newClassLocation,
        gradeLevel: newClassGrade,
      });
      setClasses([...classes, newClass]);
      setNewClassName('');
      setNewClassRoom('');
      setNewClassLocation('');
      setNewClassGrade('');
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  // Create a new student
  const handleCreateStudent = async () => {
    try {
      const newStudent = await createStudent({
        name: newStudentName,
        subName: newStudentSubName,
        birthdate: new Date(newStudentBirthdate),
        homeAddress: newStudentHomeAddress,
        nationality: newStudentNationality,
        legalGuardian: newStudentLegalGuardian,
        classId: selectedClassId,
      });
      setStudents([...students, newStudent]);
      setNewStudentName('');
      setNewStudentSubName('');
      setNewStudentBirthdate('');
      setNewStudentHomeAddress('');
      setNewStudentNationality('');
      setNewStudentLegalGuardian('');

      // Fetch updated students for the selected class
      fetchStudentsByClassId(selectedClassId);
    } catch (error) {
      console.error('Error creating student:', error);
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

  // Edit Model
  const ClassEditModal = ({ editingClass, setEditingClass, handleUpdateClass }) => (
    <div className="modal">
      <h2>Edit Class</h2>
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
      <button onClick={() => handleUpdateClass(editingClass._id)}>Save</button>
      <button onClick={() => setEditingClass(null)}>Cancel</button>
    </div>
  );
  

  // Edit Model
 

const StudentEditModal = ({ editingStudent, setEditingStudent, handleUpdateStudent }) => (
  <div className="modal">
    <h2>Edit Student</h2>
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
      value={editingStudent.homeAddress}
      onChange={(e) => setEditingStudent({ ...editingStudent, homeAddress: e.target.value })}
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
    <button onClick={() => handleUpdateStudent(editingStudent._id)}>Save</button>
    <button onClick={() => setEditingStudent(null)}>Cancel</button>
  </div>
);

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

  return (
    <div>
      <h2>Create Class</h2>
      <input
        type="text"
        placeholder="Name"
        value={newClassName}
        onChange={(e) => setNewClassName(e.target.value)}
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
      />
      <button onClick={handleCreateClass}>Create</button>

      <h2>Create Student</h2>
      <input
        type="text"
        placeholder="Name"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sub Name"
        value={newStudentSubName}
        onChange={(e) => setNewStudentSubName(e.target.value)}
      />
      <input
        type="date"
        placeholder="Birthdate"
        value={newStudentBirthdate}
        onChange={(e) => setNewStudentBirthdate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Home Address"
        value={newStudentHomeAddress}
        onChange={(e) => setNewStudentHomeAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nationality"
        value={newStudentNationality}
        onChange={(e) => setNewStudentNationality(e.target.value)}
      />
      <input
        type="text"
        placeholder="Legal Guardian"
        value={newStudentLegalGuardian}
        onChange={(e) => setNewStudentLegalGuardian(e.target.value)}
      />
      <select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)}>
        <option value="">Select a class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>
            {cls.name}
          </option>
        ))}
      </select>
      <button onClick={handleCreateStudent}>Create</button>

      {editingClass && (
        <>
          <div className="overlay" />
          <ClassEditModal
            editingClass={editingClass}
            setEditingClass={setEditingClass}
            handleUpdateClass={handleUpdateClass}
          />
        </>
      )}

{editingStudent && (
        <>
          <div className="overlay" />
          <StudentEditModal
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
            handleUpdateStudent={handleUpdateStudent}
          />
        </>
      )}

      <h2>Classes</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            <h3>{cls.name}</h3>
            <p>Room: {cls.room}</p>
            <p>Location: {cls.location}</p>
            <p>Grade Level: {cls.gradeLevel}</p>
            <button onClick={() => handleEditClass(cls)}>Edit</button>
            <button onClick={() => handleDeleteClass(cls._id)}>Delete</button>

            <ul>
              {studentsByClass[cls._id] &&
                studentsByClass[cls._id].map((student) => (
                  <li key={student._id}>
                    <h4>{student.name}</h4>
                    <p>Sub Name: {student.subName}</p>
                    <p>Birthdate: {student.birthdate}</p>
                    <p>Home Address: {student.homeAddress}</p>
                    <p>Nationality: {student.nationality}</p>
                    <p>Legal Guardian: {student.legalGuardian}</p>
                    <button onClick={() => handleEditStudent(student)}>Edit</button>
                    <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
