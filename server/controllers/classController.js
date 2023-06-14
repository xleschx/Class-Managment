const { Class } = require('../models/class');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('students');
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

// Get a class by ID
exports.getClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const cls = await Class.findById(classId);

    if (!cls) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.json(cls);
  } catch (error) {
    console.error('Error fetching class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Create a class
exports.createClass = async (req, res) => {
  try {
    const { name, room, location, gradeLevel } = req.body;

    const newClass = new Class({
      name,
      room,
      location,
      gradeLevel,
    });

    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ error: 'Failed to create class' });
  }
};



// Update a class
exports.updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const { name, room, location, gradeLevel } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { name, room, location, gradeLevel },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.json(updatedClass);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Remove the student references from the associated class
    await Class.findByIdAndUpdate(deletedClass._id, { $pull: { students: { $in: deletedClass.students } } });

    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
