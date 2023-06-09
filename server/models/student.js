const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  subName: String,
  birthdate: Date,
  homeAddress: String,
  nationality: String,
  legalGuardian: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };
