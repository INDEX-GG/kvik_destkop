import { createContext, useContext, useState, useEffect } from "react";
import { getDataByPost, getTokenDataByPost } from "#lib/fetch";
import MD5 from "crypto-js/md5";
import { useAuth } from '#lib/Context/AuthCTX';

import { SIGN_SECRET } from "#lib/constants";
import debounce from 'lodash.debounce'

// глобальный массив для хранения просмотров карточек с объявления по наводке мышки.
// сделан так, для того чтобы не обновлять стейт слишком часто

let hoverViews =  []
const likesParser = (data) => {
    const likes = {}
    const unLikes = {}
    const finalObj = {
        like_posts: [],
        unlike_posts: []
    }
    data.like.forEach((item) => likes[item] = (likes[item] || 0) + 1 )
    data.unLike.forEach((item) => unLikes[item] = (unLikes[item] || 0) + 1 )

    for(const [key] of Object.entries(likes)) {
        if(likes[key] === undefined) {
            likes[key] = 0
        }
        if(unLikes[key] === undefined) {
            unLikes[key] = 0
        }
    }

    for(const [key] of Object.entries(unLikes)) {
        if(likes[key] === undefined) {
            likes[key] = 0
        }
        if(unLikes[key] === undefined) {
            unLikes[key] = 0
        }
    }

    for (const [key] of Object.entries(likes)) {

        const theySame = likes[key] === unLikes[key]
        const isLiked = likes[key] > unLikes[key]
        const isUnliked = likes[key] < unLikes[key]

        // console.log(likes[key], 'likes')
        // console.log(unLikes[key], 'unlikes')
        // console.log(theySame, 'they same')
        // console.log(isLiked, 'isLiked')
        // console.log(isUnliked, 'isUnliked')

        theySame ? null : null
        isLiked ? finalObj.like_posts.push(parseInt(key)) : null
        isUnliked ? finalObj.unlike_posts.push(parseInt(key)) : null
      }

    return finalObj


}

const subsParser = (data) => {
    const subs = {}
    const unSubs = {}
    const finalObj = {
        subscribe: [],
        unsubscribe: []
    }
    data.subscribe.forEach((item) => subs[item] = (subs[item] || 0) + 1 )
    data.unSubscribe.forEach((item) => unSubs[item] = (unSubs[item] || 0) + 1 )

    for(const [key] of Object.entries(subs)) {
        if(subs[key] === undefined) {
            subs[key] = 0
        }
        if(unSubs[key] === undefined) {
            unSubs[key] = 0
        }
    }

    for(const [key] of Object.entries(unSubs)) {
        if(subs[key] === undefined) {
            subs[key] = 0
        }
        if(unSubs[key] === undefined) {
            unSubs[key] = 0
        }
    }

    for (const [key] of Object.entries(subs)) {

        const theySame = subs[key] === unSubs[key]
        const isSub = subs[key] > unSubs[key]
        const isUnSub = subs[key] < unSubs[key]

        // console.log(likes[key], 'likes')
        // console.log(unLikes[key], 'unlikes')
        // console.log(theySame, 'they same')
        // console.log(isLiked, 'isLiked')
        // console.log(isUnliked, 'isUnliked')

        theySame ? null : null
        isSub ? finalObj.subscribe.push(parseInt(key)) : null
        isUnSub ? finalObj.unsubscribe.push(parseInt(key)) : null
      }

    return finalObj


}

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

