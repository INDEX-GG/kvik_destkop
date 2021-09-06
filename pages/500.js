import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    error__page: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    error__page_wrapper: {
        textAlign: "center",
        padding: "20px 8px",
    },
    error__title: {
        fontSize: "144px",
        fontWeight: "500",
        color: "#c7c7c7",
        
    },
    error__sub_title: {
        fontSize: "22px",
        fontWeight: "500",
        color: "#000000",
        marginBottom: "20px",
    },
    error__description: {
        fontSize: "14px",
        fontWeight: "400",
        color: "#000000",
        marginBottom: "50px", 
        [theme.breakpoints.down("350")]: {
			fontSize: "12px",
		}
    },
})); 


function Error500() {
    const classes = useStyles()

    return (
        <Box className={classes.error__page}>
            <Box className={classes.error__page_wrapper}>
                <Box className={classes.error__title}>500</Box>
                <Box className={classes.error__sub_title}>Ошибка сервера</Box>
                <Box className={classes.error__description}>На сервере произошла непредвиденная ошибка.<br />Пожалуйста, подождите, она вскоре будет исправлена.</Box>
            </Box>
        </Box>
    )
}

export default Error500;
