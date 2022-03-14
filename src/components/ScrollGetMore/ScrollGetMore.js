import React, { useState, useEffect, useMemo } from 'react'
import throttle from "lodash.throttle"
import { useRouter } from "next/router";

import { useAuth } from '#lib/Context/AuthCTX'
import {getTokenDataByPost} from '#lib/fetch'
import { getKeyArrayFilteredForObject } from '../../services/services'

/**
 *
 * @param {*} props
 * @returns
 */
const ScrollGetMore = (props) => Component => {
    /**
     *
     * @param {*} props
     * @returns
    */
    const ScrollToEnd = (componentProps) => {

        const routerHook = useRouter();
        const { id, token } = useAuth()

        const {url, tabs} = props;

        const isGetSeller = useMemo(
            () => url.includes('getSeller'),
            [url]
        )
        const isFirstLoad = useMemo(
            () => typeof id !== 'undefined' && id !== null && url,
            [id, url]
        )
        const routerContent = useMemo(
            () => componentProps.router ? (+componentProps.router.query.content - 1) : (+componentProps.itemNav.i - 1),
            [componentProps]
        )

        const [data, setData] = useState({})

        const [initialParamRequest, setInitialParamRequest] = useState({
            user_id: isGetSeller ? (+routerHook.query.id) : id,
            page: 1,
            page_limit: 20
        })

        // ? Логика контента =======================================

        const fetchData = async () => {
            return await getTokenDataByPost(props.url, {...initialParamRequest}, token)
        }

        const processingData = (postData) => {

            const arrayKeyResponsePost = getKeyArrayFilteredForObject(postData)

            const returnObj = {}

            arrayKeyResponsePost.forEach((keyPost, i) => {
                const nestedReturnObj = {}
                const arrayPost = postData[keyPost]

                nestedReturnObj['data'] = arrayPost
                nestedReturnObj['limit'] = arrayPost.length ? false : true
                nestedReturnObj['id_content'] = i + 1
                nestedReturnObj['name_content'] = keyPost

                returnObj[keyPost] = nestedReturnObj

            })

            return returnObj
        }

        const processingExistData = (postData) => {

            const arrayKeyResponsePost = getKeyArrayFilteredForObject(postData)

            const returnObj = {}

            arrayKeyResponsePost.forEach((keyPost) => {
                const nestedReturnObj = {}
                const arrayPost = postData[keyPost]

                const nestedReturnObjData = arrayPost

                nestedReturnObj['limit'] = data[keyPost].limit

                if(postData[keyPost].length < initialParamRequest.page_limit) {
                    nestedReturnObj['limit'] = true
                }
                nestedReturnObj['data'] = [...data[keyPost].data, ...nestedReturnObjData]
                nestedReturnObj['id_content'] = data[keyPost].id_content
                nestedReturnObj['name_content'] = data[keyPost].name_content

                returnObj[keyPost] = nestedReturnObj
            })

            return returnObj
        }

        const handlerSetData = (postData = {}, allTabPosts = {}) => {
            setData(prevState => ({
                ...prevState,
                ...postData,
                ...allTabPosts,
            }))
        }

        const handlerSetParamRequest = () => {
            setInitialParamRequest(prevState => ({
                ...prevState,
                page: prevState.page + 1
            }))
        }

        const getMoreData = async () => {
            if(!data[tabs[routerContent]].limit) {
                const _data = await fetchData()
                const allTabPosts = processingExistData(_data)
                handlerSetData(allTabPosts)
                handlerSetParamRequest()
            }
        }

        useEffect(() => {
            async function fetchOffers() {
                const resp = await fetchData()
                const allTabPosts = processingData(resp)
                handlerSetData(resp, allTabPosts)
                handlerSetParamRequest()
            }
            if(isFirstLoad) {
                fetchOffers()
            }
        }, [])

        // ? Логика скролла =======================================

		const throttleScrollHandler = throttle(scrollHandler, 800)

        const getScrollPercentage = () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            let documentHeight = Math.max(
                document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight,
                document.documentElement.scrollHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight
            );

            return Math.round(((scrollTop / (documentHeight - windowHeight)) * 100));
        }

        function scrollHandler () {
            const scrollPercentage = getScrollPercentage()
            // дошли до середины и есть что показывать
            const hasShowMore = (scrollPercentage >= 50 && !isNaN(scrollPercentage))

            if(hasShowMore) getMoreData()
        }

        useEffect(() => {
            document.addEventListener("scroll", throttleScrollHandler)
            return () => {
                document.removeEventListener("scroll", throttleScrollHandler)
            }
        }, [data, initialParamRequest, routerContent])

        return (
            <Component
                data={data}
                {...componentProps}
            />
        )
    }

    return ScrollToEnd
}

export default ScrollGetMore
