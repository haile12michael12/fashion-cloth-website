import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Spinner from '../../ui/Spinner';

const VirtualTryOn = lazy(() => import('../../components/ai/tryon/VirtualTryOn'));

const VirtualTryOnPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={t('virtual_try_on')}
        description={t('try_clothes_virtually')}
      />
      <Suspense fallback={<Spinner />}>
        <VirtualTryOn />
      </Suspense>
    </div>
  );
};

export default VirtualTryOnPage;