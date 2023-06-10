import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Classes API

export const createClass = async (classData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/classes`, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const updateClass = async (classId, classData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/classes/${classId}`, classData);
    return response.data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

export const deleteClass = async (classId) => {
  try {
    await axios.delete(`${API_BASE_URL}/classes/${classId}`);
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

export const getClasses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

// Students API

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/students/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await axios.delete(`${API_BASE_URL}/students/${studentId}`);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getStudentsByClassId = async (classId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/classes/${classId}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};