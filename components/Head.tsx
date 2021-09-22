import Head from "next/head";

const PageHead = (props: {
  titlePrefix?: string,
}): JSX.Element => {
  const { titlePrefix } = props;
  return (
    <Head>
      <title>{titlePrefix && `${titlePrefix} |`} CountDowner</title>
      <meta name="description" content="An app for generating countdowns" />
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
      
      <title>CountDowner</title>
      <meta name="description" content="An app for generating countdowns" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="CountDowner" />
      <meta property="og:description" content="An app for generating countdowns" />

      <meta name="twitter:title" content="CountDowner" />
      <meta name="twitter:description" content="An app for generating countdowns" />            
    </Head>
  );
};

export default PageHead;
