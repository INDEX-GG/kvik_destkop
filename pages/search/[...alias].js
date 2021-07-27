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
// import Categories from "../../components/header/Categories";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 12px',
		display: 'flex',
		flexDirection: 'column',
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

  const {categoryMainAlias, categoriesByAlias} = useCategory()

  const breadСrumbs = router.asPath.split("/").splice(2,)

  let cardTitle = null

  useEffect(() => {
      axios.post("/api/postCategorySearch", {data: breadСrumbs.join(",")}).then(res => setData(res.data))
  }, [router]);


  return (
    // <MetaLayout isIndex title={'Доска объявлений'} category={"Транспорт"}>
      <Container className={classes.root}>
        <div className={classes.bread}>
            <div className="clientPage__breadcrumbs thin">
                <Link href="/">
                  <a className="breadCrumb light">Главная</a>
                </Link>
                {breadСrumbs.map((item, index) => {
                  let url = breadСrumbs[0]
                  let label = null

                  if (index >= 1) url += `/${breadСrumbs[1]}`
                  if (index >= 2) url += `/${breadСrumbs[2]}`
                  if (index >= 3) url += `/${breadСrumbs[3]}`
                
                  if (index == 0) label = categoryMainAlias.filter(itemAl => itemAl.alias == item)[0]
                  if (index == 1) label = categoriesByAlias(breadСrumbs[0]).filter(itemAl => itemAl.alias == item)[0]
                  if (index == 2) label = categoriesByAlias(breadСrumbs[0], breadСrumbs[1]).filter(itemAl => itemAl.alias == item)[0]                
                  if (index == 3) label = categoriesByAlias(breadСrumbs[0], breadСrumbs[1], breadСrumbs[2]).filter(itemAl => itemAl.alias == item)[0]
                  
                  cardTitle = label

                  return (
                    <Link href={`/search/${url}`}>
                    <a className={`breadCrumb light line ${index == breadСrumbs.length - 1 ? classes.breadActiveItem : "null"}`}>{label == null ? "loading...." : label.label}</a>
                    </Link>
                  )
                })}
            </div>
        </div>
		<Box className={classes.main}>
			<Box className={classes.offers} ><SearchRender data={data} title={cardTitle == null ? "" : cardTitle.label}/></Box>
			{!matchesMobile && !matchesTablet && <Box className={classes.rightBlock}>
				<FilterBlock />
				<Box className={classes.footer}>
					<Footer2/>
				</Box>
			</Box>}
		</Box>
	  </Container>
    // </MetaLayout >
  )
}

export default Index