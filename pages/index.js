import React, { useState, useRef } from "react";
import { NextSeo } from "next-seo";
import { createSEOProps } from "#lib/seo";
import Footer2 from '../components/Footer2';
import { useMedia } from '../hooks/useMedia';
import { PrismaClient } from '@prisma/client';
import { Box, Container, makeStyles } from "@material-ui/core";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import JokerBlock from "../components/JokerBlock";
import PlaceOfferButton from "../components/PlaceOfferButton";
import { useAuth } from "../lib/Context/AuthCTX";
import theme from "../UI/theme"
import IndexPlaceHolder from "../components/placeHolders/IndexPlaceHolder/IndexPlaceHolder";
import ScrollPostData from "../components/ScrollPostData";
import Cookie from '../components/Cookie/Cookie.js';
import PayPromotionModal from "../src/components/PayPromotion/PayPromotionModal/PayPromotionModal";

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
		marginTop: '10px',
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

const seoProps = createSEOProps({
	title: "Доска объявлений",
	link: "/"
})

const Index = () => {
	const { matchesMobile, matchesTablet, matchesDesktop } = useMedia();
	// modifyGetPostsData(offers)
	const classes = useStyles();
	const { isAuth } = useAuth();

	const [isPending, setIsPending] = useState(false);
	const footerRef = useRef()
	const pending = () => setIsPending(true)

	setTimeout(pending, 1000)

	return (<>
		<NextSeo {...seoProps} />
		<Container className={classes.root}>
			{/* {!isPending ? null : !matchesMobile && !matchesTablet && <PopularCategories className={classes.popularCategories}/>} */}
			{!isPending ? null : <PopularCategories className={classes.popularCategories} />}
			{!isPending ? <IndexPlaceHolder />
				: <Box className={classes.main}>
					<Box className={classes.offers}>
						{/*<OffersRender pending={pending} data={data} page={page} limitRender={limitRenderPage}*/}
						{/*			setLimitRenderPage={setLimitRanderPage}*/}
						{/*			setPage={setPage} title={'Рекомендуемое'}/>*/}
						<ScrollPostData title='Рекомендуемое' url='/api/getPostsPortion' />
					</Box>
					{!matchesMobile && !matchesTablet && <Box className={classes.rightBlock}>
						<JokerBlock />
						<Box className={classes.footer} ref={footerRef} >
							{!isPending ? null : <Footer2 />}
						</Box>
					</Box>
					}
				</Box>}
				{isPending && matchesDesktop && <Cookie />}
        <PayPromotionModal/>
		</Container>
		{matchesMobile && isAuth ? <PlaceOfferButton /> : null}
	</>



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
