const mongoose = require('mongoose');
const { Class } = require('./class');
const { Student } = require('./student');

const createDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });

    // Drop the existing database if it exists
    await mongoose.connection.db.dropDatabase();
    console.log('Existing database dropped successfully.');

    // Create collections and their attributes
    await Class.createCollection();
    await Student.createCollection();

    // Define indexes
    await Class.createIndexes();
    await Student.createIndexes();

    console.log('Database and collections created successfully.');

    // Create sample classes
    const classes = [];
    for (let i = 1; i <= 10; i++) {
      const classData = {
        name: `Class ${i}`,
        room: `Room ${i}`,
        location: `Building ${i}`,
        gradeLevel: `Grade ${i}`,
        students: [], // Initialize an empty array for students
      };
      const newClass = new Class(classData);
      await newClass.save();
      classes.push(newClass);
    }

    // Create sample students
    const students = [];
    for (let i = 1; i <= 10; i++) {
      const classIndex = i % 10; // Use modulus to assign students to classes in a cyclic manner
      const studentData = {
        name: `Student ${i}`,
        subName: `SubName ${i}`,
        birthdate: new Date(2000, i % 12, i),
        homeAddress: `Home Address ${i}`,
        nationality: `Nationality ${i}`,
        legalGuardian: `Legal Guardian ${i}`,
        classId: classes[classIndex]._id,
      };
      const newStudent = new Student(studentData);
      await newStudent.save();
      students.push(newStudent);

      // Update the students array in the associated class
      classes[classIndex].students.push(newStudent);
      await classes[classIndex].save();
    }

    console.log('Sample classes and students created successfully.');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

createDatabase();
