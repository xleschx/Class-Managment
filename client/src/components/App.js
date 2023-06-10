import React, { useState, useEffect } from 'react';
import { getClasses, createClass, updateClass, deleteClass, getStudentsByClassId } from '../api/classApi';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api/studentApi';
const App = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
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
  const [selectedClassId, setSelectedClassId] = useState('');

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

  const fetchStudentsByClassId = async (classId) => {
    try {
      return getStudentsByClassId(classId);
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
      birthdate: new Date(newStudentBirthdate), // Convert to Date object
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
    setSelectedClassId('');
  } catch (error) {
    console.error('Error creating student:', error);
  }
};


  // Update a class
  const handleUpdateClass = async (classId, updatedName, updatedRoom, updatedLocation, updatedGrade) => {
    try {
      await updateClass(classId, {
        name: updatedName,
        room: updatedRoom,
        location: updatedLocation,
        gradeLevel: updatedGrade,
      });
      fetchClasses();
    } catch (error) {
      console.error('Error updating class:', error);
    }
  };

  // Update a student
  const handleUpdateStudent = async (studentId, updatedName, updatedSubName, updatedBirthdate, updatedHomeAddress, updatedNationality, updatedLegalGuardian) => {
    try {
      await updateStudent(studentId, {
        name: updatedName,
        subName: updatedSubName,
        birthdate: updatedBirthdate,

        homeAddress: updatedHomeAddress,
        nationality: updatedNationality,
        legalGuardian: updatedLegalGuardian,
      });
      fetchStudents();
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
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>Create Class</h2>
      <input type="text" placeholder="Name" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} />
      <input type="text" placeholder="Room" value={newClassRoom} onChange={(e) => setNewClassRoom(e.target.value)} />
      <input type="text" placeholder="Location" value={newClassLocation} onChange={(e) => setNewClassLocation(e.target.value)} />
      <input type="text" placeholder="Grade Level" value={newClassGrade} onChange={(e) => setNewClassGrade(e.target.value)} />
      <button onClick={handleCreateClass}>Create</button>

      <h2>Create Student</h2>
      <input type="text" placeholder="Name" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} />
      <input type="text" placeholder="Sub Name" value={newStudentSubName} onChange={(e) => setNewStudentSubName(e.target.value)} />
      <input type="date" placeholder="Birthdate" value={newStudentBirthdate} onChange={(e) => setNewStudentBirthdate(e.target.value)} />
      <input type="text" placeholder="Home Address" value={newStudentHomeAddress} onChange={(e) => setNewStudentHomeAddress(e.target.value)} />
      <input type="text" placeholder="Nationality" value={newStudentNationality} onChange={(e) => setNewStudentNationality(e.target.value)} />
      <input type="text" placeholder="Legal Guardian" value={newStudentLegalGuardian} onChange={(e) => setNewStudentLegalGuardian(e.target.value)} />
      <select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)}>
        <option value="">Select a class</option>
        {classes.map((cls) => (
          <option key={cls._id} value={cls._id}>{cls.name}</option>
        ))}
      </select>
      <button onClick={handleCreateStudent}>Create</button>

      <h2>Classes</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            <h3>{cls.name}</h3>
            <p>Room: {cls.room}</p>
            <p>Location: {cls.location}</p>
            <p>Grade Level: {cls.gradeLevel}</p>
            <button onClick={() => handleUpdateClass(cls._id, `Updated ${cls.name}`, cls.room, cls.location, cls.gradeLevel)}>Update</button>
            <button onClick={() => handleDeleteClass(cls._id)}>Delete</button>

            <ul>
              {fetchStudentsByClassId(cls._id)
                .map((student) => (
                  <li key={student._id}>
                    <h4>{student.name}</h4>
                    <p>Sub Name: {student.subName}</p>
                    <p>Birthdate: {student.birthdate}</p>
                    <p>Home Address: {student.homeAddress}</p>
                    <p>Nationality: {student.nationality}</p>
                    <p>Legal Guardian: {student.legalGuardian}</p>
                    <button onClick={() => handleUpdateStudent(student._id, `Updated ${student.name}`, student.subName, student.birthdate, student.homeAddress, student.nationality, student.legalGuardian)}>Update</button>
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
