import Head from "next/head";
import { DefaultSeo } from 'next-seo';
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
import { defaultSEO } from "#lib/seo";
import { ErrorBoundary } from '../components/ErrorBoundary';
import CityProvider from '../lib/Context/CityCTX';
import StoreProvider from '../lib/Context/Store';
import StatisticsProvider from '../lib/Context/StatisticsCTX';
import LoginDrawerProvider from '../lib/Context/DialogCTX';
import YandexMetrika from "../src/components/AnyPage/YandexMetrika/YandexMetrika";


export default function MyApp({ Component, pageProps }) {
	return (
		<ErrorBoundary>
			<DefaultSeo {...defaultSEO}/>
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
					<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
					<meta name="yandex-verification" content="031fa8de208fc9ad" />
				</Head>
				<YandexMetrika>
				<AuthProvider>
					<ThemeProvider theme={theme}>
						<StatisticsProvider>
							<StoreProvider>
								<CityProvider>
									<LoginDrawerProvider>
										<MainLayout>
											<CssBaseline />
											<Component {...pageProps} />
										</MainLayout>
									</LoginDrawerProvider>
								</CityProvider>
							</StoreProvider>
						</StatisticsProvider>
					</ThemeProvider>
				</AuthProvider>
				</YandexMetrika>
			</SWRConfig>
		</ErrorBoundary>
	)
}
