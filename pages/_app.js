import App from 'next/app'
import Head from 'next/head';
import 'swiper/swiper.scss';
import "swiper/components/thumbs/thumbs.min.css";
import '../sass/style.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
         </Head>
            <CssBaseline/>
         <Component {...pageProps} />
      </>
   )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp