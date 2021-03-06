import { useState, useEffect } from "react";
import Footer2 from "../components/Footer2"
import { useMedia } from "../hooks/useMedia";
import { Box, Container, makeStyles } from "@material-ui/core";
import FilterBlock from "../components/FilterBlock"
import SearchRender from "../components/SearchRender"
import { getDataByPost } from "../lib/fetch";
import { modifyGetPostsData } from "../lib/services";
import { useAuth } from "../lib/Context/AuthCTX";

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
		height: '100%',
		marginLeft: '56px',
	},
	footer: {
		top: 'calc(100% - 205px)',
		position: 'sticky',
	},
	bread: {
		marginBottom: "25px",
		marginTop: '15px',
	},
	breadActiveItem: {
		color: "#2C2C2C"
	}
}));

const Index = () => {
	const { matchesMobile, matchesTablet } = useMedia();
	const [data, setData] = useState();
	const classes = useStyles();
	const {id} = useAuth()

	useEffect(() => {
		getDataByPost("/api/getPosts", { of: 0, 'user_id': id }).then(r => setData(modifyGetPostsData(r)));
	}, []);

	return (
		<>
			{/* <MetaLayout isIndex title={'Доска объявлений'} category={"Транспорт"}> */}

			<Container className={classes.root}>
				<div className={classes.bread}>
					<div className="clientPage__breadcrumbs thin">
						<a className="breadCrumb light" href="/">
							Главная
						</a>
						<a className="breadCrumb line light" href="/">
							Транспорт
						</a>
						<a className="breadCrumb line light" href="/">
							Автомобили
						</a>
						<a className={"breadCrumb line light " + classes.breadActiveItem} href="/">
							С пробегом
						</a>
					</div>
				</div>
				<Box className={classes.main}>
					<Box className={classes.offers} >
						<SearchRender data={data} title={'Автомобили с пробегом'} />
					</Box>
					{!matchesMobile && !matchesTablet && <Box className={classes.rightBlock}>
						<FilterBlock />
						<Box className={classes.footer}>
							<Footer2 />
						</Box>
					</Box>}
				</Box>
			</Container>

			{/* </MetaLayout > */}
		</>
	)
}

export default Index