import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import HeaderMobile from "../components/header/HeaderMobile";
import { useMedia } from "../hooks/useMedia";
import { useRouter } from "next/router";
import aliasName from "../components/header/CategoriesAliaseName";
import { ellipsis } from "../lib/services";

const MainLayout = ({ children}) => {
	
  const { matchesMobile, matchesTablet, matchesCustom1024 } = useMedia();
  const router = useRouter();
  const aliasQuery = router.asPath.split("/").splice(2,).join("")
  const [alias, setAlias] = useState("test")

  if (router.pathname == "/search/[alias]") {
    if (alias != aliasQuery) {
      setAlias(aliasQuery)
    }  
  }

   const categoryName = aliasName(alias) ? aliasName(alias)[0].label : router?.query?.text ? router?.query?.text : null 

  const generateStr = (str) => {
	return  str[0].toUpperCase() + str.substring(1,);
  }


  return (
    <>
      <div>
		{!matchesMobile && !matchesTablet && <Header category={categoryName? ellipsis(generateStr(categoryName), 20) : null}/>}
        {matchesCustom1024 || matchesTablet && router.pathname != "/404" && router.pathname != "/500" ? <HeaderMobile chageMenu={true}/> : null}
        {matchesMobile && router.pathname != "/404" && router.pathname != "/500" && <HeaderMobile />}
        <>{children}</>
      </div>
      {router.pathname == "/" || router.pathname == "/search/[alias]" ? matchesTablet || matchesMobile ? <Footer/> : null : <Footer/>}
    </>
  );
  //.makeStyles-root-114
};

export default MainLayout;