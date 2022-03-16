import React, {createContext, useContext, useMemo} from 'react';
import {useStore} from "#lib/Context/Store";
import {useMedia} from '#hooks/useMedia'

const AccountContext = createContext();
export const useAccountContext = () => useContext(AccountContext);

const AccountProvider = ({children}) => {
    const {userInfo} = useStore();
    // const {setIsLogout} = useStatistics()
    const {matchesMobile, matchesTablet} = useMedia()

    const isLoading = useMemo(() => typeof userInfo === 'undefined', [userInfo])

    const isMobile = useMemo(() => !!(matchesMobile || matchesTablet), [
		matchesMobile,
		matchesTablet,
	])

    const providerValue = useMemo(() => {
        return {
            userInfo,
            isLoading,
            isMobile,
        }
    }, [userInfo])

    // console.log(userInfo);

    // const logOut = async () => {
    //     setIsLogout(true)
    //     axios.get("/api/logout").then(() => {
    //         mutate("/api/user");
    //         signOut();
    //         router.push("/");
    //     });
    // };

    return (
        <AccountContext.Provider value={providerValue}>
            {children}
        </AccountContext.Provider>
    )
}

export default React.memo(AccountProvider)
