import React from 'react';
import {Box, makeStyles, Typography} from "@material-ui/core";
import {useRouter} from "next/router";
import NewFilterItem from "#components/newFilter/NewFilterItem";

const useStyles = makeStyles((theme) => ({
    formElem: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down(960)]: {
            marginBottom: '15px',
            width: '100%'
        }
    },
    formTitleField: {
        fontSize: "14px",
        flexGrow: 1,
        padding: "4px 5px 4px 0",
        maxWidth: 158,
        position: 'relative',
        [theme.breakpoints.down(960)]: {
            width: '100%',
            maxWidth: 'none',
            padding: 0
        }
    },
    formInputFieldCheck: {
        width: "490px",
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "16px",
        padding: "4px 0",
        [theme.breakpoints.down(960)]: {
            width: '100%',
            maxWidth: 'none',
            padding: 0,
            marginBottom: 0,
            '& > div': {
                width: '100%'
            }
        }
    },
    paddingTitle: {
        paddingTop: '10px'
    },
    mobile : {
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }
    },
    checkboxMobile: {
        display: 'none',
        [theme.breakpoints.down(960)]: {
            display: 'block'
        }
    },
    mobileWrapper: {
        [theme.breakpoints.down(960)]: {
            alignItems: 'center',
            '& > div': {
                flexGrow: 0,
                width: 'auto'
            },
            '& > p': {
                fontSize: '14px'
            }
        }
    }
}));

const AdditionalWrapper = ({title, type, children, filters}) => {

    const classes = useStyles();
    const wrapper = type === 'check_list' ? classes.formInputFieldCheck : classes.formTitleField
    const classNameTitle = type !== 'check_list' ? `${classes.formTitleField} ${classes.paddingTitle}` : `${classes.formTitleField}`
    const mobileCheckboxWrapper = type === 'boolean' ? classes.mobileWrapper : ''

    // Filters
    const router = useRouter()?.pathname;


    return (
        router === '/search/[alias]' || filters ? (
            <NewFilterItem title={title} type={type}>
                {children}
            </NewFilterItem>
        ) : (
            <Box className={`${classes.formElem} ${mobileCheckboxWrapper}`}>
                <Typography className={`${classNameTitle} ${classes.mobile}`}>
                    {title}
                </Typography>
                <Box className={wrapper}>
                    {children}
                </Box>
                {type === 'boolean' ? (
                    <Typography className={classes.checkboxMobile}>
                        {title}
                    </Typography>
                ) : null}
            </Box>
        )
    );
};

export default AdditionalWrapper;