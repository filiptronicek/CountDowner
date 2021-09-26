import "../styles/globals.css";
import "../components/locale/i18n";

import type { AppProps } from "next/app";
import React from "react";

function CountDowner({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default CountDowner;
