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

    // Create collections and their attributes
    await Class.createCollection();
    await Student.createCollection();

    // Define indexes
    await Class.createIndexes();
    await Student.createIndexes();

    console.log('Database and collections created successfully.');

    // Create sample classes
    const class1 = new Class({
      name: 'Class 1',
      room: 'Room A',
      location: 'Building 1',
      gradeLevel: 'Grade 5',
    });
    await class1.save();

    const class2 = new Class({
      name: 'Class 2',
      room: 'Room B',
      location: 'Building 2',
      gradeLevel: 'Grade 6',
    });
    await class2.save();

    // Create sample students
    const student1 = new Student({
      name: 'John Doe',
      subName: 'Doe',
      birthdate: new Date(2005, 3, 15),
      address: '123 Main Street',
      homeAddress: '456 Elm Street',
      nationality: 'USA',
      legalGuardian: 'Jane Doe',
      classId: class1._id,
    });
    await student1.save();

    const student2 = new Student({
      name: 'Jane Smith',
      subName: 'Smith',
      birthdate: new Date(2006, 7, 10),
      address: '789 Oak Avenue',
      homeAddress: '321 Maple Drive',
      nationality: 'USA',
      legalGuardian: 'John Smith',
      classId: class2._id,
    });
    await student2.save();

    console.log('Sample classes and students created successfully.');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

createDatabase();
