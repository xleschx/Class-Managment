// studentController.js

const { Student } = require('../models/student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Create a student
exports.createStudent = async (req, res) => {
  try {
    const { name, subName, birthdate, address, homeAddress, nationality, legalGuardian, classId } = req.body;

    const newStudent = new Student({
      name,
      subName,
      birthdate,
      address,
      homeAddress,
      nationality,
      legalGuardian,
      classId,
    });

    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, subName, birthdate, address, homeAddress, nationality, legalGuardian, classId } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, subName, birthdate, address, homeAddress, nationality, legalGuardian, classId },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};