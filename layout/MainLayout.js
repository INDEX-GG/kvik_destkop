import {useState} from "react";
import Footer from '../src/components/AnyPage/Footer/Footer'
import Header from "../components/header/Header";
import HeaderMobile from "../components/header/HeaderMobile";
import {useMedia} from "../hooks/useMedia";
import {useRouter} from "next/router";
import withAuth from "#components/hoc/withAuthRedirect";

const MainLayout = ({children}) => {

    const {matchesMobile, matchesTablet, matchesCustom1024} = useMedia();
    const router = useRouter();
    const aliasQuery = router.query.alias
    const [alias, setAlias] = useState("test")
    
    if (router.pathname == "/search/[alias]") {
        if (alias != aliasQuery) {
            setAlias(aliasQuery)
        }
    }

    return (
        <>
            <div>
                {!matchesMobile && !matchesTablet && <Header/>}
                {matchesCustom1024 || matchesTablet && router.pathname != "/404" && router.pathname != "/500" ?
                    <HeaderMobile chageMenu={true}/> : null}
                {matchesMobile && router.pathname != "/404" && router.pathname != "/500" && <HeaderMobile/>}
                <>{children}</>
            </div>     
     
            {router.pathname == "/" || router.pathname == "/search/[alias]"
                ? matchesTablet || matchesMobile && <Footer/>
                : <Footer/>
            }
            <div style={{
                overflow: 'hidden',
                height: '0',
                width: '0'
            }}>Verification: 031fa8de208fc9ad</div>
        </>
    );
};

export default withAuth(MainLayout);



