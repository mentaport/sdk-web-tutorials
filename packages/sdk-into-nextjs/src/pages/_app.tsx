import Head from 'next/head';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '@styles/theme/simpleTheme';

import {createEmotionCache} from '@lib/emotion/createEmotionCache';
;
import MentaportProvider from '@lib/mentaport/provider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (

      <CacheProvider value={emotionCache}>
        <Head>
          <title>SDK Intro</title>
          <meta name="description" content="Mentaport SDK Into" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
         
        </Head>
        
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
            <MentaportProvider >
              <Component {...pageProps} />
            </MentaportProvider>
        </ThemeProvider>
      </CacheProvider>
  );
}
export default  MyApp
