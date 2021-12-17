import React, {useEffect, useRef, useState} from 'react';
import OffersRender from "./OffersRender";
// import {firstAds} from "../lib/scrollAds";
import {useAuth} from "../lib/Context/AuthCTX";
import {useCity} from "../lib/Context/CityCTX";
import {getDataByPost} from "../lib/fetch";
import {modifyGetPostsData} from "../lib/services";

const ScrollPostData = () => {

  const {isAuth, id} = useAuth();
  const {searchCity} = useCity()

  const [data, setData] = useState([]);
  const [sort, /** 60 */] = useState('default')

  const [page, setPage] = useState(1);
  const [lastIdAds ,setLastIdAds] = useState(0);
  const [limitRenderPage, setLimitRenderPage] = useState(0);
  const currentRanderPage = useRef();

  const limit = 50

  console.log(lastIdAds);


  const scrollDataObj = {
    'user_id': id ? id : 0,
    'sort': sort,
    'page': page,
    'page_limit': limit,
    'region_includes': searchCity,
    'region_excludes': ''
  }


  // Запрос при скролле
  const generateDataScroll = async (scroll = false) => {

    await getDataByPost('/api/getPostsPortion', scrollDataObj)
      .then(response => {

        if (scroll) {
          setLimitRenderPage(0);
        }

        if (Array.isArray(response) && response?.length) {

          const lastId = response[response.length - 1]?.id
          setData([...data, ...modifyGetPostsData(response)])

          if (lastId) setLastIdAds(lastId)
          if (response.length !== limit) setPage('end')

        } else {
          setPage('end')
        }
      })
  };


  useEffect(() => {
    currentRanderPage.current += 1;
  })

  // Первая подгрузка
  useEffect(() => {
    generateDataScroll()
  }, []);


  useEffect(() => {
    if (searchCity) {
      setPage(1);
      setData([]);
    }
  }, [searchCity]);


  // Прогрузка объявлений при скролле
  useEffect(() => {
    if (isAuth && page > 1 && id) {
      generateDataScroll(true)
      return;
    }

    if (page > 1) {
      generateDataScroll(true)
    }
  }, [page])




  return (
    <OffersRender
      title={'Рекомендуемое'}
      data={data}
      page={page}
      limitRender={limitRenderPage}
      setLimitRenderPage={setLimitRenderPage}
      setPage={setPage}
    />
  );
};

export default ScrollPostData;