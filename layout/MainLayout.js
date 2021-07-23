import Footer from "../components/Footer";
import Header from "../components/header/Header";
import HeaderMobile from "../components/header/HeaderMobile";
import { useMedia } from "../hooks/useMedia";
import { useRouter } from "next/router";

const MainLayout = ({ children}) => {
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
	const router = useRouter();

  return (
    <>
      <div>
		    {!matchesMobile && !matchesTablet && <Header />}
        {matchesTablet && <HeaderMobile chageMenu={true} />}
        {matchesMobile && <HeaderMobile />}
        <>{children}</>
      </div>
      {router.pathname == "/" ? matchesTablet || matchesMobile ? <Footer/> : null : <Footer/>}
    </>
  );
  //.makeStyles-root-114
};

export default MainLayout;