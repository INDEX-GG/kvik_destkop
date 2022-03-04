import { useEffect, useState } from 'react'

import { getDataByPost } from '#lib/fetch'
import {useCity} from "#lib/Context/CityCTX";
import {modifyGetPostsData} from "#lib/services";

export const useFetchSimilarPosts = (url, product_id) => {

  const {searchCity} = useCity()

  const [renderCards, setRenderCards] = useState([])

  const fetchSimilar = async () => {
    const response = await getDataByPost(url, {
      post_id: product_id,
      region: searchCity,
    })

    if(response.includes('ошибка')) {
      console.log('ошибка запроса similarPost: ', response)
    }

    setRenderCards(modifyGetPostsData(response))
  }

  useEffect(() => {
    fetchSimilar()
  }, [url, product_id, searchCity])

  return {
    renderCards
  }

}
