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
    const [/** lastIdAds */, setLastIdAds] = useState(0);
    const [limitRenderPage, setLimitRenderPage] = useState(0);
    const [excludesLength, setExcludesLength] = useState(1);
    const [contentUpdate, setContentUpdate] = useState(false);

    const limit = 50


    const handlerSortChange = (value) => {
        setSort(value);
    }

    console.log(sendObj);


    // Запрос при скролле
    const generateDataScroll = async (scroll = false) => {
        if (searchCity) {

            const searchCityArr = searchCity.split('$')
            const regionIncludes = searchCityArr.splice(0, searchCityArr.length - excludesLength + 1).join('$')
            const regionExcludes = searchCityArr.reverse().splice(0, excludesLength).reverse().join('$')

            const scrollDataObj = {
                'user_id': id ? id : 0,
                'sort': sort,
                'page': page,
                'page_limit': limit,
                'region_includes': regionIncludes,
                'region_excludes': regionExcludes,
                ...sendObj
            }


            await getDataByPost(url, scrollDataObj)
                .then(response => {

                    if (Array.isArray(response) && response?.length) {

                        const lastId = response[response.length - 1]?.id

                        if (lastId) {
                            setLastIdAds(lastId)
                        }

                        setPost(prevState => [...prevState, ...modifyGetPostsData(response)])


                        if (scroll) {
                            setLimitRenderPage(0);
                        }

                        setContentUpdate(false);

                        if (response.length !== limit) {
                            setExcludesLength(excludesLength + 1);
                            setPage('end')
                        }

                    } else {

                        if (excludesLength > 4) {
                            setPage('end')
                            return;
                        }

                        setExcludesLength(excludesLength + 1);
                        setPage('end')
                    }
                })
        }
    };


    // Изменение города
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
        }
    }, [excludesLength])

    // Первая подгрузка (первый рендер, изменение области поиска, изменение города, сортировка)
    useEffect(() => {
        if (page === 1 && contentUpdate) {
            generateDataScroll()
        }
    }, [contentUpdate, page, excludesLength]);


    // Прогрузка объявлений при скролле
    useEffect(() => {
        if (page > 1 && post.length) {
            generateDataScroll(true)
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