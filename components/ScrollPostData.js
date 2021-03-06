import React, {useEffect, useState} from 'react';
import OffersRender from "./OffersRender";
import {useAuth} from "../lib/Context/AuthCTX";
import {useCity} from "../lib/Context/CityCTX";
import {getDataByPost} from "../lib/fetch";
import {generateCityArr, modifyGetPostsData} from "../lib/services";

/**
 *
 * @param {setNotFound} (Function) - принимается из pages/search/[alias].js - (Ставит setState(true) на ничего не найдено)
 * @returns
 */
const ScrollPostData = ({title = 'Рекомендуемое', url, sendObj, setNotFound = null}) => {


    const {id} = useAuth();
    const {searchCity} = useCity()

    const [post, setPost] = useState([]);
    const [sort, setSort] = useState('default')

    const [page, setPage] = useState(1);
    // Id последнего объявления
    const [lastIdAds , setLastIdAds] = useState(0);
    // Лимит рендера для обсервера
    const [limitRenderPage, setLimitRenderPage] = useState(0);
    // Длинна исключаемой строки
    const [excludesLength, setExcludesLength] = useState(1);
    // Говорит когда нужно сдлеать глобальное обнавление (page = 1)
    const [contentUpdate, setContentUpdate] = useState(false);

    const limit = 24

    console.log(post);


    // Изменение сортировки
    const handlerSortChange = (value) => {
        setSort(value);
    }


    // Запрос при скролле
    const generateDataScroll = async (defaultPage = false) => {
        if (searchCity) {

            const regionIncludes = generateCityArr('includes', searchCity, excludesLength)
            const regionExcludes = generateCityArr('excludes', searchCity, excludesLength)

            const scrollDataObj = {
                'user_id': id ? id : 0,
                'sort': sort,
                'page': defaultPage ? defaultPage : page,
                'page_limit': limit,
                'region_includes': regionIncludes,
                'region_excludes': regionExcludes,
                'lastId': lastIdAds ? lastIdAds : 0,
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

    // console.log(page, post.length, contentUpdate)

    // Прогрузка объявлений при скролле
    useEffect(() => {
        if (page !== 'end' && post.length && !contentUpdate) {
            // if (page !== 'end' && !contentUpdate) {
            generateDataScroll()
        }
    }, [page])

    /** показываем компонент ничего не найдено, если
     * запрос закончился (page === end)
     * и длина нашедших постов = 0 (post.length === 0)
     * и это поиск по тексту (sendObj.category === '').
     * Если не найдено в категориях, то не отрисовываем компонент NothingFound (setNotFound не вызывается)
     */
    useEffect(() => {
        const isFinishRequest = (page === 'end')
        const isRequestNotFound = (post.length === 0)

        if(isFinishRequest && isRequestNotFound) {
            const isSetNotFoundNotNull = (typeof setNotFound !== 'undefined' && setNotFound !== null)
            const isSendObjNotNull = (typeof sendObj !== 'undefined' && sendObj !== null)
            
            if(isSetNotFoundNotNull && isSendObjNotNull) {
                setNotFound()
            }
        }
    }, [page, post, sendObj])

    return (
        <OffersRender
            title={title}
            data={post}
            pageObj={{page, setPage}}
            limitRenderObj={{limitRenderPage, setLimitRenderPage}}
            setSort={handlerSortChange}
        />
    );
};

export default ScrollPostData;
