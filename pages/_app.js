import Head from 'next/head';
import Router from "next/router";
import withYM from "next-ym";
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
import { ErrorBoundary } from '../components/ErrorBoundary';
import CityProvider from '../lib/Context/CityCTX';
import StoreProvider from '../lib/Context/Store';

export default withYM("85786957", Router)(
	function MyApp({ Component, pageProps }) {
		return (
			<ErrorBoundary>
				<SWRConfig
					value={{
						fetcher: fetch,
						onError: (err) => {
							console.error(err)
						},
					}}
				>
					<Head>
						<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
					</Head>
					<AuthProvider>
						<ThemeProvider theme={theme}>
							<StoreProvider>
								<CityProvider>
									<MainLayout>
										<CssBaseline />
										<Component {...pageProps} />
									</MainLayout>
								</CityProvider>
							</StoreProvider>
						</ThemeProvider>
					</AuthProvider>
				</SWRConfig>
			</ErrorBoundary>
		)
	}
);


