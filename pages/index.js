import React, { useState, useEffect } from "react";
import Footer2 from '../components/Footer2';
import Footer from '../components/Footer';
import AdCard_component from '../components/AdCard';
import ScrollTop from '../UI/ScrollTop';
import Slider_component from '../layout/Slider_component';
import AdBackground from "../UI/icons/AdBackground";
import Rectangle from "../UI/icons/Rectangle";
import { useMedia } from '../hooks/useMedia';
import MainLayout from '../layout/MainLayout';
import axios from "axios";
import { getDataByQuery } from "../components/services";

const Index = ({ offers }) => {
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
  const [openSort, setShowSort] = useState();

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const [data, setData] = useState(offers.result);

  useEffect(() => {
    axios.post('/api/getPosts', { of: 0 })
      .then((res) => setData(res.data.result))
    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MainLayout footer={true} title={'Доска объявлений'}>
      <h6 className="popular__categories">Популярные категории</h6>
      <Slider_component />
      <div className="bodyHome" id="bodyHome">
        <div className="offersTitleLine">
          <div className="offersTitleHome">Рекомендуемое</div>
          <div className="homeOffersSort">
            <button onClick={() => setShowSort(!openSort)} className="settingsOffersHome">По умолчанию <Rectangle /></button>
            {openSort &&
              <div id="homeOffersSortContainer" className="homeOffersSortContainer" >
                <button onClick={() => setShowSort(!openSort)} className="homeSortButton">По умолчанию</button>
                <button onClick={() => setShowSort(!openSort)} className="homeSortButton">Сначала новые</button>
                <button onClick={() => setShowSort(!openSort)} className="homeSortButton">Дешевле</button>
                <button onClick={() => setShowSort(!openSort)} className="homeSortButton">Дороже</button>
                <button onClick={() => setShowSort(!openSort)} className="homeSortButton">По удаленности</button>
              </div>
            }
          </div>
        </div>
        <div className="containerHome">
          <div className="scrollableOffersHome">
            {data && data.map((obj, i) => <AdCard_component key={i} offer={obj} />)}
          </div>
          {!matchesMobile && !matchesTablet &&
            <div className="rightColoumn" >
              <div className='rightColoumnContainer'>
                <div className="block1">
                  <AdBackground />
                </div>
                <div className="block2">ad block 2</div>
              </div>
              <div className='footer2' id='footer2'>
                <Footer2 />
              </div>
            </div>
          }
          <ScrollTop />
        </div>
      </div>
      {!matchesLaptop && !matchesDesktop && !matchesHD && <Footer />}
    </MainLayout >
  )
}

export async function getStaticProps() {
  const offers = await getDataByQuery('/api/getPosts', { of: 0 })
  return { props: { offers } }
}

export default Index;