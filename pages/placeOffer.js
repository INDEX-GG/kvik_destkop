import {useEffect, useState} from 'react';
import { Backdrop, makeStyles } from '@material-ui/core';
import MetaLayout from '../layout/MetaLayout';
import { useMedia } from '../hooks/useMedia';
import { useAuth } from '../lib/Context/AuthCTX';
import Loader from '../UI/icons/Loader';
import PlaceOfferMobile from '../components/placeOffer/placeOfferMobile';
import Promotion from '../components/placeOffer/Promotion';
import axios from 'axios';
import { BASE_URL, STATIC_URL, /** CACHE_URL */ } from '../lib/constants';
import {useStore} from "../lib/Context/Store";
import {getTokenDataByPost} from "../lib/fetch";
import {generateAdditionalFields, generateSearchName, generateTitle, ToRusDate} from "../lib/services";
import NewPlaceOfferContent from "#components/placeOffer/newPlaceOffer/NewPlaceOfferContent";
import {useForm, FormProvider} from "react-hook-form";
import useCategoryV2 from "#hooks/useCategoryV2";
import {useRouter} from 'next/router';
import { useProduct } from '#hooks/useProduct';
import {dynamicPhotosArr} from "../src/services/services";

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		flexDirection: 'column',
		alignItems: 'center',
		flexGrow: 1,
		marginTop: '25px',
		[theme.breakpoints.down('md')]: {
			paddingLeft: '220px',
		},
	},
	title: {
		marginBottom: theme.spacing(1),
	},
	offersBox: {
		width: '712px',
	},
	formPart: {
		padding: theme.spacing(4),
		borderRadius: theme.shape.borderRadius,
		boxShadow: theme.shadows[2],
		marginBottom: theme.spacing(4),
	},
	submit: {
		display: 'flex',
		alignItems: 'center'
	},
	backdrop: {
		zIndex: 2000,
		backgroundColor: 'rgba(255, 255, 255, 0.85)',
	},

}));




