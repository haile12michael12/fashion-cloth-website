import axios from 'axios';
import { BASE_URL } from '../../helpers/config';

class TryOnService {
  /**
   * Upload image for virtual try-on
   * @param {File} image - The face image file
   * @param {number} pictureId - The clothing item ID
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async uploadTryOnImage(image, pictureId) {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('picture_id', pictureId);
    
    try {
      const response = await axios.post(`${BASE_URL}/api/tryon/upload`, formData, {
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
   * Get try-on result
   * @param {number} id - The try-on session ID
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getTryOnResult(id) {
    try {
      const response = await axios.get(`${BASE_URL}/api/tryon/result/${id}`);
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

export default TryOnService;