import Head from 'next/head';
import React from 'react';

/**
 * A dynamically configurable <head> of the site.
 * @param props -
 * @param props.titlePrefix - a string to be prepended to the site's `<title>` element.
 * @param props.name - a name of an event which is currently counted down to.
 * @param props.date - a formatted difference between the current time and the event.
 * @returns a Head element.
 */
const PageHead = (props: {
  titlePrefix?: string;
  name?: string;
  date?: string;
}): JSX.Element => {
  const { titlePrefix, name, date } = props;
  const imageText = `Countdown to **${name}**`;
  const imageURL =
    name &&
    date &&
    `https://countdowner-og.vercel.app/${encodeURIComponent(
      imageText,
    )}.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fraw.githubusercontent.com%2Ffiliptronicek%2FCountDowner%2Fmain%2Fpublic%2Fapple-touch-icon.png`;
  return (
    <Head>
      <title>{titlePrefix && `${titlePrefix} |`} CountDowner</title>
      {name ? (
        <meta name="description" content={`A countdown to ${date}`} />
      ) : (
        <meta name="description" content="An app for generating countdowns" />
      )}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest"></link>

      <meta name="description" content="An app for generating countdowns" />

      <meta property="og:type" content="website" />
      {name ? (
        <>
          <meta
            property="og:title"
            content={`CountDown to ${name} | CountDowner`}
          />
          <meta property="og:image" content={imageURL} />
          <meta property="og:description" content={`A countdown to ${date}`} />
        </>
      ) : (
        <>
          <meta property="og:title" content="CountDowner" />
          <meta
            property="og:description"
            content="An app for generating countdowns"
          />
        </>
      )}

      {name ? (
        <>
          <meta
            property="twitter:title"
            content={`CountDown to ${name} | CountDowner`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={imageURL} />
          <meta name="twitter:description" content={`A countdown to ${date}`} />
        </>
      ) : (
        <>
          <meta property="twitter:title" content="CountDowner" />
          <meta
            name="twitter:description"
            content="An app for generating countdowns"
          />
        </>
      )}
    </Head>
  );
};

export default PageHead;
