// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="countdowner" />
          <link rel="manifest" href="manifest.json" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="theme-color" content="#0C0A13" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
