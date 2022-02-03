import { createContext, useContext, useState, useEffect } from "react";
import { getDataByPost } from "#lib/fetch";
import MD5 from "crypto-js/md5";

import { SIGN_SECRET } from "#lib/constants";

// import axios from "axios";

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

const fetch = async (data, setState) => {
    const streamPosts = {
        posts_view: [...data.view].filter(onlyUnique),
        posts_cont: [...data.clickContact].filter(onlyUnique),
    }

    const likePosts = {
        like: [...data.like].filter(onlyUnique),
        unLike: [...data.unLike].filter(onlyUnique)
    }

    const signKey = (obj) => {
        return Buffer.from(MD5(JSON.stringify(obj)
         + SIGN_SECRET).toString()).toString('base64')
    }

    if(likePosts.like.length || likePosts.unLike.length) {
        // api for likePosts
    }

    if(streamPosts.posts_view.length || streamPosts.posts_cont.length) {
        await getDataByPost('/api/streamPosts', {...streamPosts, sign: signKey(streamPosts)})
        localStorage.removeItem('stats');
        setState({
            like: [],
            unLike: [],
            view: [],
            slideView: [],
            clickContact: [],
            search: []
        })
    }
    return
}


export const StatisticsCTX = createContext();

export const useStatistics = () => useContext(StatisticsCTX);


const StatisticsProvider = ({ children }) => {
    const [statModel, setStatModel] = useState({
        like: [],
        unLike: [],
        view: [],
        slideView: [],
        clickContact: [],
        search: []
    })


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
            const interval = window.setInterval(() => fetch(statModel, setStatModel), 60000)
            intervalIDs.push(interval)

            return(() => intervalIDs.forEach(clearInterval))
    }, [statModel])





    const addView = (id) => {
        return () => {
            setStatModel(prev => ({...prev, view:[...prev.view, id]}))
        }
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


	return (
		<StatisticsCTX.Provider value={{addView, addContactClick, addLike}}>
			{children}
		</StatisticsCTX.Provider>
	)
}

export default StatisticsProvider;