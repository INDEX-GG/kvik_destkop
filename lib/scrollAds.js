import {STATIC_URL} from "./constants";

import {getDataByPost} from "./fetch";
import {modifyGetPostsData} from "./services";


// !!! ПО ВОЗМОЖНОСТИ ПЕРЕПИСАТЬ ВСЁ

export const scrollAds = async (scrollData) => {

    const {
        id,
        isAuth,
        page,
        limit,
        data,
        setData,
        setLastIdAds,
        setLimitRanderPage,
        setPage,
        sort,
        region_includes,
        region_excludes
    } = scrollData

    if (isAuth) {
        if (page > 1 && id) {
            await getDataByPost('/api/getPostsPortion', {
                'page_limit': limit,
                'page': page,
                'user_id': id,
                sort,
                region_includes,
                region_excludes
            }).then(r => {
                setLimitRanderPage(0)
                if (Array.isArray(r)) {
                    setData([...data, ...modifyGetPostsData(r)])
                    setLastIdAds(r[r.length - 1].id)
                } else {
                    setPage('end')
                }

            })
        }
    } else {
        if (page > 1) {
            await getDataByPost('/api/getPostsPortion', {
                'page_limit': limit,
                'page': page,
                'user_id': id ? id : 0,
                sort,
                region_includes,
                region_excludes
            }).then(r => {
                setLimitRanderPage(0)
                if (r.length == 0) setPage('end');
                if (r.length) {
                    setData([...data, ...modifyGetPostsData(r)])
                    setLastIdAds(r[r.length - 1].id)
                }
            })
        }
    }
}

export const categoryScroll = async (api, fetchDataObj, setObj) => {
    await getDataByPost(api, fetchDataObj).then(r => {
        if (r !== undefined) {
            try {
                const offersData = r.map(offer => {
                    return {
                        ...offer,
                        photo: JSON.parse(offer.photo)?.photos.map(img => `${STATIC_URL}/${img}`)
                    }
                })
                if (r.length == 0) setObj.setPage('end');
                if (r.length) {
                    setObj.setData(prev => [...prev, ...offersData]);
                    setObj.setLastIdAds(r[r.length - 1].id)
                }
            } catch (e) {
                console.log(e);
            }
        }
    })
    setObj.setLimitRenderPage(0)
}

export const firstAds = (data) => {
    const {id, isAuth, page, limit, setData, setLastIdAds, sort, region_includes, region_excludes, setPage} = data

    if (isAuth) {
        if (id) {
            const dataObj = {'page_limit': limit, 'page': page, 'user_id': id, sort, region_includes, region_excludes}
            getDataByPost('/api/getPostsPortion', dataObj).then(r => {
                console.log(r);
                setData(modifyGetPostsData(r))
                if (r?.length > 1) setLastIdAds(r[r.length - 1].id)

                if (r.length !== limit) setPage('end')
            })
        }
    } else {
        const dataObj = {'page_limit': limit, 'page': page, 'user_id': 0, sort, region_includes, region_excludes}
        getDataByPost('/api/getPostsPortion', dataObj).then(r => {
            setData(modifyGetPostsData(r))
            if (r?.length > 1) setLastIdAds(r[r.length - 1].id)
        })
    }
}


export const observerGenerate = (lastElement, observer, limitRender, setLimitRenderPage, setPage, page) => {
    if (lastElement.current) {
        if (observer.current) observer.current.disconnect();

        let callback = (entries) => {
            if (entries[0].isIntersecting && limitRender === 0 && page !== 'end') {

                // console.log('UPDAAAAAAAAAAAAAAAAAAAAATE', lastElement.current)
                setLimitRenderPage(1)
                setPage(page + 1)
            }
        };
        console.log(lastElement)
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    }
}