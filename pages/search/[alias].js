import {useState, useEffect} from "react";
import Footer2 from "../../components/Footer2"
import {useMedia} from "../../hooks/useMedia";
import {Box, Container, makeStyles} from "@material-ui/core";
// import SearchRender from "../../components/SearchRender"
import {useRouter} from "next/router"
import BreadCrumbs from "../../components/header/BreadСrumbs";
import aliasName from "../../components/header/CategoriesAliaseName";
import Image from "next/image"
// import {getDataByPost} from "../../lib/fetch";
// import {STATIC_URL} from "../../lib/constants";
// import {categoryScroll} from "../../lib/scrollAds";
import FilterBlock from "../../components/FilterBlock";
import {generateAliasStr, /** generateDataArr */} from "../../lib/services";
import {generateCheckBoxObj, generateCheckboxTime} from "../../lib/utils/checkBoxFunction";
import ScrollPostData from "../../components/ScrollPostData";

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

    const [, setData] = useState(null);
    // const [page, setPage] = useState(1);
    // const [limitRenderPage, setLimitRenderPage] = useState(0);
    // const [/** lastIdAds */, setLastIdAds] = useState(0);
    const [checkboxDate, setCheckboxData] = useState({})
    const [, setQueryObjState] = useState({})
    const [scrollData, setScrollData] = useState({});
    let queryObj = {}

    const router = useRouter()
    const {matchesMobile, matchesTablet} = useMedia();

    const aliasQuery = router.asPath.split("/")[2].split('?')[0]
    const aliasData = aliasName(aliasQuery, true)
    const aliasFullUrl = aliasData?.aliasBread.map(item => item.alias).join(",")
    const searchText = router?.query?.text
    const aliasAll = router?.query?.alias === 'all'
    const limit = 10


    const generateTitle = () => {
        if (!router?.query?.text) {
            return aliasData?.aliasName ? generateAliasStr(aliasData.aliasName[0].label) : ''
        }

        return router.query.text
    }

    const generateRouteObj = (data) => {
        for (let key in data) {
            if (key === 'alias' || key === 'text') return;
            queryObj[key] = data[key]
        }
    }

    useEffect(async () => {
        queryObj = {}
        await generateRouteObj(router.query)
    }, [router, checkboxDate])



    // useEffect(() => {
    //     setPage(1)
    //     setLimitRenderPage(0)
    //     setLastIdAds(0)
    //     setQueryObjState({})
    // }, [router])


    useEffect(() => {
        if (searchText) {
            console.log(1)
            const data = {'category': aliasAll ? '' : aliasFullUrl, 'text': searchText}
            setScrollData({...scrollData, ...{sendObj: data, url: '/api/searchInsideCategory'}})
            // getDataByPost('/api/searchInsideCategory', data)
            //     .then(r => {
            //         setData(generateDataArr(r))
            //         setPage(1);
            //     });

        } else if (Object.keys(queryObj).length) {
            console.log(2)
            generateCheckBoxObj(queryObj)

            const sendCheckObj = {
                price: queryObj?.price ? queryObj?.price : {min: null, max: null},
                category: aliasQuery,
                categoryFullName: aliasFullUrl ? aliasFullUrl : aliasQuery,
                text: searchText ? searchText : "",
                time: generateCheckboxTime(queryObj?.period),
                // page: 1,
                // page_limit: limit,
                check: {}
            }


            delete queryObj.price
            delete queryObj.period
            delete queryObj?.alias
            delete queryObj?.text

            if (queryObj?.color?.length) {
                if (Array.isArray(queryObj.color)) {
                    queryObj.color = queryObj?.color?.map(item => +item + 1);
                } else {
                    queryObj.color = [+queryObj.color + 1]
                }
            }

            sendCheckObj.check = queryObj
            setQueryObjState(sendCheckObj)
            setScrollData({...scrollData, ...{sendObj: sendCheckObj, url: '/api/getPostsCheck'}})

            // getDataByPost('/api/getPostsCheck', sendCheckObj)
            //     .then(r => {
            //         if (Array.isArray(r)) {
            //             setData((generateDataArr(r)))
            //             setPage(1)
            //         }
            //     })

        } else {
            if (aliasFullUrl) {
                console.log(3)
                const postCategoryObj = {
                    data: aliasFullUrl,
                }

                setScrollData({...scrollData, ...{sendObj: postCategoryObj, url: '/api/postCategorySearch'}});
                // getDataByPost('/api/postCategorySearch', {
                //     data: aliasFullUrl,
                //     'page_limit': limit,
                //     'page': 1
                // }).then(r => {
                //     if (r !== undefined) {
                //         const offersData = r.map(offer => {
                //
                //             if (Array.isArray(JSON.parse(offer.photo)?.photos)) {
                //                 return {
                //                     ...offer,
                //                     photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
                //                 }
                //             }
                //
                //             return offer;
                //         })
                //         setData(offersData);
                //         setPage(1);
                //         if (r.length > 1) setLastIdAds(r[r.length - 1].id)
                //     }
                // })
            }
        }
    }, [router, checkboxDate]);


    // useEffect(() => {
    //     const fetchDataObj = {
    //         'data': aliasFullUrl,
    //         'page_limit': limit,
    //         'page': page
    //     };
    //
    //     if (searchText) {
    //         delete fetchDataObj.data
    //         fetchDataObj.category = aliasFullUrl ? aliasFullUrl : ''
    //         fetchDataObj.text = searchText
    //     }
    //
    //     const setObj = {
    //         setData,
    //         setLimitRenderPage,
    //         setPage,
    //         setLastIdAds
    //     }
    //
    //
    //     if (page > 1) {
    //         const api = searchText ? '/api/searchInsideCategory' : '/api/postCategorySearch';
    //         if (Object.keys(queryObjState).length) {
    //             categoryScroll('/api/getPostsCheck', {...queryObjState, page: page}, setObj)
    //         } else {
    //             categoryScroll(api, fetchDataObj, setObj)
    //         }
    //     }
    // }, [page])


    return (
        <Container className={classes.root}>
            {aliasData?.aliasBread &&
            <BreadCrumbs data={aliasData?.aliasBread} searchData={searchText ? searchText : ''}/>}
            <Box className={classes.main}>
                <Box className={classes.offers}>
                    {/*<SearchRender */}
                    {/*	title={generateTitle()}*/}
                    {/*	data={Array.isArray(checkboxDate) ? checkboxDate : data}*/}
                    {/*	page={page} */}
                    {/*	limitRender={limitRenderPage} */}
                    {/*	setLimitRenderPage={setLimitRenderPage} */}
                    {/*	setPage={setPage} />*/}
                    {scrollData.url && <ScrollPostData title={generateTitle()} url={scrollData.url} sendObj={scrollData.sendObj} />}
                </Box>
                {!matchesMobile && !matchesTablet &&
                <Box className={classes.rightBlock}>
                    <FilterBlock
                        aliasFullName={aliasFullUrl}
                        categoryData={aliasData}
                        searchText={searchText}
                        pageLimit={limit}
                        setData={setData}
                        setCheckbox={setCheckboxData}
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
