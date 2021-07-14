import Footer from "../components/Footer";
import Header from "../components/header/Header";
import Head from "next/head";
import HeaderMobile from "../components/header/HeaderMobile";
import { useMedia } from "../hooks/useMedia";

const MainLayout = ({ children, title = "", isIndex }) => {
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

  return (
    <>
      <Head>
        <title>KVIK {title}</title>
      </Head>
      <div>{!matchesMobile && !matchesTablet && <Header />}
        {matchesTablet && <HeaderMobile chageMenu={true} />}
        {matchesMobile && <HeaderMobile />}
        <>{children}</>
      </div >
      {!isIndex && <Footer />}
    </>
  );
};

export default MainLayout;
