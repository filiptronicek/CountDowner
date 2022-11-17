import Link from 'next/link';
import fetch, { Response } from 'node-fetch';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

type contributorType = {
  login: string;
  type: 'Bot' | 'User' | 'Organization';
  avatar_url: string;
  html_url: string;
};

/**
 * A Footer component for the page.
 * It dynamically loads the project's contributors from the GitHub API and displays them.
 * @returns the site's footer
 */
const Footer = (): JSX.Element => {
  const { t } = useTranslation();
  const [contributors, setContributors] = useState(['filiptronicek']);

  useEffect(() => {
    fetch('https://api.github.com/repos/filiptronicek/CountDowner/contributors')
      .then((response: Response) => {
        // Check for errors
        if (!response.ok) {
          toast.error(`${t('error.contributors')}: (${response.status})`);
          return [{ login: 'filiptronicek', type: 'User' }];
        }
        return response.json();
      })
      .then((responseJson: contributorType[]) => {
        const exemptUsers = ['ImgBotApp'];
        const contributorLogins = responseJson
          .filter(
            (contributor: contributorType) =>
              contributor.type !== 'Bot' &&
              !exemptUsers.includes(contributor.login),
          )
          .map((contributor: contributorType) => contributor.login);
        setContributors(contributorLogins);
      })
      .catch((_error: string) => {
        toast.error(
          `There was an error fetching the contributors. Please try again later.`,
        );
      });
  }, [t]);

  return (
    <footer>
      <Toaster />
      <span>
        {`${t('By')}`}{' '}
        {contributors.map((contributor) => {
          const index = contributors.indexOf(contributor);
          return (
            <Link
              key={index}
              href={`https://github.com/${contributor}`}
              passHref
            >
              @
              {`${contributor}${index !== contributors.length - 1 ? ', ' : ''}`}
            </Link>
          );
        })}{' '}
        with 💖
      </span>
    </footer>
  );
};

export default Footer;
