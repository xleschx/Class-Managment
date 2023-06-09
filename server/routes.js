const express = require('express');
const router = express.Router();
const classController = require('./controllers/classController');
const studentController = require('./controllers/studentController');

// Class routes
router.get('/classes', classController.getAllClasses);
router.post('/classes', classController.createClass);
router.put('/classes/:id', classController.updateClass);
router.delete('/classes/:id', classController.deleteClass);

// Student routes
router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
