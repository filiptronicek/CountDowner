import Head from "next/head";

const PageHead = (props: {
  titlePrefix?: string;
  name?: string;
  date?: string;
}): JSX.Element => {
  const { titlePrefix, name, date } = props;
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
