import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
	morePhoto: {
		position: "absolute",
		background: "rgba(39, 39, 39, 0.4)",
		borderRadius: '8px 8px 0px 0px',
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: 'column',
		justifyContent: "center",
		alignItems: "center",

	},
	morePhotoText: {
		marginTop: '4px',
		color: "#FFF",
		fontSize: "18px",
		textAlign: "center",
		lineHeight: "21px",
	},
	morePhotoImage: {
		width: '30px',
		height: '24px',
		background: 'url(/img/camera_white.svg) center no-repeat',
	},
	blur: {
		filter: 'blur(3px)',
	},
	mov_area: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		height: '90%',
		position: 'absolute',
		top: '0',
		left: '0',
		zIndex: '2',
	},
	mov_area__item: {
		height: 'inherit',
		margin: '0',
		padding: '0',
	}
}))

export const AdCardImageSliderStyles = () => useStyles()
