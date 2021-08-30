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

	const aliesFillUrl = aliasData?.aliasBread.map(item => item.alias).join(",")

	useEffect(() => {

		if (aliesFillUrl !== undefined) {
			getDataByPost('/api/postCategorySearch', { data: aliesFillUrl }).then(r => {
				if (r !== undefined && r.length > 0) {
					const offersData = r.map(offer => {
						return {
							...offer,
							photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
						}
					})
					setData(offersData);
				}
			})
		}
	}, [aliesFillUrl]);

	return (
		// <MainlA isIndex title={'Доска объявлений'} category={"Транспорт"}>
		<Container className={classes.root}>
			<BreadCrumbs data={aliasData?.aliasBread} />
			<Box className={classes.main}>
				<Box className={classes.offers} >
					<SearchRender data={data} title={aliasData?.aliasName == null ? "" : aliasData.aliasName[0].label[0].toUpperCase() + aliasData.aliasName[0].label.substring(1,)} /></Box>
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