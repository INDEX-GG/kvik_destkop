import {useRouter} from "next/router";

export const useCustomRouter = () => {
    const router = useRouter();

    const handlePushLocation = (location, query = {}) => {
        router.push({pathname: location, query: {...query}})
    }

    const handleBackLocation = () => router.back()

    return {
        router,
        pushTo: handlePushLocation,
        goBack: handleBackLocation
    }
}
