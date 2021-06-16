import React, { useEffect, useState, useRef } from 'react'
import { Box, Link, makeStyles, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import NavObj from './json/navobj.json';

import CloseGrey from '../UI/icons/CloseGrey'


const useStyles = makeStyles((theme) => ({
    categories__block_main_mobile__wrapper: {
        width: '100%',
        minHeight: '100vh',
        position: 'absolute',
        zIndex: '2',
        background: '#00000085',
    },

    categories__block_main_mobile: {
        width: '90%',
        background: '#fff',
        padding: '0 8px',
        borderRadius: '0 8px 8px 0',
        minHeight: '100vh',
    },

    categories__block_top: {
        display: 'flex',
        alignItems: 'center',
        padding: '24px 0',
        borderBottom: '1px solid #E9E9E9',

    },
    categories__block_close: {
        minWidth: '24px',
        height: '24px',
        padding: 0,
        paddingLeft: '32px',
        marginRight: '12px',
    },

    categories__block_title: {
        color: '#2c2c2c',
        fontWeight: 500,
        fontSize: '18px',
    },

    categories__block_link: {
        display: 'block',
        paddingLeft: '32px',
        color: '#2c2c2c',
        fontWeight: 500,
        fontSize: '14px',
        padding: '8px 0',
    },
    categories__block_link2: {
        color: '#000',
        paddingLeft: '32px',
        display: 'block',
        fontWeight: 500,
        fontSize: '14px',
        padding: '8px 0',

        '&:focus': {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    },
    categories__block_link3: {
        color: '#e36209',
        display: 'block',
        marginLeft: '68px',
        padding: '8px 0',
    },
}));


function CategoriesMobile() {
    const classes = useStyles();
    
    function setCategoryColor(index) {
        for (var i = 0; i < index.target.parentElement.children.length; i++) {
            index.target.parentElement.children[i].style.background = '';
            
        }
        index.target.style.background = '#E9E9E9';
    }

    function setOpenSubCat(index) {
        for (var i = 0; i < index.target.nextElementSibling.childNodes.length; i++) {
            console.log(i)
        }
        index.target.nextElementSibling.style.display = 'block';
    }


    return (
        <>
            <Box className={classes.categories__block_main_mobile__wrapper}>
                <Box className={classes.categories__block_main_mobile}>
                    <Box className={classes.categories__block_top}>
                        <Button className={classes.categories__block_close}><CloseGrey/></Button> <Typography className={classes.categories__block_title}>Категории</Typography>
                    </Box>
                    {Object.keys(NavObj).map((item, index) => {
                        return (
                            <>
                                <Link href="#" value={index} onClick={(index) => {setCategoryColor(index); setOpenSubCat(index)}} className={classes.categories__block_link} key={NavObj[item].id}> {NavObj[item].name}</Link>

                                <Box value={index} style={{display: 'none'}}>
                                    {Object.keys(NavObj[item].subCategories).map((item2, index) => {
                                        return (
                                            <>
                                                <Link href="#" value={index} onClick={(index) => setOpenSubCat(index)}  className={classes.categories__block_link2} key={NavObj[item].subCategories[item2].id}> {NavObj[item].subCategories[item2].name}</Link>

                                                <Box value={index} style={{display: 'none'}}>
                                                    {NavObj[item].subCategories[item2].subCategories !== undefined ?

                                                        Object.keys(NavObj[item].subCategories[item2].subCategories).map((item3, index) =>
                                                            <Link href="#" value={index} className={classes.categories__block_link3} key={NavObj[item].subCategories[item2].subCategories[item3].id}> {(NavObj[item].subCategories[item2].subCategories[item3].name)}</Link>
                                                        )
                                                        : ''
                                                    }
                                                </Box>
                                            </>
                                        )
                                    })}
                                </Box>
                            </>
                        )
                    }
                    )
                    }
                </Box>
            </Box>
        </>
    )
}

export default CategoriesMobile