const fetch = async (data, setState, id, token) => {
    const streamPosts = {
        posts_view: [...data.view, ...hoverViews].filter(onlyUnique),
        posts_cont: [...data.clickContact].filter(onlyUnique),
    }

    const likePosts = {
        like: [...data.like],
        unLike: [...data.unLike]
    }

    const subscribsePosts = {
        subscribe: [...data.subscribe],
        unSubscribe: [...data.unsubscribe]
    }

    const signKey = (obj) => {
        return Buffer.from(MD5(JSON.stringify(obj)
         + SIGN_SECRET).toString()).toString('base64')
    }


    if(likePosts.like.length || likePosts.unLike.length) {
        const finalLikesObj = likesParser(likePosts)
        const isEmpties = finalLikesObj.like_posts.length === 0 && finalLikesObj.unlike_posts.length === 0
        finalLikesObj.user_id = id
        isEmpties ? null : await getTokenDataByPost('/api/likePosts', finalLikesObj, token)
    }

    if(subscribsePosts.subscribe.length || subscribsePosts.unSubscribe.length) {
        const finalSubObject = subsParser(subscribsePosts)
        const isEmpties = finalSubObject.subscribe.length === 0 && finalSubObject.unsubscribe.length === 0
        finalSubObject.user_id = id
        isEmpties ? null : await getTokenDataByPost('/api/subscribe', finalSubObject, token)
    }



    if(streamPosts.posts_view.length || streamPosts.posts_cont.length) {
        await getDataByPost('/api/streamPosts', {...streamPosts, sign: signKey(streamPosts)})
        hoverViews = []
    }

    localStorage.removeItem('stats');
    setState({
        like: [],
        unLike: [],
        view: [],
        slideView: [],
        clickContact: [],
        subscribe: [],
        unsubscribe: [],
        search: [],
    })
    return
}


export const StatisticsCTX = createContext();

export const useStatistics = () => useContext(StatisticsCTX);


const StatisticsProvider = ({ children }) => {
    const {id, token} = useAuth()

    const [statModel, setStatModel] = useState({
        like: [],
        unLike: [],
        view: [],
        slideView: [],
        clickContact: [],
        subscribe: [],
        unsubscribe: [],
        search: [],

    })

    const addView = (id) => {
        return () => {
            setStatModel(prev => ({...prev, view:[...prev.view, id]}))
        }
    }

    // const addSlideView = (id) => {
    //     return () => {
    //         hoverViews.push(id)
    //         console.log(hoverViews)
    //     }
    // }

    const addSlideView = (id) => {
        return debounce(() => {
            hoverViews.push(id)
        }, 1000)
    }

    const addContactClick = (id) => {
        return () => {
            setStatModel(prev => ({...prev, clickContact:[...prev.clickContact, id]}))
        }
    }

    const addLike = (id) => {
        return () => {
            setStatModel(prev => ({...prev, like:[...prev.like, id]}))
        }
    }

    const addUnLike = (id) => {
        return () => {
            setStatModel(prev => ({...prev, unLike:[...prev.unLike, id]}))
        }
    }

    const addSubscribers = (id) => {
        return () => {
            setStatModel(prev => ({...prev, subscribe:[...prev.subscribe, id]}))
        }
    }

    const addUnsubscribe = (id) => {
        return () => {
            setStatModel(prev => ({...prev, unsubscribe:[...prev.unsubscribe, id]}))
        }
    }


    // effect для парсинга локал стореджа, на случай внезапного отключения.
    // если данные были, их нужно их отправить на бек и очистить сторедж
	useEffect(async () => {
        const statsFromLocalStorage = JSON.parse(localStorage.getItem('stats'))
        if(!statsFromLocalStorage) {
            return
        }

        await fetch(statsFromLocalStorage, setStatModel)
        localStorage.removeItem('stats')
	}, [])

// наполняем сторедж каждый раз при изменении состояния. Делается для случая внезапных отключений клиента
    useEffect(() => {
        const jsonStat = JSON.stringify(statModel)
        localStorage.setItem('stats', jsonStat)
    }, [statModel])

// запускаем интервал, для оптравки данных на бек.
    let intervalIDs = []
    useEffect(() => {
            const interval = window.setInterval(() => fetch(statModel, setStatModel, id, token), 60000)
            intervalIDs.push(interval)

            return(() => intervalIDs.forEach(clearInterval))
    }, [statModel])

	return (
		<StatisticsCTX.Provider value={{addView, addContactClick, addLike, addUnLike, addSubscribers, addUnsubscribe, addSlideView}}>
			{children}
		</StatisticsCTX.Provider>
	)
}

export default StatisticsProvider;