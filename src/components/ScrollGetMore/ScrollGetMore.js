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

        // console.log(props, componentProps)

        const { id, token } = useAuth()
        const routerContent = (+componentProps.router.query.content - 1)
        const {url, tabs} = props;
        // console.log('routerContent: ', routerContent)
        // console.log('props.tabs: ', props.tabs)

        const [initialParamRequest, setInitialParamRequest] = useState({
            user_id: id,
            page: 1,
            page_limit: 10
        })

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

                // returnObj[keyPost] = arrayPost.map(item => ({
                //     ...item,
                //     photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`)
                // }))
                // returnObj[keyPost] = arrayPost.length ? false : true
            })

            console.log('returnObj: ', returnObj)
            return returnObj

            /*
            // let active
            // let archive
            // let wait

            // if([...postData.active_posts, ...postData.archive_posts, ...postData.wait_posts]?.length) {
            //     active = postData.active_posts?.map(item => ({
            //         ...item,
            //         photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`),
            //     }))

            //     archive = postData.archive_posts?.map(item => ({
            //         ...item,
            //         photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`),
            //     }))

            //     wait = postData.wait_posts?.map(item => ({
            //         ...item,
            //         photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`),
            //     }))
            // }

            // return {active, archive, wait}
            */
        }

        const processingExistData = (postData) => {



            const keyResponse = Object.keys(postData)
            const arrayKeyResponsePost = keyResponse.filter(k => Array.isArray(postData[k]))

            const returnObj = {}


            arrayKeyResponsePost.forEach((keyPost) => {
                const arrayPost = postData[keyPost]

                // console.log(arrayPost)
                const nestedReturnObj = {}


                console.log(initialParamRequest.page_limit)
                console.log(postData[keyPost].length)

                const nestedReturnObjPhotos = arrayPost.map(item => ({
                    ...item,
                    photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`)
                }))
                // nestedReturnObj['limit'] = arrayPost.length ? false : true
                nestedReturnObj['limit'] = data[keyPost].limit

                if(postData[keyPost].length < initialParamRequest.page_limit) {
                    nestedReturnObj['limit'] = true
                }
                nestedReturnObj['id_content'] = data[keyPost].id_content
                nestedReturnObj['name_content'] = data[keyPost].name_content
                nestedReturnObj['data'] = [...data[keyPost].data, ...nestedReturnObjPhotos]

                // console.log('data[keyPost]: ', data[keyPost].data)
                // console.log('nestedReturnObj: ', nestedReturnObj)
                // console.log('join: ', [...data[keyPost].data, ...nestedReturnObj])

                returnObj[keyPost] = nestedReturnObj

                // returnObj[keyPost] = arrayPost.map(item => ({
                //     ...item,
                //     photo: photos2arr(item.photo)?.map(img => `${STATIC_URL}/${img}`)
                // }))
                // returnObj[keyPost] = arrayPost.length ? false : true
            })

            // console.log('processingExistData-returnObj: ', returnObj)
            return returnObj
        }

        const concatData = (postData, allTabPosts) => {
            console.log(data)
            console.log(allTabPosts)
            // debugger
            if(allTabPosts) {
                // console.log(allTabPosts[tabs[routerContent]])


                // if(allTabPosts[tabs[routerContent]].length < initialParamRequest.page_limit) {
                //     console.log('зашли в условие true')
                //     // console.log([allTabPosts[tabs[routerContent]].name_content])
                //     const asd1 = allTabPosts[tabs[routerContent]]
                //     const asd = allTabPosts[tabs[routerContent]].name_content
                //     console.log(data)
                //     // debugger

                //     setData(prevState => ({
                //         ...prevState,
                //         ...allTabPosts,
                //         [allTabPosts[tabs[routerContent]].name_content]: {
                //             ...prevState[asd],
                //             limit: true,
                //             data: [...prevState[asd].data, ...asd1.data]
                //         }
                //     }))
                // }else {
                //     console.log('зашли в условие false')
                    // меняем во всех вкладках
                    setData(prevState => ({
                        ...prevState,
                        ...allTabPosts,
                        // [allTabPosts[tabs[routerContent]].name_content].limit = false
                    }))
                // }





                // switch(+routerContent) {
                //     case 1:
                //         console.log(1)
                //         setData(prevState => ({
                //             ...prevState,
                //             active_posts: [...prevState.active_posts, ...active],
                //             // archive_posts: [...prevState.archive_posts, ...archive],
                //             // wait_posts: [...prevState.wait_posts, ...wait],
                //         }))
                //     case 2:
                //         console.log(2)
                //         setData(prevState => ({
                //             ...prevState,
                //             // active_posts: [...prevState.active_posts, ...active],
                //             // archive_posts: [...prevState.archive_posts, ...archive],
                //             wait_posts: [...prevState.wait_posts, ...wait],
                //         }))
                //     case 3:
                //         console.log(3)
                //         setData(prevState => ({
                //             ...prevState,
                //             // active_posts: [...prevState.active_posts, ...active],
                //             archive_posts: [...prevState.archive_posts, ...archive],
                //             // wait_posts: [...prevState.wait_posts, ...wait],
                //         }))
                // }
            }
        }

        const getMoreData = async () => {
            console.log('routerContent: ', routerContent)
            console.log('tabs[routerContent]: ', tabs[routerContent])
            console.log(data[tabs[routerContent]])
            console.log(!data[tabs[routerContent]].limit)
            if(!data[tabs[routerContent]].limit) {
                const _data = await fetchData()
                // console.log('getMoreData-_data: ', _data)
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
                const allTabPosts = processingData(resp)
                initializeData(resp, allTabPosts)
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
            // const hasShowMore = (_scrollTop > _scrollHeight / 2) && (limitShow <= lengthCards)
            const hasShowMore = (_scrollTop > _scrollHeight / 4)

            if(hasShowMore) {
                console.log('подгружаем еще')
                // console.log(componentProps.router.query.content)
                getMoreData()
            }
        }

        useEffect(() => {
            document.addEventListener("scroll", throttleScrollHandler)
            return () => {
              document.removeEventListener("scroll", throttleScrollHandler)
            }
        }, [data, initialParamRequest, routerContent])

        return <Component {...componentProps} offers={data} />
    }

    return ScrollToEnd
}

export default ScrollGetMore
