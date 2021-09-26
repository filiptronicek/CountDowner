import Footer from '@components/Footer';
import Head from '@components/Head';
import Menu from '@components/Menu';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Head />

      <Menu />
      <main className="text-center items-center">
        <h1 className="text-3xl mb-12">{t('Oooof404')}</h1>
        <Link href="/" passHref>
          <span className="bg-[#262A2B] text-white p-5 mr-2 rounded-xl mb-8 cursor-pointer">
            {t('Back to main page')}
          </span>
        </Link>{' '}
        <Link href="/create" passHref>
          <span className="bg-[#262A2B] text-white p-5 ml-2 rounded-xl mb-8 cursor-pointer">
            {t('Create countdown')}
          </span>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
