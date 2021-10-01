import { useState, useEffect} from "react";
import Footer2 from '../components/Footer2';
import { useMedia } from '../hooks/useMedia';
import { PrismaClient } from '@prisma/client';
import { Box, Container, makeStyles } from "@material-ui/core";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import OffersRender from "../components/OffersRender";
import JokerBlock from "../components/JokerBlock";
import MetaLayout from "../layout/MetaLayout";
import PlaceOfferButton from "../components/PlaceOfferButton";
import { useAuth } from "../lib/Context/AuthCTX";
import theme from "../UI/theme"
import { firstAds, scrollAds } from "../lib/scrollAds";

const useStyles = makeStyles(() => ({
	root: {
		padding: '0 12px',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		[theme.breakpoints.down('sm')]: {
			padding: '0 8px',
			height: "auto",
			marginBottom: "92px"
		},
	},
	rightBlock: {
		height: '100%',
		marginLeft: '56px',
		[theme.breakpoints.down("sm")]: {
			display: 'none'
		},
	},
	popularCategories: {
		[theme.breakpoints.down('md')]: {
			display: 'none'
		},
	},
	main: {
		display: 'flex',
		height: '100%',
	},
	offers: {
		flexGrow: 1,
	},
	
	footer: {
		top: 'calc(100% - 205px)',
		position: 'sticky',
	}
}));

const Index = () => {
	const { matchesMobile, matchesTablet } = useMedia();
	const [data, setData] = useState();
	// modifyGetPostsData(offers)
	const classes = useStyles();
	const { isAuth, id } = useAuth();
	const [page, setPage] = useState(1);
	const [limitRenderPage, setLimitRanderPage] = useState(0);
	const [lastIdAds ,setLastIdAds] = useState(0);
	const limit = 10

	console.log(lastIdAds);
	
	useEffect(() => {
		scrollAds(id, isAuth, page, limit, data, setData, setLastIdAds, setLimitRanderPage, setPage)
	}, [page])
	
	useEffect(() => {
		 firstAds(id, isAuth, page, limit, setData, setLastIdAds)
	}, [id]);


	return (
		<MetaLayout title={'Доска объявлений'}>
			<Container className={classes.root}>
				{!matchesMobile && !matchesTablet && <PopularCategories className={classes.popularCategories} />}
				<Box className={classes.main}>
					<Box className={classes.offers} ><OffersRender data={data} page={page} limitRender={limitRenderPage} setLimitRenderPage={setLimitRanderPage} setPage={setPage} title={'Рекомендуемое'} /></Box>
					{!matchesMobile && !matchesTablet && <Box className={classes.rightBlock}>
						<JokerBlock />
						<Box className={classes.footer}>
							<Footer2 />
						</Box>
					</Box>}
				</Box>
			</Container>
			{matchesMobile && isAuth ? <PlaceOfferButton /> : null}
		</MetaLayout >
	)
}

export async function getStaticProps() {
	const prisma = new PrismaClient();

	const main = async (of) => {
		return await prisma.posts.findMany({
			skip: of,
			take: 50,
			select: {
				id: true,
				user_id: true,
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
				email: true
			}
		})
	}

	const res = await main(0)
		.catch(e => console.error(`ошибка SSR главной страницы${e}`))
		.finally(async () => {
			await prisma.$disconnect()
		})

	const offers = JSON.parse(JSON.stringify(res));
	return { props: { offers } };
}

export default Index;
