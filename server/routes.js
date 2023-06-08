// routes.js

const express = require('express');
const router = express.Router();
const classController = require('./controllers/classController');
const studentController = require('./controllers/studentController');

// Class routes
router.get('/classes', classController.getAllClasses);
router.post('/classes', classController.createClass);

// Student routes
router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.createStudent);

module.exports = router;
