import { IS_DEVELOPMENT, SITE_NAME, BASE_URL } from "#lib/constants";
import SiteLogo from "#public/logo.png";

/**
 * @type {import("next-seo").DefaultSeoProps}
 */
export const defaultSEO = {
	defaultTitle: SITE_NAME,
	titleTemplate: `${SITE_NAME} | %s`,
	description: "Продавай и покупай легко с KVIK",
	openGraph: {
		type: "website",
		site_name: SITE_NAME,
		description: "Продавай и покупай легко с KVIK",
		images: [
			{
				url: `${BASE_URL}${SiteLogo.src}`,
				width: SiteLogo.width,
				height: SiteLogo.height,
				type: 'image/png'
			}
		]
	}
}

// отключаем всяких гуглботов при разработке
// делаем так, потому что из доки непонятно, достаточно ли значения `false`
// или ключ должен вообще отсутствовать
if (IS_DEVELOPMENT) {
	defaultSEO.dangerouslySetAllPagesToNoFollow = IS_DEVELOPMENT
	defaultSEO.dangerouslySetAllPagesToNoIndex = IS_DEVELOPMENT
}

/**
 * @typedef SeoGeneratorProps
 * @property {string} link
 * @property {string} title
 * @property {string} description
 */

/**
 * @param {SeoGeneratorProps} props
 * @example
 * ```javascript
 * const seoProps = generateSEOProps();
 * 
 * <NextSeo {...seoProps}/>
 * ```
 * @returns {import("next-seo").NextSeoProps} Объект, который можно скормить спредом в `<NextSeo>`
 */
export const createSEOProps = ({ link = undefined, title = undefined, description = undefined }) => {
	// объект собирается так, чтобы избегать `undefined` полей
	/**
	 * @type {import("next-seo").NextSeoProps}
	 */
	const seoProps = {
	};

	const isOpengraph = Boolean(link || title || description);

	if (isOpengraph) {
		seoProps.openGraph = {}
	}

	if (link) {
		const url = new URL(link, BASE_URL).toString();
		seoProps.canonical = url;
		seoProps.openGraph.url = url;
	}

	if (title) {
		seoProps.title = title;
		seoProps.openGraph.title = title;
	}

	if (description) {
		seoProps.description = description;
		seoProps.openGraph.description = description;
	}

	return seoProps;
}