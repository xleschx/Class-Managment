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
  const [favoriteClass, setFavoriteClass] = useState(null);
  const [favoriteStudents, setFavoriteStudents] = useState([]);
  const [favoriteStudent, setFavoriteStudent] = useState(null);

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

  // Change date format to right format
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

  const handleFavorite = (cls) => {
    setFavoriteClass(cls);
    setFavoriteStudents(studentsByClass[cls._id] || []);
  };

  const handleFavoriteStudent = (student) => {
    setFavoriteStudent(student);
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
                <form onSubmit={(e) => { e.preventDefault(); handleUpdateClass(cls._id); }}>
                  <div className="editing">
                    <input
                      type="text"
                      value={editingClass.name}
                      onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                      required
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
                    <button type="submit" className="button">Save</button>
                    <button type="button" className="button" onClick={() => setEditingClass(null)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>{cls.name}</h3>
                  <p>Room: {cls.room}</p>
                  <p>Location: {cls.location}</p>
                  <p>Grade Level: {cls.gradeLevel}</p>
                  <button className="button" onClick={() => handleEditClass(cls)}>Edit</button>
                  <button className="button" onClick={() => handleDeleteClass(cls._id)}>Delete</button>
                  <button className="button" onClick={() => handleFavorite(cls)}>Favorite</button>

                </>
              )}

              <ul>
                {studentsByClass[cls._id] &&
                  studentsByClass[cls._id].map((student) => (
                    <li className="student" key={student._id}>
                      {editingStudent?._id === student._id ? (
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateStudent(student._id); }}>
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
                              value={editingStudent.address?.country || ''}
                              onChange={(e) => setEditingStudent({ ...editingStudent, address: { ...editingStudent.address, country: e.target.value } })}

                            />
                            <button type="submit" className="button">Save</button>
                            <button type="button" className="button" onClick={() => setEditingStudent(null)}>Cancel</button>

                          </div>
                        </form>
                      ) : (
                        <>
                          <h4>{student.name} {student.subName}</h4>
                          <p>Birthdate: {formatedBirthday(student.birthdate)}</p>
                          <p>Address: {student.address?.street}, {student.address?.city}, {student.address?.country}</p>
                          <button className="button" onClick={() => handleEditStudent(student)}>Edit</button>
                          <button className="button" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                          <button className="button" onClick={() => handleFavoriteStudent(student)}>Favorite</button>

                        </>
                      )}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {favoriteClass && (
        <div className="section">
          <h2>Favorite Class</h2>
          <h3>{favoriteClass.name}</h3>
          <p>Room: {favoriteClass.room}</p>
          <p>Location: {favoriteClass.location}</p>
          <p>Grade Level: {favoriteClass.gradeLevel}</p>

          <h2>Students in Favorite Class</h2>
          <ul>
            {favoriteStudents.map((student) => (
              <li className="student" key={student._id}>
                <h4>{student.name} {student.subName}</h4>
                <p>Birthdate: {formatedBirthday(student.birthdate)}</p>
                <p>Address: {student.address?.street}, {student.address?.city}, {student.address?.country}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {favoriteStudent && (
        <div className="section">
          <h2>Favorite Student</h2>
          <h4>{favoriteStudent.name} {favoriteStudent.subName}</h4>
          <p>Birthdate: {formatedBirthday(favoriteStudent.birthdate)}</p>
          <p>Address: {favoriteStudent.address?.street}, {favoriteStudent.address?.city}, {favoriteStudent.address?.country}</p>
        </div>
      )}
    </div>
  );
};

export default App;
