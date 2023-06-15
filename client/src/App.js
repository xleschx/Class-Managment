import './App.css';
import React, { useState, useEffect } from 'react';
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
  }, [fetchClasses]);
  

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
    
      //Change dateformat to right format
  const formatedBirthday = (studentBirthdate) => {
      var d = new Date(studentBirthdate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [year, month, day].join('-');
  }

  return (
    <div>
      <h1>Class Management</h1>
      <CreateClass onClassCreated={handleCreateClass} />
      <CreateStudent
        classes={classes}
        onStudentCreated={handleCreateStudent}
      />

      <h2>Classes</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
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
                <button onClick={() => handleUpdateClass(cls._id)}>Save</button>
                <button onClick={() => setEditingClass(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{cls.name}</h3>
                <p>Room: {cls.room}</p>
                <p>Location: {cls.location}</p>
                <p>Grade Level: {cls.gradeLevel}</p>
                <button onClick={() => handleEditClass(cls)}>Edit</button>
                <button onClick={() => handleDeleteClass(cls._id)}>Delete</button>
              </>
            )}

            <ul>
              {studentsByClass[cls._id] &&
                studentsByClass[cls._id].map((student) => (
                  <li key={student._id}>
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
                        <button onClick={() => handleUpdateStudent(student._id)}>Save</button>
                        <button onClick={() => setEditingStudent(null)}>Cancel</button>
                      </div>
                    ) : (
                      <>
                        <h4>{student.name}</h4>
                        <p>Sub Name: {student.subName}</p>
                        <p>Birthdate: {formatedBirthday(student.birthdate)}</p>
                        <p>Home Address: {student.homeAddress}</p>
                        <p>Nationality: {student.nationality}</p>
                        <p>Legal Guardian: {student.legalGuardian}</p>
                        <button onClick={() => handleEditStudent(student)}>Edit</button>
                        <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                      </>
                    )}
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
