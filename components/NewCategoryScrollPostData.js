import React, {useEffect, useState} from 'react';
import {useCity} from "../lib/Context/CityCTX";
import {getDataByPost} from "../lib/fetch";
import {modifyGetPostsData} from "../lib/services";
import { makeStyles } from '@material-ui/core';
// import { useProduct } from '#hooks/useProduct';
// import { useRouter } from 'next/router';
import Union from '../UI/icons/Union';
import OffersRenderGridIcon from '#UI/icons/OffersRenderGridIcon';
import OffersRenderListIcon from '#UI/icons/OffersRenderListIcon';
import {useAuth} from "../lib/Context/AuthCTX";
import { useMedia } from '../hooks/useMedia';
import { Typography } from '@material-ui/core';
import throttle from 'lodash.throttle';

// old card component
// import AdCard_component from './AdCard';
// new card component
import AdCard from '../src/components/AdCard/AdCard'


const useStyles = makeStyles(() => ({
	button: {
		display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
		cursor: 'pointer',
		marginRight: 'auto',
		marginLeft: 'auto',
        marginTop: '30px',
		width: '336px',
		height: '45px',
		backgroundColor: 'transparent',
		border: '1px solid #00A0AB',
		borderRadius: '5px',
		fontSize: '18px',
		fontWeight: '500px',
		color: '#00A0AB'
	},
    buttonText: {
        marginLeft: '10px'
    },
    categoryCardsWrapper: {
        display:'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '12px',

    },
    categoryCardsWrapperActive: {
        display:'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridGap: '12px',
    },
    offersGridSwitcher: {
		display: 'flex',
        justifyContent: 'space-between',
        height: '36px',
        alignItems: 'center',
        // marginBottom: '7px',
		'& svg:first-child': {
			marginRight: '15px'
		},
		'& svg': {
			// display: 'inline-block'
		}
	},


}));

// {"post_id": 2366, "region": "", "model": "A4", "brand": "Audi"}
// POST        /api/similarPosts

const CategoryScrollPostData = ({url, product}) => {
    const [similarData, setSimilarData] = useState([])
    const [renderCards, setRenderCards] = useState([]);
    const [endPage, setEndPage] = useState(8)
    const [stashNubmer, setStashNumber] = useState(null)
    const [gridView, setGridView] = useState(true)
    const [oneMoreFetch, setOneMoreFetch] = useState(true)

    const classes = useStyles();
    // const router = useRouter()
    // const product = useProduct(router.query.id)
    const {searchCity} = useCity()
    const {id} = useAuth()
    const {matchesMobile, matchesTablet} = useMedia()
    const mobile = matchesMobile || matchesTablet

    const throttleScrollHandler = throttle(scrollHandler, 500)


    // устанавливает лимит карточек для рендера. После запроса доступно всего 24 карты, рендерим только по 8
    useEffect(() => {
        setRenderCards([...similarData.slice(0, endPage)])
    }, [endPage, similarData])
    // StashNum - номер кол-ва подгружаемых страниц. По умолчанию 8шт.
    // Если кол-во не отрисованных карт останется от до 1-7, число кнопки сменится на корректное
    useEffect(() => {
        const stashNum = similarData.length - renderCards.length
        setStashNumber(stashNum > 8 ? 8 : stashNum)
    }, [renderCards, similarData.length])
    // вешаем скролл слушатель при мобильном экране
    useEffect(()=> {
        if(mobile){
        document.addEventListener('scroll', throttleScrollHandler)
        return ()=>{
            document.removeEventListener('scroll', throttleScrollHandler)
        }
    }
    }, [mobile])

    // эксперементальное решение, нуждается в тестах, когда будет создано больше объявлений
    useEffect(() => {
        setSimilarData([])
        setRenderCards([])
        setEndPage(8)
        setStashNumber(null)
        setOneMoreFetch(true)
    }, [product.id])
    // вызов запрроса, срабатывает при первом заходе и после перехода на другую страницу, выбранную из карточек "рекомендуемое"
    useEffect(() => {
        fetchSimilar()
    }, [product.id, searchCity, similarData.length])

    function scrollHandler (e) {
        const pixelsFromBottom = (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop)-window.innerHeight;

        if(pixelsFromBottom < 200){
            setEndPage((prevState)=>prevState + 8)
        }
    }

    function loaderHandler() {
        setEndPage(endPage + 8)
    }

    async function fetchSimilar() {

        if(!product.id || !searchCity || !oneMoreFetch ) {
            return
        }
        if(similarData.length === 0) {
            const data = {
                post_id: product.id,
                region: searchCity,
            }
            console.log('url: ', url)
            const response = await getDataByPost(url, data)


            const filtered_array = response.filter(item => item.photo === null)
            console.log('filtered_array: ', filtered_array)



            response[2].photo = null

            if(!response.length) {
                setOneMoreFetch(false)
                return
            }

            if(response.includes('ошибка')) {
                return
            }

            setSimilarData(modifyGetPostsData(response))
        }
        return
    }



    const classSwitcher = () => {
		// if(gridView) return classes.categoryCardsWrapper
		// if((!gridView && mobile) ) return `${classes.categoryCardsWrapperActive}`
		// else return classes.categoryCardsWrapper
        if(gridView) return 'scrollableOffersHome'
		if(!gridView && mobile) return 'scrollableOffersHome scrollableOffersHomeV2'
		else return 'scrollableOffersHome'
	}



    return (
    <>
        {renderCards.length > 0 && <div className={classes.offersGridSwitcher}>
             <Typography  variant='h2'>{'Похожие объявления'}</Typography>

            {mobile &&
            <div>
                <OffersRenderGridIcon clickHandler={()=>setGridView(true)} color={gridView ? '#5a5a5a' : '#8f8f8f'} />
                <OffersRenderListIcon clickHandler={()=>setGridView(false)} color={gridView ? '#8f8f8f' : '#5a5a5a'}/>
            </div>}
        </div>}

        <div className={classSwitcher()}>
            {/* {renderCards.map((it, index)=> <AdCard_component id={id} isGrid={gridView} key={index} offer={it}/>)} */}
            {renderCards.map((it, index)=> <AdCard id={id} isGrid={gridView} key={index} offer={it}/>)}
        </div>
        {stashNubmer > 0
        &&
        !mobile
        &&
        <button
            className={classes.button}
            onClick={loaderHandler}
        >
           <Union/>
           <span className={classes.buttonText}>загрузить еще {stashNubmer} объявлений</span>
        </button>}
    </>

    );
};

export default CategoryScrollPostData;
