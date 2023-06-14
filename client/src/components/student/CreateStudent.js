import React, { useState } from 'react';
import { createStudent } from '../../api/studentApi';

const CreateStudent = ({ onStudentCreated, classes }) => {
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentSubName, setNewStudentSubName] = useState('');
  const [newStudentBirthdate, setNewStudentBirthdate] = useState('');
  const [newStudentHomeAddress, setNewStudentHomeAddress] = useState('');
  const [newStudentNationality, setNewStudentNationality] = useState('');
  const [newStudentLegalGuardian, setNewStudentLegalGuardian] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');

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
      onStudentCreated(newStudent);
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

  return (
    <div>
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
    </div>
  );
};

export default CreateStudent;
