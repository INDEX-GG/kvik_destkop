import Footer from "../components/Footer";
import Header from "../components/header/Header";
import HeaderMobile from "../components/header/HeaderMobile";
import { useMedia } from "../hooks/useMedia";
import { useRouter } from "next/router";

const MainLayout = ({ children}) => {
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
	const router = useRouter();
	// console.log(router);

  return (
    <>
      <div>
		{!matchesMobile && !matchesTablet && <Header />}
        {matchesTablet && <HeaderMobile chageMenu={true} />}
        {matchesMobile && <HeaderMobile />}
        <>{children}</>
      </div >
      {!matchesLaptop && !matchesDesktop && !matchesHD && <Footer />}
    </>
  );
};

export default MainLayout;