import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const StyleQuiz = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample quiz questions
  const questions = [
    {
      id: 1,
      question: t('what_your_preferred_color_palette'),
      options: [
        { id: 'a', text: t('bright_vibrant') },
        { id: 'b', text: t('neutral_muted') },
        { id: 'c', text: t('dark_edgy') },
        { id: 'd', text: t('pastel_soft') }
      ]
    },
    {
      id: 2,
      question: t('what_your_preferred_style'),
      options: [
        { id: 'a', text: t('casual_comfortable') },
        { id: 'b', text: t('formal_professional') },
        { id: 'c', text: t('trendy_fashionable') },
        { id: 'd', text: t('classic_timeless') }
      ]
    },
    {
      id: 3,
      question: t('what_your_preferred_occasion'),
      options: [
        { id: 'a', text: t('work_office') },
        { id: 'b', text: t('weekend_leisure') },
        { id: 'c', text: t('special_events') },
        { id: 'd', text: t('travel_vacation') }
      ]
    }
  ];

  const handleAnswer = (questionId, answerId) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would call the backend API
      // For now, we'll simulate a response
      setTimeout(() => {
        setCompleted(true);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError(t('error_occurred'));
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-green-500 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">{t('quiz_completed')}</h2>
            <p className="text-teal-100">{t('discover_your_fashion_personality')}</p>
          </div>
          
          <div className="p-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">{t('congratulations')}</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>{t('your_style_profile_is_ready')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">{t('your_style_profile')}</h3>
              <div className="border rounded-lg p-5 bg-gradient-to-br from-purple-50 to-indigo-50">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">{t('style_type')}</p>
                  <p className="text-lg font-bold text-gray-800">{t('casual')}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">{t('color_preferences')}</p>
                  <p className="text-lg font-bold text-gray-800">{t('neutral_tones')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{t('recommended_brands')}</p>
                  <p className="text-lg font-bold text-gray-800">{t('brand_examples')}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300"
            >
              {t('retake_quiz')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{t('style_personality_quiz')}</h2>
          <p className="text-teal-100">{t('discover_your_fashion_personality')}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {t('question')} {currentQuestion + 1} {t('of')} {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-teal-500 to-blue-500 h-2.5 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 mb-6 bg-gradient-to-br from-blue-50 to-teal-50">
            <h3 className="text-xl font-bold mb-4 text-gray-800">{currentQ.question}</h3>
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${option.id}`}
                    name={`question-${currentQ.id}`}
                    value={option.id}
                    checked={answers[currentQ.id] === option.id}
                    onChange={() => handleAnswer(currentQ.id, option.id)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                  />
                  <label 
                    htmlFor={`option-${option.id}`} 
                    className="ml-3 block text-gray-700"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
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
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`py-2 px-4 rounded-lg font-bold transition duration-300 ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600 text-white shadow hover:shadow-md'
              }`}
            >
              {t('previous')}
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className={`py-2 px-4 rounded-lg font-bold transition duration-300 ${
                !answers[currentQ.id]
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {currentQuestion === questions.length - 1 ? t('submit') : t('next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleQuiz;