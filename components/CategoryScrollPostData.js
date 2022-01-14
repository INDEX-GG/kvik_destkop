import React, {useEffect, useState} from 'react';
import OffersRender from "./OffersRender";
import {useAuth} from "../lib/Context/AuthCTX";
import {useCity} from "../lib/Context/CityCTX";
import {getDataByPost} from "../lib/fetch";
import {generateCityArr, modifyGetPostsData} from "../lib/services";
import { makeStyles } from '@material-ui/core';
import { useProduct } from '#hooks/useProduct';
import { useRouter } from 'next/router';


const useStyles = makeStyles(() => ({
	button: {
		display: 'block',
		cursor: 'pointer',
		marginRight: 'auto',
		marginLeft: 'auto',
		width: '336px',
		height: '45px',
		backgroundColor: 'transparent',
		border: '1px solid #00A0AB',
		borderRadius: '5px',
		fontSize: '18px',
		fontWeight: '500px',
		color: '#00A0AB'
	}
}));


const CategoryScrollPostData = ({title = 'Рекомендуемое', url, sendObj}) => {
    const classes = useStyles();
    // all props {title = 'Рекомендуемое', url, sendObj, category}
    
    const router = useRouter()
    const product = useProduct(router.query.id)
    // console.log(product, 'product')
    const {id} = useAuth();
    const {searchCity} = useCity()

    const [post, setPost] = useState([]);
    const [sort, setSort] = useState('default')

    const [page, setPage] = useState(1);
    // Id последнего объявления
    const [/** lastIdAds */, setLastIdAds] = useState(0);
    // Лимит рендера для обсервера
    const [limitRenderPage, setLimitRenderPage] = useState(0);
    // Длинна исключаемой строки
    const [excludesLength, setExcludesLength] = useState(1);
    // Говорит когда нужно сдлеать глобальное обнавление (page = 1)
    const [contentUpdate, setContentUpdate] = useState(false);

    const limit = 50

    const [recommendData, setRecommendData] = useState([])
    const [endPage, setEndPage] = useState(8)
    const [pageStash, setPageStash] = useState(8)
    const [showButton, setShowButton] = useState(true)
    // const [similarData, setSimilarData] = useState([])

    useEffect(()=>{
        // console.log(product, ' product')
        const data = {
            post_id: product.id,
            region: searchCity,
        }   
        // console.log(data, 'data')
        getDataByPost('/api/similarPosts', data)
        .then(r=>console.log(r))
    }, [product])

    // {"post_id": 2366, "region": "", "model": "A4", "brand": "Audi"}
    // // POST        /api/similarPosts
    const handlerLoader = () => {
        setShowButton(false)
        const dataLength = post.length

        if((endPage + 16) >= dataLength) {
            setPageStash(dataLength - (endPage+8))
        }

        setEndPage(endPage  + 8)  
    }

    useEffect(() => {
        setRecommendData([...post.slice(0, 8)])
    }, [post])

    useEffect(() => {
        setRecommendData([...post.slice(0, endPage)])
        setShowButton(true)
    }, [endPage])

    useEffect(()=>{
        recommendData.length < 8 ? setShowButton(false) : setShowButton(true)
    },[recommendData])



    // Изменение сортировки
    const handlerSortChange = (value) => {
        setSort(value);
    }

    // console.log(category)

    // Запрос при скролле
    const generateDataScroll = async (defaultPage = false) => {
        if (searchCity) {

            const regionIncludes = generateCityArr('includes', searchCity, excludesLength)
            const regionExcludes = generateCityArr('excludes', searchCity, excludesLength)

            const categoryIncludes = generateCityArr('includes', searchCity, excludesLength)
            const categoryExcludes = generateCityArr('excludes', searchCity, excludesLength)

            const scrollDataObj = {
                'user_id': id ? id : 0,
                'sort': sort,
                'page': defaultPage ? defaultPage : page,
                'page_limit': limit,
                'region_includes': regionIncludes,
                'region_excludes': regionExcludes,
                'category_includes': categoryIncludes,
                'category_excludes': categoryExcludes,
                ...sendObj
            }

            // Если город в котором ищем будет пустой
            // if (!scrollDataObj.region_includes) {
            //     setPage('end');
            //     return;
            // }
            await getDataByPost(url, scrollDataObj)
                .then(response => {

                    if (Array.isArray(response) && response?.length) {

                        // Id последнего объявления
                        const lastId = response[response.length - 1]?.id

                        // Посты
                        setPost(prevState => [...prevState, ...modifyGetPostsData(response)])


                        if (lastId) {
                            setLastIdAds(lastId)
                        }

                        // Лимит рендера для обсервера
                        setLimitRenderPage(0);

                        setContentUpdate(false);

                        // Если excludesLength будет больше длинны города, то мы исключили страну (RU)
                        if (excludesLength > searchCity.split('$').length) {
                            setPage('end')
                            return;
                        }

                        // Если массив был меньше чем limit, то меняем область поиска
                        if (response.length !== limit) {
                            setExcludesLength(excludesLength + 1);
                            setPage('end')
                        }

                    } else {

                        // Если excludesLength будет больше длинны города, то мы исключили страну (RU)
                        if (excludesLength > searchCity.split('$').length) {
                            setPage('end')
                            return;
                        }

                        // Если пришёл пустой массив
                        setExcludesLength(excludesLength + 1);
                        setPage('end')
                    }
                })
        }
    };

    // Изменение города, сортировки, доп объекта для отправки
    useEffect(() => {
        if (searchCity) {
            setContentUpdate(true);
            setExcludesLength(1);
            setPage(1);
            setPost([]);
            setLimitRenderPage(0);
        }
    }, [searchCity, sort, sendObj]);

    // Когда в текущей в текущей области поиска нету объявлений, перейдём выше по вложенности
    useEffect(() => {
        if (excludesLength > 1) {
            setPage(1);
            setContentUpdate(true)
        }
    }, [excludesLength])


    // Первая подгрузка (первый рендер, изменение области поиска, изменение города, сортировка)
    useEffect(() => {
        if (page === 1 && contentUpdate) {
            generateDataScroll( 1)
        }
    }, [contentUpdate, page, excludesLength]);


    // Прогрузка объявлений при скролле
    useEffect(() => {
        if (page !== 'end' && post.length && !contentUpdate) {
            generateDataScroll()
        }
    }, [page])

    return (
    <>
        <OffersRender
            title={title}
            data={recommendData}
            pageObj={{page, setPage}}
            limitRenderObj={{limitRenderPage, setLimitRenderPage}}
            setSort={handlerSortChange}
        />
        {pageStash > 0 
        && showButton
        &&
        <button 
            className={classes.button}
            onClick={handlerLoader}
        >
            + загрузить еще {pageStash} объявлений
        </button>}
    </>
        
    );
};

export default CategoryScrollPostData;