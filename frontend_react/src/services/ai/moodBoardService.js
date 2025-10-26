import axios from 'axios';
import { BASE_URL } from '../../helpers/config';

class MoodBoardService {
  /**
   * Create a new mood board
   * @param {Object} data - Mood board data
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async createMoodBoard(data) {
    try {
      const response = await axios.post(`${BASE_URL}/api/mood-boards`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update a mood board
   * @param {number} id - The mood board ID
   * @param {Object} data - Mood board data to update
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async updateMoodBoard(id, data) {
    try {
      const response = await axios.put(`${BASE_URL}/api/mood-boards/${id}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a mood board
   * @param {number} id - The mood board ID
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getMoodBoard(id) {
    try {
      const response = await axios.get(`${BASE_URL}/api/mood-boards/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Share a mood board
   * @param {string} token - The share token
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async shareMoodBoard(token) {
    try {
      const response = await axios.get(`${BASE_URL}/api/mood-boards/share/${token}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle API errors
   * @param {Object} error - The error object
   * @returns {Error} - Formatted error
   */
  static handleError(error) {
    if (error.response) {
      // Server responded with error status
      return new Error(error.response.data.error || 'An error occurred');
    } else if (error.request) {
      // Request was made but no response received
      return new Error('No response from server');
    } else {
      // Something else happened
      return new Error(error.message || 'An unknown error occurred');
    }
  }
}

export default MoodBoardService;