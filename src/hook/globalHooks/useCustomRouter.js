import {useRouter} from "next/router";

export const useCustomRouter = () => {
    const router = useRouter();

    const handlePushLocation = (location, query = {}) => {
        router.push({pathname: location, query: {...query}})
    }

    const handleBackLocation = () => router.back()

    const getCurrnePathname = () => {
        return router.pathname
    }

    return {
        router,
        pushTo: handlePushLocation,
        goBack: handleBackLocation,
        getCurrnePathname,
    }
}
