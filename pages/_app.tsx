import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';

import type {AppProps} from 'next/app';
import Script from 'next/script';
import {memo} from 'react';

const gid = `G-KCFTFCTSPW`;
const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
  return (
    <>
      <Script id="googletagmanager" src={`https://www.googletagmanager.com/gtag/js?id=${gid}`} strategy="lazyOnload" />

      <Script id="gtag" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gid}', { 
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

      <Component {...pageProps} />
    </>
  );
});

export default MyApp;
