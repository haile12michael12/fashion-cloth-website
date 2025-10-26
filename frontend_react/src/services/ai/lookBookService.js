import axios from 'axios';
import { BASE_URL } from '../../helpers/config';

class LookBookService {
  /**
   * Create a new look book
   * @param {Object} data - Look book data
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async createLookBook(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('is_public', data.isPublic);
    
    try {
      const response = await axios.post(`${BASE_URL}/api/look-books`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Add items to a look book
   * @param {number} id - The look book ID
   * @param {Array} items - Array of items to add
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async addLookBookItems(id, items) {
    try {
      const response = await axios.post(`${BASE_URL}/api/look-books/${id}/items`, { items });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a look book
   * @param {number} id - The look book ID
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getLookBook(id) {
    try {
      const response = await axios.get(`${BASE_URL}/api/look-books/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get all look books
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getLookBooks() {
    try {
      const response = await axios.get(`${BASE_URL}/api/look-books`);
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

export default LookBookService;