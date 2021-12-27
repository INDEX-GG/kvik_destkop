import { IS_DEVELOPMENT, SITE_NAME, BASE_URL } from "#lib/constants"
import SiteLogo from "#public/logo.png";

console.log(SiteLogo);
/**
 * @type {import("next-seo").DefaultSeoProps}
 */
export const defaultSEO = {
	defaultTitle: SITE_NAME,
	titleTemplate: `${SITE_NAME} | %s`,
	// отключаем всяких гуглботов при разработке
	dangerouslySetAllPagesToNoFollow: IS_DEVELOPMENT,
	dangerouslySetAllPagesToNoIndex: IS_DEVELOPMENT,
	openGraph: {
		type: "website",
		site_name: SITE_NAME,
		images: [
			{
				url: `${BASE_URL}${SiteLogo.src}`,
				type: 'image/png'
			}
		]
	}
}