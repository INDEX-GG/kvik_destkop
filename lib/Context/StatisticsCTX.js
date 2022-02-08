import { createContext, useContext, useState, useEffect } from "react";
import { getDataByPost, getTokenDataByPost } from "#lib/fetch";
import MD5 from "crypto-js/md5";
import { useAuth } from '#lib/Context/AuthCTX';

import { SIGN_SECRET } from "#lib/constants";
import debounce from 'lodash.debounce'


// глобальный массив для хранения просмотров карточек с объявления по наводке мышки.
// сделан так, для того чтобы не обновлять стейт слишком часто

let hoverViews =  []
// функция вернет лайк, дизлайк, либо ничего
// например если юзер 101 раз нажал лайк и 100 раз дизлайк, в финале мы получим всего 1 лайк
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

        theySame ? null : null
        isLiked ? finalObj.like_posts.push(parseInt(key)) : null
        isUnliked ? finalObj.unlike_posts.push(parseInt(key)) : null
      }

    return finalObj


}
// тоже самое что likesParse только для попдисок
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

        theySame ? null : null
        isSub ? finalObj.subscribe.push(parseInt(key)) : null
        isUnSub ? finalObj.unsubscribe.push(parseInt(key)) : null
      }

    return finalObj


}
// вытягиваем уникальные просмотры
const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
// функция отправки статистики
const fetch = async (data, setState, id, token) => {

    const streamPosts = {
        posts_view: [...data.view, ...hoverViews].filter(onlyUnique),
        posts_cont: [...data.clickContact,].filter(onlyUnique),
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

    if(streamPosts.posts_view.length || streamPosts.posts_cont.length) {
        const local = JSON.parse(localStorage.getItem('stats'))
        await getDataByPost('/api/streamPosts', {...streamPosts, sign: signKey(streamPosts)})
        // чистим внешнюю переменную (тут хранятся просмотры слайдов)
        hoverViews = []
        setState(prev => ({...prev, view:[], clickContact:[]}))
        localStorage.setItem('stats', JSON.stringify({...local, view:[], clickContact:[]}))
    }


    if(likePosts.like.length || likePosts.unLike.length) {
        if(!id || !token) return
        const finalLikesObj = likesParser(likePosts)
        const isEmpties = finalLikesObj.like_posts.length === 0 && finalLikesObj.unlike_posts.length === 0
        finalLikesObj.user_id = id
        isEmpties ? null : await getTokenDataByPost('/api/likePosts', finalLikesObj, token)
    }

    if(subscribsePosts.subscribe.length || subscribsePosts.unSubscribe.length) {
        if(!id || !token) return
        const finalSubObject = subsParser(subscribsePosts)
        const isEmpties = finalSubObject.subscribe.length === 0 && finalSubObject.unsubscribe.length === 0
        finalSubObject.user_id = id
        isEmpties ? null : await getTokenDataByPost('/api/subscribe', finalSubObject, token)
    }



    // if(streamPosts.posts_view.length || streamPosts.posts_cont.length) {
    //     await getDataByPost('/api/streamPosts', {...streamPosts, sign: signKey(streamPosts)})
    //     hoverViews = []
    // }

    // если все условия выполнены можно очистить локалсторедж и модель статистики
    localStorage.removeItem('stats');
    setState({
        like: [],
        unLike: [],
        view: [],
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
    const [isLogout, setIsLogout] = useState(false)
    const [statModel, setStatModel] = useState({
        like: [],
        unLike: [],
        view: [],
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

    const addSlideView = (id) => {
        return debounce(() => {
            hoverViews.push(id)
        }, 1000)
    }

    const addContactClick = (id) => {
        return () => {
            setStatModel(prev => ({
                ...prev, 
                clickContact:[...prev.clickContact, id], 
                view:[...prev.view, id]
            }))
        }
    }

    const addLike = (id) => {
        return () => {
            setStatModel(prev => ({
                ...prev, 
                like:[...prev.like, id], 
                view:[...prev.view, id]
            }))
        }
    }

    const addUnLike = (id) => {
        return () => {
            setStatModel(prev => ({
                ...prev, 
                unLike:[...prev.unLike, id], 
                view:[...prev.view, id]
            }))
        }
    }

    const addSubscribers = (id) => {
        return () => {
            setStatModel(prev => ({
                ...prev, 
                subscribe:[...prev.subscribe, id], 
            }))
        }
    }

    const addUnsubscribe = (id) => {
        return () => {
            setStatModel(prev => ({
                ...prev, 
                unsubscribe:[...prev.unsubscribe, id], 
            }))
        }
    }


    // effect для парсинга локал стореджа, на случай внезапного отключения.
    // если данные были, их нужно их отправить на бек и очистить сторедж
    // сторедж очистится, так же если выйти из аккаунта (операция выполняется в auth контексте)
	useEffect(async () => {
        const statsFromLocalStorage = JSON.parse(localStorage.getItem('stats'))
        if(!statsFromLocalStorage) {
            return
        }

        await fetch(statsFromLocalStorage, setStatModel, id, token)
        // localStorage.removeItem('stats')
	}, [id])

// наполняем сторедж каждый раз при изменении состояния. Делается для случая внезапных отключений клиента
    useEffect(() => {
        let obj = {...statModel}
        const local = JSON.parse(localStorage.getItem('stats'))
        // если айдишник не пришел, не забываем сохранить ранее записанные данные из локала
        // нужно только для авторизованого пользователя
        if(local !== null && !id) {

            if(local?.like !== undefined) {
                obj.like = [...obj?.like, ...local?.like]
            }
            if(local?.unlike !== undefined) {
                obj.unlike = [...obj?.unlike, ...local?.unlike]
            }
            if(local?.subscribe !== undefined) {
                obj.subscribe = [...obj?.subscribe, ...local?.subscribe]
            }
            if(local?.unsubscribe !== undefined) {
                obj.unsubscribe = [...obj?.unsubscribe, ...local?.unsubscribe]
            }
        }
        const jsonStat = JSON.stringify(obj)
        localStorage.setItem('stats', jsonStat)
    }, [statModel])

// данный юзэеффект выполнится только перед логаутом пользователя, для того чтобы отправить статистику авторизованого пользователя
// Лайки подписки и так далее. Все что требует токена или айдишника.
    useEffect(async () => {
        if(!isLogout) return

        const statsFromLocalStorage = JSON.parse(localStorage.getItem('stats'))

        if(!statsFromLocalStorage) {
            return
        }

        await fetch(statsFromLocalStorage, setStatModel, id, token)
        setIsLogout(false)
	}, [isLogout])


// запускаем интервал, для оптравки данных на бек.
    let intervalIDs = []
    useEffect(() => {
            const interval = window.setInterval(() => fetch(statModel, setStatModel, id, token), 30000)
            intervalIDs.push(interval)

            return(() => intervalIDs.forEach(clearInterval))
    }, [statModel, token])

    // useEffect(() => {
    //     window.addEventListener('unload', fetch(statModel, setStatModel, id, token))

    //     return(() => window.removeEventListener('unload'))
    // }, [])

	return (
		<StatisticsCTX.Provider value={{
            addView, 
            addContactClick, 
            addLike, 
            addUnLike, 
            addSubscribers, 
            addUnsubscribe, 
            addSlideView, 
            setIsLogout
        }}>
			{children}
		</StatisticsCTX.Provider>
	)
}

export default StatisticsProvider;