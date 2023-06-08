const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: String,
  room: String,
  location: String,
  gradeLevel: String,
});

const Class = mongoose.model('Class', classSchema);

module.exports = { Class };
