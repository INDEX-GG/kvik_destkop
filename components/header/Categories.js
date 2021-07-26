import { useState } from 'react'
import { Box, Link, Button, makeStyles } from '@material-ui/core';
// import NavObj from '../json/navobj.json';
import { useCategory } from '../../hooks/useCategory';
import { useRouter } from "next/router"

const useStyles = makeStyles((theme) => ({
    categories__block_main: {
        maxWidth: '1248px',
        margin: '0 auto',
        position: 'relative',
        width: '100%',
        zIndex: '1',
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
        top: '70px',
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
    const [category3, setCategory3] = useState(undefined)
    const [category4, setCategory4] = useState(undefined)
    const [valueOne, setValueOne] = useState(undefined)
    const [valueTwo, setValueTwo] = useState(undefined)
    const [valueThree, setValueThree] = useState(undefined)
    const [valutFour, setValueFour] = useState(undefined)

    const {categoryMainAlias, categoriesByAlias} = useCategory()
    const router = useRouter()

    function setCategoryColor(index) {
        for (var i = 0; i < index.target.parentElement.children.length; i++) {
            index.target.parentElement.children[i].style.background = '';
        }
        index.target.style.background = '#E9E9E9';
    }

    return (
        <>
            <Box className={classes.categories__block_main}>
                <Box className={classes.categories__block} >
                    <Box className={classes.categories__menu_item__gray_line}>
                        {categoryMainAlias.map((item, index) => {
                            return (
                                <Link href="#" value={item.alias}
                                onMouseOver={(e) => {
                                    setValueOne(e.target.getAttribute("value"))
                                    setCategoryColor(e);
                                    setCategory(categoriesByAlias(e.target.getAttribute("value")))
                                    setCategory2(undefined)
                                }}
                                onClick={() => router.push(`/search/${valueOne}`)}
                                className={classes.categories__menu_item_btn}>{item.label}</Link>
                            )
                        })}
                    </Box>

                    {typeof category !== 'undefined' ?
                        <Box className={classes.categories__menu_item__gray_line}>
                            {category.map(item => {
                                return (
                                    <Link value={item.alias} href="#"
                                    onMouseOver={(e) => {
                                        setValueTwo(e.target.getAttribute("value"))
                                        setCategoryColor(e);
                                        setCategory2(categoriesByAlias(valueOne, e.target.getAttribute("value")))
                                        setCategory3(undefined)
                                    }}
                                    onClick={() => router.push(`/search/${valueOne}/${valueTwo}`)} 
                                    className={classes.categories__menu_item_btn}>{item.label}</Link>
                                )
                            })}
                        </Box>
                        : ''}

                    {typeof category2 !== 'undefined' && category2 != null ?
                        <Box className={classes.categories__menu_item}>
                            {category2.map(item => {
                                return (<Link value={item.alias} href="#"
                                    onMouseOver={(e) => {
                                        setValueThree(e.target.getAttribute("value"))
                                        setCategoryColor(e);
                                        setCategory3(categoriesByAlias(valueOne, valueTwo, e.target.getAttribute("value")))
                                    }}
                                    onClick={(e) => router.push(`/search/${valueOne}/${valueTwo}/${valueThree}`)} 
                                    className={classes.categories__menu_item_btn}>{item.label}</Link>)
                            })}
                        </Box>
                        : ''}

                    {typeof category3 !== 'undefined' && category3 != null ?
                        <Box className={classes.categories__menu_item}>
                            {category3.map(item => {
                                return (<Link value={item.alias} href="#"
                                    onMouseOver={(e) => {
                                        setValueFour(e.target.getAttribute("value"))
                                        setCategoryColor(e);
                                        setCategory4(categoriesByAlias(valueOne, valueTwo, valueThree, e.target.getAttribute("value")))
                                    }}
                                    onClick={(e) => router.push(`/search/${valueOne}/${valueTwo}/${valueThree}/${valutFour}`)} 
                                    className={classes.categories__menu_item_btn}>{item.label}</Link>)
                            })}
                        </Box>
                        : ''}
                </Box>
            </Box>
        </>
    )
}

export default Categories
