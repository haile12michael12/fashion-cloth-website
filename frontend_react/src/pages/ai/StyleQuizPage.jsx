import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Spinner from '../../ui/Spinner';

const StyleQuiz = lazy(() => import('../../components/ai/quiz/StyleQuiz'));

const StyleQuizPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={t('style_quiz')}
        description={t('discover_your_fashion_personality')}
      />
      <Suspense fallback={<Spinner />}>
        <StyleQuiz />
      </Suspense>
    </div>
  );
};

export default StyleQuizPage;