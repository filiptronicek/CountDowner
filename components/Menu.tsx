import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      {/* PC navbar */}
      <div className="w-full text-xm bg-[#262A2B] text-white cursor-pointer h-14">
        <Link className="float-left p-4 hover:bg-[#181818]" href="/">
          {t('Home')}
        </Link>
        <Link href="/create" className="float-left p-4 hover:bg-[#181818]">
          {t('Create countdown')}
        </Link>
        <Link
          href="https://github.com/filiptronicek/CountDowner"
          className="float-left p-4 hover:bg-[#181818]"
          target="_blank"
          rel="noreferrer noopener"
        >
          {t('Source code')}
        </Link>
      </div>
    </>
  );
};

export default Navbar;
