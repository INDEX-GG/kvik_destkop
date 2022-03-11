import React, { useState, useEffect } from 'react'

import { photos2arr } from '#lib/services'
import { STATIC_URL } from '#lib/constants'

export const useOffersLoading = (data, setData) => {

    const processingData = (postData) => {

        const keyResponse = Object.keys(postData)
        const arrayKeyResponsePost = keyResponse.filter(k => Array.isArray(postData[k]))

        const returnObj = {}

        arrayKeyResponsePost.forEach((keyPost, i) => {
            const nestedReturnObj = {}
            const arrayPost = postData[keyPost]

            nestedReturnObj['data'] = arrayPost.map(item => ({
                ...item,
                photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`)
            }))
            nestedReturnObj['limit'] = arrayPost.length ? false : true
            nestedReturnObj['id_content'] = i + 1
            nestedReturnObj['name_content'] = keyPost

            returnObj[keyPost] = nestedReturnObj

        })

        return returnObj
    }

    const initializeData = (postData, allTabPosts) => {
        setData(prevState => ({
            ...prevState,
            ...postData,
            ...allTabPosts,
        }))
    }

    const processingExistData = (postData) => {

        const keyResponse = Object.keys(postData)
        const arrayKeyResponsePost = keyResponse.filter(k => Array.isArray(postData[k]))

        const returnObj = {}

        arrayKeyResponsePost.forEach((keyPost) => {
            const arrayPost = postData[keyPost]

            const nestedReturnObj = {}

            const nestedReturnObjPhotos = arrayPost.map(item => ({
                ...item,
                photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`)
            }))

            nestedReturnObj['limit'] = data[keyPost].limit

            if(postData[keyPost].length < initialParamRequest.page_limit) {
                nestedReturnObj['limit'] = true
            }
            nestedReturnObj['id_content'] = data[keyPost].id_content
            nestedReturnObj['name_content'] = data[keyPost].name_content
            nestedReturnObj['data'] = [...data[keyPost].data, ...nestedReturnObjPhotos]

            returnObj[keyPost] = nestedReturnObj

        })

        return returnObj
    }

    const concatData = (allTabPosts) => {
        if(allTabPosts) {
            setData(prevState => ({
                ...prevState,
                ...allTabPosts,
            }))
        }
    }

    const getMoreData = async () => {
        if(!data[tabs[routerContent]].limit) {
            console.log('подгружаем еще')
            console.log('initialParamRequest: ', initialParamRequest)

            const _data = await fetchData()
            console.log('_data: ', _data)
            const allTabPosts = processingExistData(_data)

            concatData(_data, allTabPosts)
            setInitialParamRequest(prevState => ({
                ...prevState,
                page: prevState.page + 1
            }))

        }
    }

    useEffect(() => {
        const allTabPosts = processingData(data)
        initializeData(data, allTabPosts)
    }, [data])

    return {
        dataOffers: data
    }
}
