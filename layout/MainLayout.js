import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import HeaderMobile from "../components/header/HeaderMobile";
import { useMedia } from "../hooks/useMedia";
import { useRouter } from "next/router";

const MainLayout = ({ children}) => {

  const { matchesMobile, matchesTablet, matchesCustom1024 } = useMedia();
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
        {matchesCustom1024 || matchesTablet && router.pathname != "/404" && router.pathname != "/500" ? <HeaderMobile chageMenu={true}/> : null}
        {matchesMobile && router.pathname != "/404" && router.pathname != "/500" && <HeaderMobile />}
        <>{children}</>
      </div>
      {router.pathname == "/" || router.pathname == "/search/[alias]" 
				? matchesTablet || matchesMobile && <Footer /> 
				: <Footer/>}
    </>
  );
  //.makeStyles-root-114
};

export default MainLayout;