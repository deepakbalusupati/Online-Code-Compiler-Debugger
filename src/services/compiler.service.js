import axios from 'axios';

const API_URL = '/api/compiler';

/**
 * Run code in the specified language
 * @param {string} code - The source code
 * @param {string} language - The programming language
 * @param {string} input - Input for the program
 * @returns {Promise<Object>} - Result from the API
 */
export const runCode = async (code, language, input = '') => {
  try {
    const response = await axios.post(`${API_URL}/run`, {
      code,
      language,
      input
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      throw new Error('Error setting up request: ' + error.message);
    }
  }
};

/**
 * Debug code in the specified language
 * @param {string} code - The source code
 * @param {string} language - The programming language
 * @param {string} input - Input for the program
 * @returns {Promise<Object>} - Debug result from the API
 */
export const debugCode = async (code, language, input = '') => {
  try {
    const response = await axios.post(`${API_URL}/debug`, {
      code,
      language,
      input
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error while debugging');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error setting up debug request: ' + error.message);
    }
  }
};