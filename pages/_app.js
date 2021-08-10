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
import MutateProvider from '../lib/Context/MutateCTX';
import {ErrorBoundary} from '../components/ErrorBoundary';
import CityProvider from '../lib/Context/CityCTX';



function MyApp({ Component, pageProps }) {

	//! Проверка на мобилки
	// setTimeout(() => {
	// 	if(/Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent)){
	// 	console.log("Location: Ваш сайт моб. версия");
	// 	} else { console.log("Not mobile") }
	// }, 1500)

   return (
		<ErrorBoundary>
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
						<CityProvider>
							<MutateProvider>
								<MainLayout>
									<CssBaseline/>
									<Component {...pageProps} />
								</MainLayout>
							</MutateProvider>
						</CityProvider>
					</ThemeProvider>
				</AuthProvider>
			</SWRConfig>
		</ErrorBoundary>
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