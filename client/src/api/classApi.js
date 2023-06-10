import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/classes';

// Classes API

export const createClass = async (classData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

export const updateClass = async (classId, classData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${classId}`, classData);
    return response.data;
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
};

export const deleteClass = async (classId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${classId}`);
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
};

export const getClasses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};


export const getStudentsByClassId = async (classId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${classId}/students`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};