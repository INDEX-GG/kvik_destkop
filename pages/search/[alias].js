import {useState, useEffect} from "react";
import Footer2 from "../../components/Footer2"
import {useMedia} from "../../hooks/useMedia";
import {Box, Container, makeStyles} from "@material-ui/core";
import {useRouter} from "next/router"
import BreadCrumbs from "../../components/header/BreadСrumbs";
import aliasName from "../../components/header/CategoriesAliaseName";
import Image from "next/image"
import {copyObject, generateAliasStr, /** generateDataArr */} from "../../lib/services";
import ScrollPostData from "../../components/ScrollPostData";
import NewFilterBlock from "#components/newFilter/NewFilterBlock";
import {generateFilterData, numberKeyTime} from "#components/newFilter/filterServices";



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
        marginLeft: '56px',
        maxWidth: "224px",
        display: "flex",
        flexDirection: "column"
    },
    footer: {
        top: 'calc(100% - 205px)',
        position: 'sticky',
        width: "224px"
    },
    bread: {
        marginBottom: "40px",
    },
    breadActiveItem: {
        color: "#2C2C2C"
    },
    ad: {
        "& > *:nth-of-type(1)": {
            marginBottom: "10px !important"
        },
        marginBottom: "17px",
        marginTop: "15px"
    }
}));

const Index = () => {

    const classes = useStyles();
    const [scrollData, setScrollData] = useState({});
    const [defaultFilters, setDefaultFilters] = useState({})

    const router = useRouter()
    const {matchesMobile, matchesTablet} = useMedia();

    const aliasQuery = router.asPath.split("/")[2].split('?')[0]
    const aliasData = aliasName(aliasQuery, true)
    const aliasFullUrl = aliasData?.aliasBread.map(item => item.alias).join(",")
    const searchText = router?.query?.text
    const aliasAll = router?.query?.alias === 'all'


    const generateTitle = () => {
        if (!router?.query?.text) {
            return aliasData?.aliasName ? generateAliasStr(aliasData.aliasName[0].label) : ''
        }

        return router.query.text
    }

    const handleChangeScrollData = (obj) => {
        setScrollData({...scrollData, ...obj})
    }


    useEffect(() => {
        if (router && router?.query) {
            const checkboxObj = copyObject(router.query)
            delete checkboxObj.alias
            delete checkboxObj.search

            // Поиск по тексту
            if (searchText) {
                const data = {
                    'category': aliasAll ? '' : aliasFullUrl,
                    'text': searchText
                }
                handleChangeScrollData({sendObj: data, url: '/api/searchInsideCategory'})

                // Поиск по чекбоксам
            } else if (Object.keys(checkboxObj).length) {
                const data = {
                    price: {min: null, max: null},
                    time: null,
                    ...generateFilterData(checkboxObj),
                    text: searchText ? searchText : '',
                    category: aliasQuery,
                    categoryFullName: aliasFullUrl,
                }

                setDefaultFilters({...checkboxObj, time: numberKeyTime(checkboxObj.time)})
                // setDefaultFilters({...checkboxObj})

                handleChangeScrollData({sendObj: data, url: '/api/getPostsCheck'})

                // Поиск по категориям
            } else {
                if (aliasFullUrl) {
                    const postCategoryObj = {data: aliasFullUrl,}
                    handleChangeScrollData(
                        {sendObj: postCategoryObj,
                            url: '/api/postCategorySearch'}
                    )
                }
            }
        }
    }, [router]);


    return (
        <Container className={classes.root}>
            {aliasData?.aliasBread &&
            <BreadCrumbs data={aliasData?.aliasBread} searchData={searchText ? searchText : ''}/>}
            <Box className={classes.main}>
                <Box className={classes.offers}>
                    {scrollData?.url &&
                    <ScrollPostData title={generateTitle()} url={scrollData.url} sendObj={scrollData.sendObj}/>}
                </Box>
                {!matchesMobile && !matchesTablet &&
                <Box className={classes.rightBlock}>
                    {/*<FilterBlock*/}
                    {/*    aliasFullName={aliasFullUrl}*/}
                    {/*    categoryData={aliasData}*/}
                    {/*    searchText={searchText}*/}
                    {/*    pageLimit={limit}*/}
                    {/*    setData={setData}*/}
                    {/*    setCheckbox={setCheckboxData}*/}
                    {/*/>*/}
                    <NewFilterBlock
                        alias={aliasQuery}
                        fullAlias={aliasFullUrl}
                        searchText={searchText}
                        setScrollData={setScrollData}
                        defaultFilters={defaultFilters}
                    />
                    <div className={classes.ad}>
                        <Image src={"/img/joker1.png"} width={224} height={480}/>
                        <Image src={"/img/joker2.png"} width={224} height={480}/>
                    </div>
                    <Box className={classes.footer}>
                        <Footer2/>
                    </Box>
                </Box>}
            </Box>
        </Container>
    )
}

export default Index
