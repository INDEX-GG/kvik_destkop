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

function Index({post}) {

  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();

  const [openSort, setShowSort] = useState();

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };




  useEffect(() => {
    axios.post('./api/getPosts', {of: 0})
    .then((res) => console.log(res))

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const obj = [
    { id: 1, title: "Toyota Mark II jxz90", objImg: [{ img: "https://source.unsplash.com/random?cars" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 200000, newPrice: 180000, city: "Челябинск", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 2, title: "Toyota Altezza", objImg: [{ img: "https://source.unsplash.com/random?forest" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: '', newPrice: 400000, city: "Челябинск", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: false, like: true, compare: false, delivery: false, security: true },
    { id: 3, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?land" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 4, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?tools" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 5, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?cars" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 6, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?moto" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 0, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 7, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?house" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 8, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?dog" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 2, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 9, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?smail" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 10, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?animals" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 11, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?boat" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: true, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true },
    { id: 12, title: "Lexus RX350", objImg: [{ img: "https://source.unsplash.com/random?region" }, { img: "https://source.unsplash.com/random" }, { img: "https://source.unsplash.com/random?interior" }], oldPrice: 800000, newPrice: 790000, city: "Александровск-Сахалинский", date: "2021-05-19T12:03:51.000000Z", seen: false, status: 1, call: true, message: true, like: true, compare: false, delivery: true, security: true }
  ];

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
            {obj.map((obj) => <AdCard_component objs={obj} />)}
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

/* Index.getInitialProps = async (ctx) => {
  axios.post('./api/getPosts', {of: 0})
  .then((res) => console.log(res))
  return(
    

{qwe: 1232}
   
  )

} */

export default Index;