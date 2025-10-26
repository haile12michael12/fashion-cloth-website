import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Spinner from '../../ui/Spinner';

const MoodBoard = lazy(() => import('../../components/ai/moodboard/MoodBoard'));

const MoodBoardPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={t('mood_board')}
        description={t('create_your_fashion_mood_board')}
      />
      <Suspense fallback={<Spinner />}>
        <MoodBoard />
      </Suspense>
    </div>
  );
};

export default MoodBoardPage;