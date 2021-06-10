import React, { useEffect, useState, useRef } from 'react'
import { AppBar, Box, Menu, MenuItem, Dialog, Button, InputBase, makeStyles, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import NavObj from './json/navobj.json';

const useStyles = makeStyles((theme) => ({

    categories__block: {
        maxWidth: '1272px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
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
    categories__menu_item_btn: {
        width: '100%',
        justifyContent: 'left',
    }
}));




function Categories() {

    const classes = useStyles();
    const [category, setCategory] = useState(undefined);

    return (
        <>
            <Box className={classes.categories__block} >
                <Box className={classes.categories__menu_item}>
                    {
                        Object.keys(NavObj).map(key => {
                            /* console.log(NavObj[key].name) */
                            return (
                                <Button onClick={() => setCategory(NavObj[key])} className={classes.categories__menu_item_btn}>  {NavObj[key].name}</Button>
                            );
                        })
                    }

                </Box>

                <Box className={classes.categories__menu_item}>
                    {typeof category !== 'undefined' ?
                        console.log(
                            category
                            /* Object.keys(category).map(key => {
                                
                                    category[key]
                                
                            }) */
                            )
                        

                     


: ''}
                </Box>
                <Box className={classes.categories__menu_item}>
                    <MenuItem >33333</MenuItem>
                    <MenuItem >My account</MenuItem>
                    <MenuItem >Logout</MenuItem>
                </Box>
                <Box className={classes.categories__menu_item}>
                    <MenuItem >44444</MenuItem>
                    <MenuItem >My account</MenuItem>
                    <MenuItem >Logout</MenuItem>
                </Box>
                <Box className={classes.categories__menu_item}>
                    <MenuItem >55555</MenuItem>
                    <MenuItem >My account</MenuItem>
                    <MenuItem >Logout</MenuItem>
                </Box>
            </Box>

        </>
    )
}

export default Categories
