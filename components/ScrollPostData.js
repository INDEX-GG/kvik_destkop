import React, {useEffect, useState} from 'react';
import OffersRender from "./OffersRender";
import {useAuth} from "../lib/Context/AuthCTX";
import {useCity} from "../lib/Context/CityCTX";
import {getDataByPost} from "../lib/fetch";
import {modifyGetPostsData} from "../lib/services";

const ScrollPostData = ({title = 'Рекомендуемое', url, sendObj}) => {

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


    // Изменение сортировки
    const handlerSortChange = (value) => {
        setSort(value);
    }


    // Создание region_includes / region_excludes в запросе
    const generateCityArr = (action) => {
        const sarchCityArr = searchCity?.split('$');

        if (action === 'includes') {
            return sarchCityArr.splice(0, sarchCityArr.length - excludesLength + 1).join('$')
        }

        if (action === 'excludes') {
            return excludesLength > 1 ? sarchCityArr.splice(0, sarchCityArr.length - excludesLength + 2).join('$') : '';
        }
    }


    // Запрос при скролле
    const generateDataScroll = async (defaultPage = false) => {
        if (searchCity) {

            const regionIncludes = generateCityArr('includes')
            const regionExcludes = generateCityArr('excludes')

            const scrollDataObj = {
                'user_id': id ? id : 0,
                'sort': sort,
                'page': defaultPage ? defaultPage : page,
                'page_limit': limit,
                'region_includes': regionIncludes,
                'region_excludes': regionExcludes,
                ...sendObj
            }

            console.log(scrollDataObj);

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