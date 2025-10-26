import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AIStylist = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [mood, setMood] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would call the backend API
      // For now, we'll simulate a response
      setTimeout(() => {
        setRecommendations({
          outfits: [
            {
              id: 1,
              items: ['Blue jeans', 'White t-shirt', 'Black sneakers'],
              style: 'Casual'
            },
            {
              id: 2,
              items: ['Black pants', 'White blouse', 'Blazer', 'Loafers'],
              style: 'Business Casual'
            }
          ]
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError(t('error_occurred'));
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{t('ai_stylist')}</h2>
          <p className="text-purple-100">{t('get_personalized_fashion_recommendations')}</p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('upload_image')}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {image ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt="Preview" 
                        className="max-h-48 rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">{t('click_to_upload')}</span> {t('or_drag_and_drop')}</p>
                      <p className="text-xs text-gray-500">{t('png_jpg_max_5mb')}</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('mood')}
              </label>
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder={t('describe_your_mood')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !image}
              className={`w-full py-3 px-4 rounded-lg font-bold text-white transition duration-300 ${
                loading || !image 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('analyzing')}
                </div>
              ) : (
                t('get_recommendations')
              )}
            </button>
          </form>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {recommendations && (
            <div className="recommendations">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t('recommendations')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.outfits.map((outfit) => (
                  <div key={outfit.id} className="border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-3">
                      <div className="bg-purple-100 rounded-full p-2 mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">{outfit.style}</h4>
                    </div>
                    <ul className="space-y-2">
                      {outfit.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStylist;