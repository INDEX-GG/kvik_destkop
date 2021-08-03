import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import HeaderMobile from "../components/header/HeaderMobile";
import { useMedia } from "../hooks/useMedia";
import { useRouter } from "next/router";
import aliasName from "../components/header/CategoriesAliaseName";
import { ellipsis } from "../lib/services";

const MainLayout = ({ children}) => {
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
	const router = useRouter();
  const aliasQuery = router.asPath.split("/").splice(2,).join("")
  const [alias, setAlias] = useState("test")

  if (router.pathname == "/search/[alias]") {
    if (alias != aliasQuery) {
      setAlias(aliasQuery)
    }  
  }

  const finalName = aliasName(alias) == null ? null : aliasName(alias)[0].label

  return (
    <>
      <div>
		    {!matchesMobile && !matchesTablet && <Header category={finalName == null ? null : ellipsis(finalName[0].toUpperCase() + finalName.substring(1, ), 20)}/>}
        {matchesTablet && <HeaderMobile chageMenu={true} />}
        {matchesMobile && <HeaderMobile />}
        <>{children}</>
        {router.pathname == "/" ? matchesTablet || matchesMobile ? <Footer/> : null : <Footer/>}
      </div>
    </>
  );
  //.makeStyles-root-114
};

export default MainLayout;