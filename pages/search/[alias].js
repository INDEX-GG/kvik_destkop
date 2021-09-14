import { useState, useEffect } from "react";
import Footer2 from "../../components/Footer2"
import { useMedia } from "../../hooks/useMedia";
import { Box, Container, makeStyles } from "@material-ui/core";
import SearchRender from "../../components/SearchRender"
import { useRouter } from "next/router"
import BreadCrumbs from "../../components/header/BreadСrumbs";
import aliasName from "../../components/header/CategoriesAliaseName";
import Image from "next/image"
import { getDataByPost } from "../../lib/fetch";
import { STATIC_URL } from "../../lib/constants";
import { categoryScroll } from "../../lib/scrollAds";

const useStyles = makeStyles(() => ({
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
		marginLeft: '56px',
		maxWidth: "224px",
		display: "flex",
		flexDirection: "column"
	},
	footer: {
		top: 'calc(100% - 205px)',
		position: 'sticky',
		width: "224px"
	},
	bread: {
		marginBottom: "40px",
	},
	breadActiveItem: {
		color: "#2C2C2C"
	},
	ad: {
		"& > *:nth-of-type(1)": {
			marginBottom: "10px !important"
		},
		marginBottom: "17px",
		marginTop: "15px"
	}
}));

const Index = () => {

	const router = useRouter()

	const { matchesMobile, matchesTablet } = useMedia();
	const [data, setData] = useState(null);

	const classes = useStyles();

	const aliasQuery = router.asPath.split("/").splice(2,).join("")

	let aliasData = aliasName(aliasQuery, true)

	const aliasFillUrl = aliasData?.aliasBread.map(item => item.alias).join(",")


	const [page, setPage] = useState(1);
	const [limitRenderPage, setLimitRanderPage] = useState(0);
	const [lastIdAds ,setLastIdAds] = useState(0);
	const limit = 5


	useEffect(() => {
		if (page == 'end') setPage(1)
		console.log(lastIdAds)
	}, [router])


	useEffect(() => {
		if (aliasFillUrl !== undefined) {
			getDataByPost('/api/postCategorySearch', { data: aliasFillUrl, 'page_limit': limit, 'page': 1 }).then(r => {
				if (r !== undefined) {
					const offersData = r.map(offer => {
						return {
							...offer,
							photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
						}
					})
					setData(offersData);
					if (r.length > 1) setLastIdAds(r[r.length - 1].id)
				}
			})
		}
	}, [aliasFillUrl]);



	useEffect(() => {
		if (page > 1) {
			categoryScroll(aliasFillUrl, limit, page, setData, setLimitRanderPage, setPage, setLastIdAds)
		}
	}, [page])
	

	return (
		// <MainlA isIndex title={'Доска объявлений'} category={"Транспорт"}>
		<Container className={classes.root}>
			<BreadCrumbs data={aliasData?.aliasBread} />
			<Box className={classes.main}>
				<Box className={classes.offers} >
					<SearchRender data={data} page={page} limitRender={limitRenderPage} setLimitRenderPage={setLimitRanderPage} setPage={setPage} title={aliasData?.aliasName == null ? "" : aliasData.aliasName[0].label[0].toUpperCase() + aliasData.aliasName[0].label.substring(1,)} /></Box>
				{!matchesMobile && !matchesTablet &&
					<Box className={classes.rightBlock}>
						<div className={classes.ad}>
							<Image src={"/img/joker1.png"} width={224} height={480} />
							<Image src={"/img/joker2.png"} width={224} height={480} />
						</div>
						<Box className={classes.footer}>
							<Footer2 />
						</Box>
					</Box>}
			</Box>
		</Container>
		// {/* // </MainlA > */}
	)
}

export default Index