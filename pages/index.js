import { useState, useEffect } from "react";
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
import { getDataByQuery } from '../lib/services';
import { PrismaClient } from '@prisma/client';
import { Container, Typography } from "@material-ui/core";

const Index = ({ offers }) => {
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
  const [openSort, setShowSort] = useState();
  const [data, setData] = useState(offers);
  
  useEffect(() => {
    axios.post('/api/getPosts', { of: 0 })
      .then((res) => setData(res.data.result))
  }, []);

  return (
    <MainLayout footer={true} title={'Доска объявлений'}>
      <Container>
        <Typography variant='h2'>Популярные категории</Typography>
      </Container>
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

  const prisma = new PrismaClient();

  async function main(of) {
    //Этот запрос нужно будет связать с таблицей
    async function getPost() {
      const results = await prisma.posts.findMany({
        skip: of,
        take: 10,
        select: {
          id: true,
          category_id: true,
          price: true,
          photo: true,
          rating: true,
          created_at: true,
          delivery: true,
          reviewed: true,
          address: true,
          phone: true,
          trade: true,
          verify_moderator: true,
          commercial: true,
          secure_transaction: true,
          title: true,
          email: true
        }
      })
      return results;
    }

    const results = await getPost();
    
    return results;
  }


  let res = await main(0)
    .catch((e) => {
      console.log("error: " + e);
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  const offers = JSON.parse(JSON.stringify(res))
  return { props: { offers }}
  
}

export default Index;