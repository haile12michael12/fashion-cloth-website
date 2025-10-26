import React, { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Spinner from '../../ui/Spinner';

const LookBook = lazy(() => import('../../components/ai/lookbook/LookBook'));

const LookBookPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title={t('look_book')}
        description={t('create_and_share_fashion_looks')}
      />
      <Suspense fallback={<Spinner />}>
        <LookBook />
      </Suspense>
    </div>
  );
};

export default LookBookPage;