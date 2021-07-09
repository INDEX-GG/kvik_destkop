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
import { Container, makeStyles, Typography } from "@material-ui/core";
import PopularCategories from "../components/PopularCategories/PopularCategories";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 12px',
    },
}));

const Index = ({ offers }) => {
	console.log(offers)
  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
  const [data, setData] = useState(offers);
  const classes = useStyles();
  
  useEffect(() => {
    axios.post('/api/getPosts', { of: 0 })
      .then((res) => setData(res.data.result))
  }, []);

  return (
    <MainLayout footer={true} title={'Доска объявлений'}>
      <Container className={classes.root}>
        <PopularCategories/>
      
	  </Container>
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