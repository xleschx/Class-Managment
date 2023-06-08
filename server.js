const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Class schema and model
    const classSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      gradeLevel: {
        type: String,
        required: true
      },
      room: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      }
    });

    const Class = mongoose.model('Class', classSchema);

    // Student schema and model
    const studentSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      birthdate: {
        type: Date,
        required: true
      },
      classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
      },
      subName: {
        type: String,
        required: true
      },
      gradeLevel: {
        type: String,
        required: true
      },
      address: {
        type: String
      },
      homeAddress: {
        type: String
      },
      nationality: {
        type: String
      },
      legalGuardian: {
        type: String
      }
    });

    const Student = mongoose.model('Student', studentSchema);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });
