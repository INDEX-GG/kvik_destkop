import { useState } from 'react';
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
import {generateAdditionalFields, generateSearchName, generateTitle} from "../lib/services";
import NewPlaceOfferContent from "#components/placeOffer/newPlaceOffer/NewPlaceOfferContent";

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

function PlaceOffer() {

    const classes = useStyles();
    const { matchesMobile, matchesTablet } = useMedia();


    const { id, token } = useAuth();
    const {userInfo} = useStore()


    const [loading, setLoading] = useState(false);
    const [promotion, setPromotion] = useState(false);
    const [product, setProduct] = useState({});


    let photoes = [];


    const photoesCtx = (obj) => {
        return photoes = obj;
    }


    const onSubmit = (data, methods, category, currentCategory) => {
        data.price = data.price.replace(/\D+/g, '');

        const alias = [data?.alias1, data?.alias2];
        if (data?.alias3) {
            alias.push(data.alias3);
        }
        if (data?.alias4) {
            alias.push(data.alias4);
        }


        data.title = generateTitle(data.title, currentCategory, methods.getValue)
        data.city = generateSearchName(data.location)

        // ПРИННУДИТЕЛЬНЫЙ ВЫХОД
        if (!data.city) {
            console.log(methods)
            methods.setError('location', 'Введите корректный адрес')
            return
        }

		data.coordinates = data.location?.data ? JSON.stringify([data.location.data.geo_lat, data.location.data.geo_lon]) : JSON.stringify([...userInfo?.location?.geo])
		data.location = data.location?.value ? data.location.value : data.location
        data.alias = alias.join(',');
        data.user_id = id

        delete data.alias1
        delete data.alias2
        delete data.alias3
        delete data.alias4
        delete data.photoes

        const photoData = new FormData;
        if (photoes.length > 1) {
            photoes.forEach(photo => photoData.append('files[]', photo));
        } else if (photoes.length === 1) {
            photoData.append('files[]', photoes[0]);
        }

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


        const sendObj = {
            ...obj,
            additional_fields: generateAdditionalFields(data),
            subcategory: obj.alias.split(',').reverse()[0]
        }

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
                        photo: `${STATIC_URL}/${r?.data.images.photos[0]}`
                    }

                    setProduct(productObj)
                    setPromotion(true)
                })
            })

    }


    return (
        promotion ? <Promotion product={product} /> :
            <MetaLayout title={'Подать объявление'}>
                {!matchesMobile && !matchesTablet && (
                    // <Container className={classes.root}>
                    //     <Box className={classes.offersBox}>
                    //         <Typography className={classes.title} variant='h3'>Новое объявление</Typography>
                    //         <FormProvider {...methods} >
                    //             <Verify showTitle={showTitle}/>
                    //             <form onSubmit={methods.handleSubmit(onSubmit)}>
                    //                 <Box className={classes.formPart}>
                    //                     <Category category={mainCategory}/>
                    //                     {currentCategory?.title ? null : <Title title='' />}
                    //                 </Box>
                    //                 {/* Проверка на доп. поле*/}
                    //                 {!!currentCategory?.additional_fields.length && (
                    //                     <Box className={classes.formPart}>
                    //                         <AdditionalInformation currentCategory={currentCategory} />
                    //                     </Box>
                    //                 )}
                    //                 <Box className={classes.formPart}>
                    //                     <Description />
                    //                     {category !== 'vacancies' && category !== 'summary' ?
                    //                         <Price price=''/>
                    //                         :
                    //                         null
                    //                     }
                    //                     <Photoes ctx={photoesCtx} />
                    //                 </Box>
                    //                 <Box className={classes.formPart}>
                    //                     <Location />
                    //                     <Contacts />
                    //                     <Box className={classes.submit}>
                    //                         <ErrorMessages validate={subcategoryData[category]} type={category}/>
                    //                         <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                    //                     </Box>
                    //                 </Box>
                    //             </form>
                    //         </FormProvider>
                    //     </Box>
                    // </Container>
                    <NewPlaceOfferContent
                        functionObj={{
                            onSubmit,
                            photoesCtx
                        }}
                    />
                )}
                {matchesMobile || matchesTablet ? (
                    <PlaceOfferMobile>

                    </PlaceOfferMobile>
                ) : null}

                <Backdrop className={classes.backdrop} open={loading}>
                    <Loader size={64} />
                </Backdrop>
            </MetaLayout>
    )

}

export default PlaceOffer;
