import {useRouter} from "next/router";

export const useCustomRouter = () => {
    const router = useRouter();

    /**
     * Проверяем по query есть ли совпадения
     * Если пришедший url не пустой и есть совпадение с текущей страницей
     * @param {urlCompare} String
     * @returns Boolean
     */
    const compareUrl = urlCompare => urlCompare && router.route.includes(urlCompare)

    const handlePushLocation = (location, query = {}) => {
        router.push({pathname: location, query: {...query}})
    }

    const handleBackLocation = () => router.back()

    return {
        router,
        compare: compareUrl,
        pushTo: handlePushLocation,
        goBack: handleBackLocation
    }
}
