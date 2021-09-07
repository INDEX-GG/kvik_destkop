import { useState, useEffect } from "react";
import Footer2 from '../components/Footer2';
import { useMedia } from '../hooks/useMedia';
import { PrismaClient } from '@prisma/client';
import { Box, Container, makeStyles } from "@material-ui/core";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import OffersRender from "../components/OffersRender";
import JokerBlock from "../components/JokerBlock";
import MetaLayout from "../layout/MetaLayout";
import PlaceOfferButton from "../components/PlaceOfferButton";
import { getDataByPost } from "../lib/fetch";
import { modifyGetPostsData } from "../lib/services";
import { useAuth } from "../lib/Context/AuthCTX";

const useStyles = makeStyles((theme) => ({
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
	rightBlock: {
		height: '100%',
		marginLeft: '56px',
		[theme.breakpoints.down('md')]: {
			display: 'none'
		},
	},
	footer: {
		top: 'calc(100% - 205px)',
		position: 'sticky',
	}
}));

const Index = ({ offers }) => {
	const { matchesMobile, matchesTablet } = useMedia();
	const [data, setData] = useState(modifyGetPostsData(offers));
	const classes = useStyles();
	const { isAuth } = useAuth();


	useEffect(() => {
		getDataByPost('/api/getPosts', { of: 0 }).then(r => { setData(modifyGetPostsData(r)) })
	}, []);

	return (
		<MetaLayout title={'Доска объявлений'}>
			<Container className={classes.root}>
				{!matchesMobile && !matchesTablet && <PopularCategories className={classes.popularCategories} />}


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