function PlaceOffer({editCategory, changePage=false, commonFields, currentAdditionalFields = {price: ''}}) {

    const classes = useStyles();
    const { matchesMobile, matchesTablet } = useMedia();
    const methods = useForm({defaultValues: currentAdditionalFields });
    const router = useRouter()

    const { id, token } = useAuth();
    const {userInfo} = useStore()
    const {getMoreCategory} = useCategoryV2();
    const {id: productId} = useProduct(router.query.id)



    const [loading, setLoading] = useState(false);
    // promotion - boolean ? рендерить маленькую карточку после успешной подачи\редактирования
    const [promotion, setPromotion] = useState(false);
    // данные для маленькой карточки, которая рендерится после публикации или редактирования объявления
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState();
    const [photoes, setPhotoes] = useState([])


    // let photoes = [];

    const photoesCtx = (obj) => {
        setPhotoes(obj)
        return
    }


    /* получение дополнительных полей */
    const aliasObj = {
        aliasOne: methods.watch('alias1'),
        aliasTwo: methods.watch('alias2'),
        aliasThree: methods.watch('alias3'),
    }
    // текущий объект категории
    const currentCategory = getMoreCategory(aliasObj.aliasOne, aliasObj.aliasTwo, aliasObj.aliasThree);

    const title = currentCategory?.title
    // отрисовка полей при редактировании, значения получаем из edigPage/[id]
    useEffect(() => {
        if (changePage && editCategory) {
            const innerAlias = 'alias'
            const categoriesField = {}
            for(let i = 1; i <= editCategory.length; i++) {
                // methods.setValue(innerAlias+i, editCategory[i-1])
                categoriesField[innerAlias+i] = editCategory[i-1]
            }
            // формирование объекта для формы
            // delete commonFields.description
            const editObject = {
                ...categoriesField ,
                ...currentAdditionalFields,
                ...commonFields,
                location:  commonFields.address,
                coordinates: JSON.parse(commonFields.coordinates)
            }
            editObject.photoes = 'ok'
            for(const [key, value] of Object.entries(editObject)) {
                methods.setValue(key, value)
            }
            // methods.reset(editObject)
        }
    }, [editCategory, changePage,])


    // useEffect(() => {
    //     console.log('useEffect 2 is work')
    //     if(editCategory) {
    //         console.log('useEffect 2.2 is work')
    //         methods.reset({...defaultValue, ...commonFields})
    //     }
    // }, [defaultValue, commonFields, editCategory, changePage, productInfo.id])

    // Получаем выбранную категорию
    useEffect(() => {
        const getValue = methods.getValues
        const aliasValue = (aliasNum) => getValue('alias' + aliasNum);

        const alias2 = aliasValue(2)
        const alias3 = aliasValue(3)
        const alias4 = aliasValue(4)

        if (alias4) {
            setCategory(alias4.toLowerCase())
        } else if (alias3) {
            setCategory(alias3.toLowerCase())
        } else if (alias2) {
            setCategory(alias2.toLowerCase())
        } else {
            setCategory(undefined)
        }

    }, [methods?.watch('alias4'), methods?.watch('alias3'), methods?.watch('alias2')]);


    // функция отправляющая запросы по двум сценариям (1. страница подачи. 2. страница редактирования)
    const sendObjectFunction = async (sendObj, photoData, totalFilesArray, data, additionalfields, isChangePage = false) => {
        // условие выполнится если мы на странице редактирования
        if(isChangePage) {
            // массив куда запишутся объекты обработанных файлов, после ответа с сервиса
            let fileResponse = []
            if(totalFilesArray.length) {
                fileResponse = await axios.post(
                    `${STATIC_URL}/post/${id}/${productId}`,
                    photoData,
                    {
                        headers: {
                                    "Content-Type": "multipart/form-data",
                                    "x-access-token": token
                        }
                    }
                );
            }

            // ниже цикл для правильного порядка фотографий.
            const oldPhotos = []
            // достаем массив старых фоток
            photoes.forEach(it=> it?.old ? oldPhotos?.push(it.src) : null)

            let oldPhotosIndex = 0
            let newPhotosIndex = 0
            // тут будет финальый массив фоток, который запишется в объект для отправки на бэк
            const newPhotoArr = []

            for(const photo of photoes) {
                if (photo.old) {
                    newPhotoArr.push(oldPhotos[oldPhotosIndex])
                    oldPhotosIndex += 1
                    continue
                }

                if (photo.type) {
                    newPhotoArr.push(fileResponse.data.images.photos[newPhotosIndex])
                    newPhotosIndex += 1
                    continue
                }
            }


            const newDate = new Date()
            // удаление лишних полей
            sendObj.address = sendObj.location
            delete sendObj.additional_fields
            delete sendObj.alias
            delete sendObj.bymessages
            delete sendObj.byphone
            // delete sendObj.city
            delete sendObj.contact
            // delete sendObj.coordinates
            delete sendObj.location
            delete sendObj.subcategory
            delete sendObj.trade
            await getTokenDataByPost(
                `${BASE_URL}/api/postUpdate`,
                {
                    ...sendObj,
                    photo: [...newPhotoArr],
                    post_id: productId
                },
                token
            )


            setProduct({
                title: sendObj.title,
                location: sendObj.address, // locaion удалили выше, ставим адрес
                price: sendObj.price,
                id: productId,
                photo: `${STATIC_URL}/${newPhotoArr[0]}`,
                date: ToRusDate(newDate)
            })
            setPromotion(true)
            return
        }

        // запрос выполнится если мы находимся на странице подачи
        getTokenDataByPost(`${BASE_URL}/api/setPosts`, sendObj, token)
            .then(r => {

                const postId = r?.id;
                additionalfields[category].unshift({ "alias": 'post_id', "fields": postId })

                axios.post(`${STATIC_URL}/post/${id}/${r?.id}`, photoData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "x-access-token": token
                    }
                }).then((r) => {

                    const productObj = {
                        title: data.title,
                        location: data.location,
                        price: data.price,
                        id: postId,
                        photo: `${STATIC_URL}${dynamicPhotosArr(r?.data?.images, postId, 's')[0]}`
                    }

                    console.log(productObj);

                    setProduct(productObj)
                    setPromotion(true)
                })
            })

    }

    // methods, category, currentCategory
    const onSubmit = (data) => {
        data.price = data.price.replace(/\D+/g, '');

        const alias = [data?.alias1, data?.alias2];
        if (data?.alias3) {
            alias.push(data.alias3);
        }
        if (data?.alias4) {
            alias.push(data.alias4);
        }

        // Автоматическая генерация заголовка, если указан в new_catalog.json
        data.title = generateTitle(data.title, currentCategory, methods.getValues)
        // Генерирование поискового назвния для выдочи по городам
        data.city = generateSearchName(data.location)

        // ПРИННУДИТЕЛЬНЫЙ ВЫХОД
        if (!data.city) {
            // console.log(methods)
            methods.setError('location', 'Введите корректный адрес')
            return
        }
        // Координаты для карты на странице объявления
		data.coordinates = data.location?.data ? JSON.stringify([data.location.data.geo_lat, data.location.data.geo_lon]) : JSON.stringify([...userInfo?.location?.geo])

        // Имя адресса
		data.location = data.location?.value ? data.location.value : data.location

        // Целый алиас
        data.alias = alias.join(',');

        data.user_id = id

        delete data.alias1
        delete data.alias2
        delete data.alias3
        delete data.alias4
        delete data.photoes

        const photoData = new FormData;
        // достаем из общего массива с фотками, только файловые объекты (новые фотографии которых ранее не было)
        const onlyFilesArray = photoes?.filter(it => it?.type?.includes("image/webp"))
        if (onlyFilesArray.length > 1) {
            onlyFilesArray.forEach(photo => photoData.append('files[]', photo));
        } else if (onlyFilesArray.length === 1) {
            photoData.append('files[]', onlyFilesArray[0]);
        }
        // старый вариант формирования формы для файлов
        // if (photoes.length > 1) {
        //     photoes.forEach(photo => photoData.append('files[]', photo));
        // } else if (photoes.length === 1) {
        //     photoData.append('files[]', photoes[0]);
        // }

        let obj = {}
        let additionalfields = { [category]: [] }

        for (let key in data) {
            if (key === 'title' || key === 'alias' || key === 'bymessages' || key === 'byphone' || key === 'contact' || key === 'description' || key === 'location' || key === 'price' || key === 'trade' || key === 'user_id' || key === 'coordinates' || key === 'city') {
                obj[key] = data[key];
            }
        }


        // if (subcategoryData[category] !== undefined) {
        //     obj.subcategory = category
        // }

        setLoading(true);

        // Объект который отправим на бэк
        const sendObj = {
            //  Дефолтные параметры,
            ...obj,
            // Дополнительные поля
            additional_fields: generateAdditionalFields(data),
            // Подкатегория
            subcategory: obj.alias.split(',').reverse()[0]
        }

        sendObjectFunction(sendObj, photoData, onlyFilesArray, data, additionalfields, changePage)
        // getTokenDataByPost(`${BASE_URL}/api/setPosts`, sendObj, token)
        //     .then(r => {

        //         const postId = r?.id;
        //         additionalfields[category].unshift({ "alias": 'post_id', "fields": postId })

        //         axios.post(`${STATIC_URL}/post/${id}/${r?.id}`, photoData, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //                 "x-access-token": token
        //             }
        //         }).then((r) => {

        //             const productObj = {
        //                 title: data.title,
        //                 location: data.location,
        //                 price: data.price,
        //                 id: postId,
        //                 photo: `${STATIC_URL}/${r?.data.images.photos[0]}`
        //             }

        //             setProduct(productObj)
        //             setPromotion(true)
        //         })
        //     })
    }


    return (
        promotion ? <Promotion product={product} editProduct={changePage}  /> :
            <MetaLayout title={'Подать объявление'}>
                <FormProvider {...methods} >
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        {!matchesMobile && !matchesTablet && (
                            <NewPlaceOfferContent
                                photoesCtx={photoesCtx}
                                title={title}
                                category={category}
                                currentCategory={currentCategory}
                                photoesLink={commonFields?.editPhotos}
                            />
                        )}
                        {matchesMobile || matchesTablet ? (
                            <PlaceOfferMobile>
                                <NewPlaceOfferContent
                                    onSubmit={onSubmit}
                                    photoesCtx={photoesCtx}
                                    title={title}
                                    category={category}
                                    currentCategory={currentCategory}
                                    photoesLink={commonFields?.editPhotos}
                                />
                            </PlaceOfferMobile>
                        ) : null}
                    </form>
                </FormProvider>
                <Backdrop className={classes.backdrop} open={loading}>
                    <Loader size={64} />
                </Backdrop>
            </MetaLayout>
    )

}

export default PlaceOffer;
