//import { useMedia } from '#hooks/useMedia';
//import { useAuth } from '#lib/Context/AuthCTX';
import user from '#pages/api/user';
//import { useRouter } from 'next/router';
import React, { useContext } from 'react'

const UserContext = React.createContext({});
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({children}) => {
    //const {id} = useAuth();
    //const router = useRouter();
    //const {matchesMobile, matchesTablet} = useMedia();

    return (
        <UserContext.Provider value={{userData: {...user,}, }}>
            {children}
        </UserContext.Provider>
    );
}

export default React.memo(UserProvider);


