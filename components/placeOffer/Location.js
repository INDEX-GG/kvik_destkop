import {Box, makeStyles, Typography, useMediaQuery /** TextFiel */} from '@material-ui/core';
import DadataSuggest from '../DadataSuggest'
import AdditionalModalText from "#components/placeOffer/newPlaceOffer/AdditionalModalText";

const useStyles = makeStyles((theme) => ({
    formElem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down(960)]: {
            marginBottom: '15px',
            '& > div': {
                width: '100%'
            }
        }
    },
    formTitleField: {
        fontSize: '14px',
        flexGrow: 1,
        padding: '4px 0',
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }

    },
    formInputField: {
        width: '490px',
        [theme.breakpoints.down(960)]: {
            width: '100%'
        }
    },
    map: {
        height: '224px',
        borderRadius: theme.shape.borderRadius,
    }
}));

const Location = ({address}) => {

    const classes = useStyles();
    const media960 = useMediaQuery('(max-width: 960px)');


    return (
        <Box className={classes.formElem}>
            {!media960 && (
                <>
                    <Typography className={classes.formTitleField}>Местоположение</Typography>
                    <Box className={classes.formInputField}>
                        <DadataSuggest address={address}/>
                    </Box>
                </>
            )}
            {media960 && (
                <AdditionalModalText title='Местоположение' alias='location'>
                    <Box className={classes.formInputField}>
                        <DadataSuggest address={address}/>
                    </Box>
                </AdditionalModalText>
            )}
        </Box>
    )
}

export default Location