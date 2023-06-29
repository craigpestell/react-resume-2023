import {Head, Html, Main, NextScript} from 'next/document';
import Script from 'next/script';

// next/document <Head /> vs next/head <Head />
//
// next/document Head is rendered once on the server. This is different from next/head which will
// rebuild the next/head fields each time it's called, and won't overwrite next/document's Head.

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        {/* google translate breaks react:
          - https://github.com/facebook/react/issues/11538
          - https://bugs.chromium.org/p/chromium/issues/detail?id=872770 */}
        <meta content="notranslate" name="google" />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-KCFTFCTSPW" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-KCFTFCTSPW');
        `}
      </Script>
      <body className="bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
