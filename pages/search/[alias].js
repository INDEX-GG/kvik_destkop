import { useState, useEffect } from "react";
import Footer2 from "../../components/Footer2"
import { useMedia } from "../../hooks/useMedia";
import MetaLayout from '../../layout/MainLayout';
import { PrismaClient } from '@prisma/client';
import axios from "axios";
import { Box, Breadcrumbs, Container, makeStyles } from "@material-ui/core";
import FilterBlock from "../../components/FilterBlock"
import SearchRender from "../../components/SearchRender"
import { useRouter } from "next/router"
import { useCategory } from "../../hooks/useCategory";
import Link from "next/link"
import MainLayout from "../../layout/MainLayout";
import BreadCrumbs from "../../components/header/BreadСrumbs";
import aliasName from "../../components/header/CategoriesAliaseName";
// import Categories from "../../components/header/Categories";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 12px',
		display: 'flex',
		flexDirection: 'column',
		marginBottom: "92px"
    },
	main: {
		display: 'flex',
	},
	offers: {
		flexGrow: 1,
	},
	rightBlock: {
		height:'100%',
		marginLeft: '56px',
	},
	footer: {
		top: 'calc(100% - 205px)',
		position: 'sticky',
	},
  bread: {
    marginBottom: "40px"
  },
  breadActiveItem: {
    color: "#2C2C2C"
  }
}));

const Index = () => {

  const router = useRouter()

  const { matchesMobile, matchesTablet } = useMedia();
  const [data, setData] = useState(null);

  const classes = useStyles();
  
  const aliasQuery = router.asPath.split("/").splice(2,).join("")

  let aliasData = aliasName(aliasQuery, true)

  const aliesFillUrl = aliasData?.aliasBread.map(item => item.alias).join(",")

  useEffect(() => {
      axios.post("/api/postCategorySearch", {data: aliesFillUrl}).then(res => setData(res.data))
  }, [router]);


  return (
    // <MainlA isIndex title={'Доска объявлений'} category={"Транспорт"}>
      <Container className={classes.root}>
        <BreadCrumbs data={aliasData?.aliasBread}/>
		<Box className={classes.main}>
			<Box className={classes.offers} >
				<SearchRender data={data} title={aliasData?.aliasName == null ? "" : aliasData.aliasName[0].label[0].toUpperCase() +  aliasData.aliasName[0].label.substring(1,) }/></Box>
			{!matchesMobile && !matchesTablet && <Box className={classes.rightBlock}>
				<FilterBlock />
				<Box className={classes.footer}>
					<Footer2/>
				</Box>
			</Box>}
		</Box>
	  </Container>
    // {/* // </MainlA > */}
  )
}

export default Index