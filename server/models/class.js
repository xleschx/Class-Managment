  const mongoose = require('mongoose');

  const classSchema = new mongoose.Schema({
    name: String,
    room: String,
    location: String,
    gradeLevel: String,
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  });

  const Class = mongoose.model('Class', classSchema);

  module.exports = { Class };
