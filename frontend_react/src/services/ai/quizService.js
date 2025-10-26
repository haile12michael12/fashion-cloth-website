import axios from 'axios';
import { BASE_URL } from '../../helpers/config';

class QuizService {
  /**
   * Get all style quizzes
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getStyleQuizzes() {
    try {
      const response = await axios.get(`${BASE_URL}/api/style-quizzes`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Submit quiz responses
   * @param {number} id - The quiz ID
   * @param {Array} responses - Array of user responses
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async submitQuiz(id, responses) {
    try {
      const response = await axios.post(`${BASE_URL}/api/style-quizzes/${id}/submit`, { responses });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get user's style profile
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getStyleProfile() {
    try {
      const response = await axios.get(`${BASE_URL}/api/style-profile`);
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

export default QuizService;