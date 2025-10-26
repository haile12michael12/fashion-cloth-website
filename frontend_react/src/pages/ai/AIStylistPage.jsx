import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Spinner from '../../ui/Spinner';

const AIStylist = lazy(() => import('../../components/ai/stylist/AIStylist'));

const AIStylistPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={t('ai_stylist')}
        description={t('get_personalized_fashion_recommendations')}
      />
      <Suspense fallback={<Spinner />}>
        <AIStylist />
      </Suspense>
    </div>
  );
};

export default AIStylistPage;