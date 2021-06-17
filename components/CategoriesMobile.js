import React, { useEffect, useState, useRef } from 'react'
import { Box, Link, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import NavObj from './json/navobj.json';

const useStyles = makeStyles((theme) => ({
    categories__block_main: {
        maxWidth: '1260px',
        margin: '0 auto',
        position: 'relative',
        width: '100%',
    },

    categories__block: {
        width: '100%',
        padding: '8px',
        display: 'flex',
        background: theme.palette.secondary.main,
        position: 'absolute',
        left: '0',
        borderRadius: '2px 2px 8px 8px',
        boxShadow: '0px 20px 20px rgb(0 0 0 / 10%)',
    },

    categories__menu: {
        position: 'relative',
        width: '100%',
        height: '100%',
        maxHeight: 'unset',
        maxWidth: 'unset',
    },

    popoverPaper: {
        width: '100%',
        maxWidth: '1272px',
        margin: '0 auto',
        maxHeight: 'unset',
        top: '78px !important',
        left: '0!important',
        position: 'relative',
        borderRadius: '2px 2px 8px 8px',
    },

    categories__menu_item: {
        width: '25%',
    },

    categories__menu_item__gray_line: {
        width: '25%',
        borderRight: '1px solid #E9E9E9',
    },

    categories__menu_item_btn: {
        width: '100%',
        display: "block",
        color: theme.palette.grey['100'],
        padding: '8px 0',
        fontWeight: '500',
        paddingLeft: '32px',

        '&:hover': {
            textDecoration: 'none',
        },
    },
    categories__menu_item_link: {
        width: '100%',
        display: "block",
        color: theme.palette.grey['100'],
        padding: '8px 0',
        fontWeight: '500',
        paddingLeft: '32px',

        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));


function Categories() {
    const classes = useStyles();
    const [category, setCategory] = useState(undefined);
    const [category2, setCategory2] = useState(undefined);

    function setCategoryColor(index) {
        for (var i = 0; i < index.target.parentElement.children.length; i++) {
            index.target.parentElement.children[i].style.background = '';
        }
        index.target.style.background = '#E9E9E9';
    }



    function setCat(index, e) {

        console.log(index)

    }
    console.log(category)

    return (
        <>
            <Box className={classes.categories__block_main}>
                {Object.keys(NavObj).map((key, index) => {
                    return (
                        <>
                            <ul >
                                <Link href="#" value={index} onClick={(e, index) => { setCategory(NavObj[key]); setCategory2(undefined); setCat(e, index) }} className={classes.categories__menu_item_btn}>  {NavObj[key].name}</Link>

                                {typeof category !== 'undefined' ?
                                    <li value={index}>
                                        <ul>

                                            {Object.keys(category.subCategories).map((key, index) => {


                                                return (
                                                    <>
                                                        <Link value={index} href="#" className={classes.categories__menu_item_btn}> {category.subCategories[key].name} </Link>
                                                    </>
                                                );
                                            }
                                            )}
                                        </ul>
                                    </li>
                                    : ''}
                            </ul>

                        </>
                    );
                })}

            </Box>
        </>
    )
}

export default Categories
