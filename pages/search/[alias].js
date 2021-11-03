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
import FilterBlock from "../../components/FilterBlock";
import {generateAliasStr, generateDataArr} from "../../lib/services";
import {generateCheckBoxObj, generateCheckboxTime} from "../../lib/utils/checkBoxFunction";

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

	const classes = useStyles();

	const [data, setData] = useState(null);
	const [page, setPage] = useState(1);
	const [limitRenderPage, setLimitRanderPage] = useState(0);
	const [/** lastIdAds */ ,setLastIdAds] = useState(0);
	const [checkboxDate, setCheckboxDate] = useState(undefined)
	let queryObj = {}

	const router = useRouter()
	const { matchesMobile, matchesTablet } = useMedia();

	const aliasQuery = router.asPath.split("/")[2].split('?')[0]
	const aliasData = aliasName(aliasQuery, true)
	const aliasFullUrl = aliasData?.aliasBread.map(item => item.alias).join(",")
	const searchText = router?.query?.text
	const aliasAll = router?.query?.alias == 'all'
	const limit = 10
	

	const generateTitle = () => {
		if (!router?.query?.text) {
			return aliasData?.aliasName ? generateAliasStr(aliasData.aliasName[0].label) : ''
		}

		return router.query.text
	}

	useEffect(() => {
		queryObj = {}
		for (let key in router.query) {
			if (key === 'alias' || key === 'text') return;
			queryObj[key] = router.query[key]
		}
	}, [router])


	useEffect(() => {
		setPage(1)
		setLimitRanderPage(0)
		setLastIdAds(0)
	}, [router])


	useEffect(() => {
		if (searchText) {			
			const data = {'category': aliasAll? '': aliasFullUrl, 'text': searchText , 'page_limit': limit, 'page': 1}
			getDataByPost('/api/searchInsideCategory', data)
			  .then(r => {
				  setData(generateDataArr(r))
				  setPage(1);
			  });

		} else if (Object.keys(queryObj).length) {

			generateCheckBoxObj(queryObj)

			const sendCheckObj = {
				price: queryObj?.price ? queryObj?.price : {min: null, max: null},
				category: aliasQuery,
				text: searchText ? searchText : "",
				time: generateCheckboxTime(queryObj?.period),
				page:  1,
				page_limit: limit,
				check: {}
			}

			delete queryObj.price
			delete queryObj.period
			sendCheckObj.check = queryObj


			getDataByPost('/api/getPostsCheck', sendCheckObj)
				.then(r => {
					console.log(r, sendCheckObj)
					if (Array.isArray(r)) {
						setData((generateDataArr(r)))
						setPage(1)
					}
				})
		} else {
			if (aliasFullUrl) {
			getDataByPost('/api/postCategorySearch', { data: aliasFullUrl, 'page_limit': limit, 'page': 1 }).then(r => {
				if (r !== undefined) {
					const offersData = r.map(offer => {

						if (Array.isArray(JSON.parse(offer.photo)?.photos)) {
							return {
								...offer,
								photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
							}
						}

						return offer;
					})
					setData(offersData);
					setPage(1);
					if (r.length > 1) setLastIdAds(r[r.length - 1].id)
				}
			})
		}
		}
	}, [router]);


	useEffect(() => {
		
		const fetchDataObj = {
			'data': aliasFullUrl, 
			'page_limit': limit, 
			'page': page
		};

		if (searchText) {
			delete fetchDataObj.data
			fetchDataObj.category = aliasFullUrl ? aliasFullUrl : ''
			fetchDataObj.text = searchText
		}

		const setObj = {
			setData, 
			setLimitRanderPage, 
			setPage, 
			setLastIdAds
		}

		if (page > 1) {
			const api = searchText ?  '/api/searchInsideCategory' : '/api/postCategorySearch';
			categoryScroll(api, fetchDataObj, setObj)
		}
	}, [page])


	return (
		<Container className={classes.root}>
			{aliasData?.aliasBread && <BreadCrumbs data={aliasData?.aliasBread} searchData={searchText ? searchText : ''} />}
			<Box className={classes.main}>
				<Box className={classes.offers} >
					<SearchRender 
						title={generateTitle()}
						data={Array.isArray(checkboxDate) ? checkboxDate : data}
						page={page} 
						limitRender={limitRenderPage} 
						setLimitRenderPage={setLimitRanderPage} 
						setPage={setPage} /></Box>
				{!matchesMobile && !matchesTablet &&
					<Box className={classes.rightBlock}>
						<FilterBlock
							categoryData={aliasData}
							searchText={searchText}
							page={page}
							pageLimit={limit}
							setCheckbox={setCheckboxDate}
						/>
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
	)
}

export default Index
