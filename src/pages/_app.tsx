import "../assets/css/styles.scss";
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Router from "next/router";
import React, { Fragment } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apolloClient";

import { wrapper } from "../store";
import * as gtag from "../utils/gtag";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  Router.events.on("routeChangeComplete", (url: string) => gtag.pageview(url));
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--main-font",
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <style jsx global>{`
      :root {
        --main-font: ${poppins.style.fontFamily};
      }
    `}</style>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </Fragment>
);

export default wrapper.withRedux(MyApp);
