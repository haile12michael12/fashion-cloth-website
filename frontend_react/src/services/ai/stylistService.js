import axios from 'axios';
import { BASE_URL } from '../../helpers/config';

class AIStylistService {
  /**
   * Get outfit recommendations based on an image
   * @param {File} image - The image file to analyze
   * @param {string} mood - Optional mood description
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getOutfitRecommendations(image, mood = null) {
    const formData = new FormData();
    formData.append('image', image);
    if (mood) formData.append('mood', mood);
    
    try {
      const response = await axios.post(`${BASE_URL}/api/ai-stylist/recommend`, formData, {
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
   * Get color-based recommendations
   * @param {File} image - The image file to analyze
   * @returns {Promise} - Promise that resolves to the API response
   */
  static async getColorRecommendations(image) {
    const formData = new FormData();
    formData.append('image', image);
    
    try {
      const response = await axios.post(`${BASE_URL}/api/ai-stylist/recommend-color`, formData, {
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

export default AIStylistService;