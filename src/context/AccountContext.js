import React, {createContext, useContext, useMemo} from 'react';
import {useStore} from "#lib/Context/Store";

const AccountContext = createContext();
export const useAccountContext = () => useContext(AccountContext);

const AccountProvider = ({children}) => {
    const {userInfo} = useStore();

    const isLoading = useMemo(() => typeof userInfo === 'undefined', [userInfo])

    const providerValue = useMemo(() => {
        return {
            userInfo,
            isLoading
        }
    }, [userInfo])

    console.log(userInfo);


    return (
        <AccountContext.Provider value={providerValue}>
            {children}
        </AccountContext.Provider>
    )
}

export default React.memo(AccountProvider)
