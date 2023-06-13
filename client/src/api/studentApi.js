import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/students';


// Students API

export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${studentId}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const deleteStudent = async (studentId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${studentId}`);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};


export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

