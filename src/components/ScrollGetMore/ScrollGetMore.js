import React, { useState, useEffect } from 'react'
import throttle from "lodash.throttle"

import { useAuth } from '#lib/Context/AuthCTX'
import { getTokenDataByPost } from '#lib/fetch'
import { STATIC_URL } from '#lib/constants'
import { photos2arr } from '#lib/services'


/**
 *
 * @param {*} Component
 */
const ScrollGetMore = (props) => Component => {
    /**
     *
     * @param {componentProps} Initial props component
     * @returns Component
     */
    const ScrollToEnd = (componentProps) => {

        const { id, token } = useAuth()
        const routerContent = (+componentProps.router.query.content - 1)
        const {url, tabs} = props;

        const [initialParamRequest, setInitialParamRequest] = useState({
            user_id: id,
            page: 1,
            page_limit: 10
        })

        console.log('initialParamRequest: ', initialParamRequest)

        const [data, setData] = useState({})

        // ? Логика контента =======================================

        const fetchData = async () => {
            return await getTokenDataByPost(props.url, {...initialParamRequest}, token)
        }

        const initializeData = (postData, allTabPosts) => {
            // setData(prevState => ({
            //     ...prevState,
            //     ...postData,
            //     active_posts: active,
            //     archive_posts: archive,
            //     wait_posts: wait,
            // }))
            setData(prevState => ({
                ...prevState,
                ...postData,
                ...allTabPosts,
            }))
            setInitialParamRequest(prevState => ({
                ...prevState,
                page: prevState.page + 1
            }))
        }

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
            async function fetchOffers() {
                const resp = await fetchData()
                // console.log('resp: ', resp)
                setData(resp)
                setInitialParamRequest(prevState => ({
                    ...prevState,
                    page: prevState.page + 1
                }))
                // const allTabPosts = processingData(resp)
                // initializeData(resp, allTabPosts)
            }
            if(url) {
                fetchOffers()
            }
        }, [])

        // ? Логика скролла =======================================

		const throttleScrollHandler = throttle(scrollHandler, 500)

        function scrollHandler (e) {
            const _scrollHeight = e.target.documentElement.scrollHeight;
            const _scrollTop = e.target.documentElement.scrollTop;

            console.log('_scrollHeight: ', _scrollHeight / 4)
            console.log('_scrollTop: ', _scrollTop)

            // дошли до середины и есть что показывать
            const hasShowMore = (_scrollTop > _scrollHeight / 4)

            if(hasShowMore) {
                getMoreData()
            }
        }

        useEffect(() => {
            document.addEventListener("scroll", throttleScrollHandler)
            return () => {
              document.removeEventListener("scroll", throttleScrollHandler)
            }
        }, [data, initialParamRequest, routerContent])

        return (
            <Component
                {...componentProps}
                data={data}
                setData={setData}
            />
        )
    }

    return ScrollToEnd
}

export default ScrollGetMore
