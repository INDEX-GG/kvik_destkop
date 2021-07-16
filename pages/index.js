import { useState, useEffect } from "react";
import Footer2 from '../components/Footer2';
import { useMedia } from '../hooks/useMedia';
import MainLayout from '../layout/MainLayout';
import axios from "axios";
import { PrismaClient } from '@prisma/client';
import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import OffersRender from "../components/OffersRender";
import JokerBlock from "../components/JokerBlock";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 12px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '0 8px',
    },
  },
  main: {
    display: 'flex',
    height: '100%',
  },
  offers: {
    flexGrow: 1,
  },
  rightBlock: {
    height: '100%',
    marginLeft: '56px',
  },
  footer: {
    top: 'calc(100% - 205px)',
    position: 'sticky',
  }
}));

const Index = ({ offers }) => {

  const { matchesMobile, matchesTablet, matchesLaptop, matchesDesktop, matchesHD } = useMedia();
  const [data, setData] = useState(offers);

  const classes = useStyles();

  useEffect(() => {
    axios.post("/api/getPosts", { of: 0 }).then((res) => setData(res.data.result));
  }, []);

  return (
    <MainLayout isIndex title={'Доска объявлений'}>
      <Container className={classes.root}>
        <PopularCategories />
        <Box className={classes.main}>
          <Box className={classes.offers} ><OffersRender data={data} title={'Рекомендуемое'} /></Box>
          {!matchesMobile && !matchesTablet && <Box className={classes.rightBlock}>
            <JokerBlock />
            <Box className={classes.footer}>
              <Footer2 />
            </Box>
          </Box>}
        </Box>
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
          old_price: true,
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
          email: true,
        },
      });
      return results;
    }
    const results = await getPost();

    return results;
  }

  let res = await main(0)
    .catch((e) => {
      console.log("error: " + e);
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  const offers = JSON.parse(JSON.stringify(res));
  return { props: { offers } };
}

export default Index;
