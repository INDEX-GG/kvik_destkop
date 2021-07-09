import Footer from "../components/Footer";
import Header from "../components/header/Header";
import Head from "next/head";
import HeaderMobile from "./HeaderMobile";
import { useMedia } from "../hooks/useMedia";

const MainLayout = ({ children, title = "", footer }) => {
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

  return (
    <>
      <Head>
        <title>KVIK {title}</title>
      </Head>
      {!matchesMobile && !matchesTablet && <Header />}
      {matchesTablet && <HeaderMobile chageMenu={true} />}
      {matchesMobile && <HeaderMobile />}
      <>{children}</>
      {!footer && <Footer />}
    </>
  );
};

export default MainLayout;
