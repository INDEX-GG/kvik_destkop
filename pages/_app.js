import Head from 'next/head';
import { SWRConfig } from 'swr'
import 'swiper/swiper.scss';
import "swiper/components/thumbs/thumbs.min.css";
import '../sass/style.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../UI/theme';
import fetch from '../lib/fetchJson';
import AuthProvider from '../lib/Context/AuthCTX';
import MainLayout from '../layout/MainLayout';

function MyApp({ Component, pageProps }) {

   return (
		<SWRConfig 
		value={{
			fetcher: fetch,
			onError: (err) => {
			console.error(err)
			},}}
		>
			<Head>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<MainLayout>
						<CssBaseline/>
						<Component {...pageProps} />
					</MainLayout>
				</ThemeProvider>
			</AuthProvider>
		</SWRConfig>
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