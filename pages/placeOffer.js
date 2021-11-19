import { useState, useEffect } from 'react';
import { Backdrop, Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import Verify from '../components/placeOffer/Verify';
import MetaLayout from '../layout/MetaLayout';
import { useMedia } from '../hooks/useMedia';
import { useForm, FormProvider } from 'react-hook-form';
import Title from '../components/placeOffer/Title';
import Category from '../components/placeOffer/Category';
import Description from '../components/placeOffer/Description';
import Price from '../components/placeOffer/Price/Price';
import Photoes from '../components/placeOffer/Photoes';
import Location from '../components/placeOffer/Location';
import Contacts from '../components/placeOffer/Contacts';
import ErrorMessages from '../components/placeOffer/ErrorMessages';
import { useAuth } from '../lib/Context/AuthCTX';
import Loader from '../UI/icons/Loader';
import PlaceOfferMobile from '../components/placeOffer/placeOfferMobile';
import Promotion from '../components/placeOffer/Promotion';
import { useCategoryPlaceOffer } from '../hooks/useCategoryPlaceOffer';
import AdditionalInformation from '../components/placeOffer/AdditionalInformation';
import axios from 'axios';
import { BASE_URL, STATIC_URL, /** CACHE_URL */ } from '../lib/constants';
import {useStore} from "../lib/Context/Store";

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

    const { id } = useAuth();
    const {userInfo} = useStore()
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [promotion, setPromotion] = useState(false);
    const [product, setProduct] = useState({});
    const { matchesMobile, matchesTablet } = useMedia();
    const methods = useForm({defaultValues: {
        price: ''
    }});
    let photoes = [];
    let postId = 0;
    const photoesCtx = (obj) => {
        return photoes = obj;
    }



    // console.log(methods)

    /* получение дополнительных полей */


    const [category, setCategory] = useState();
    const [showTitle, setShowTitle] = useState(false);
    const { ...subcategoryData } = useCategoryPlaceOffer(category, methods);


    // console.log('ALIAS4', methods?.watch('alias4'))
    // console.log('ALIAS3', methods?.watch('alias3'))
    // console.log('ALIAS2', methods?.watch('alias2'))
    // console.log('ALIAS1', methods?.watch('alias1'))


    useEffect(() => {
        if (methods?.watch('alias4') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias4?._f.value !== '' : methods.control._fields.alias4?._f.value !== '')) {
            setCategory(methods?.watch('alias4').toLowerCase());
        } else if (methods?.watch('alias3') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias4?._f.name === undefined : methods.control._fields.alias4?._f.name === undefined)) {
            setCategory(methods?.watch('alias3').toLowerCase());
        } else if (methods?.watch('alias2') && (methods.control._fields === undefined ? methods.control.fieldsRef.current.alias3?._f.name === undefined : methods.control._fields.alias3?._f.name === undefined)) {
            setCategory(methods?.watch('alias2').toLowerCase());
        } else {
            setCategory(undefined);
        }

    }, [methods?.watch('alias4'), methods?.watch('alias3'), methods?.watch('alias2')]);

    useEffect(() => {
        setShowTitle(
            category === 'auto' || methods?.watch('alias1') === 'real_estate' ?  true : false)
    }, [category, methods?.watch('alias1')]);



    // console.log('category',category)

    const onSubmit = data => {


        data.price = data.price.replace(/\D+/g, '');
        const alias = [data?.alias1, data?.alias2];
        if (data?.alias3) {
            alias.push(data.alias3);
        }
        if (data?.alias4) {
            alias.push(data.alias4);
        }


        const landType = () => {
            if(data.alias4 === 'sell_snt'){
                return 'СНТ'
            } else if (data.alias4 === 'sell_izhs'){
                return 'ИЖС'
            } else if (data.alias4 === 'sell_agriculturalland'){
                return 'Земли сельскохозяйственного назначения'
            } else if (data.alias4 === 'sell_commercialland'){
                return 'Земли коммерческого назначения'
            }
        }

        if(data?.alias1 === 'transport' && data?.alias2 === 'auto'){
             data.title = `${data.modelsAuto} ${data.submodels},${data.year}`
        } else if(data?.alias1 === 'real_estate' && data?.alias2 === 'apartments_kv'){
             data.title = `${data.room_number}-к. квартира, ${data.area}м², ${data.storey}/${data.floor_home}эт.`
        } else if(data?.alias1 === 'real_estate' && data?.alias2 === 'rooms' ){
            data.title = `Комната, ${data.area}м², ${data.storey}/${data.floor_home}эт.`
        } else if(data?.alias1 === 'real_estate' && data?.alias2 === 'houses_and_cottages' ){
            data.title = `Дом, ${data.home_area}м², на участке ${data.land_area} сот.`
        } else if(data?.alias1 === 'real_estate' && data?.alias2 === 'land' ){
            data.title = `Участок, ${data.area} сот. (${landType()})`
        } else if(data?.alias1 === 'real_estate' && data?.alias2 === 'garages_and_parking_spaces_second' ){
            data.title = data.type_park !== undefined ? `${data.type_park}, ${data.area}м².` : `Гараж, ${data.area}м².`
        } else if(data?.alias1 === 'real_estate' && data?.alias2 === 'real_estate_abroad' ){
            data.title = `${data.type_of_abroad_property} (${data.country_of_abroad_property})`
        }



        // rooms 'real_estate', 'real_estate_abroad', type_of_abroad_property

		data.coordinates = data.location?.data ? JSON.stringify([data.location.data.geo_lat, data.location.data.geo_lon]) : JSON.stringify([...userInfo?.location?.geo])
		data.location = data.location?.value ? data.location.value : data.location

        // console.log(data.coordinates)

        // console.log("data", data);
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

		// console.log(photoData.getAll('files[]'))

		// console.log(photoData, 'photo');


        let obj = {}
        let additionalfields = { [category]: [] }


        for (let key in data) {

            if (key === 'title' || key === 'alias' || key === 'bymessages' || key === 'byphone' || key === 'contact' || key === 'description' || key === 'location' || key === 'price' || key === 'trade' || key === 'user_id' || key === 'coordinates') {
                obj[key] = data[key];
            }
            else {
                // /* console.log('key', key.replace(/[0-9]/g, '')) */
                // additionalfields2[asd].push({ "alias": key, "fields": data[key] === '' ? '' : key === 'mileage' || key === 'tires_and_rims' || key === 'owners_of_pts' || key === 'color' ? +data[key] : data[key] })

                // additionalfields[asd].push({ "alias": key, "fields": data[key] === '' ? '' : key === 'mileage' || key === 'tires_and_rims' || key === 'owners_of_pts' || key === 'color' ? +data[key] : data[key] })
                
                const key1 = key.replace(/[0-9]/g, '')
                const el = additionalfields[category].find(el => el.alias === key1)
                if (el){
                    const index = additionalfields[category].indexOf(el)
                    if (!Array.isArray(additionalfields[category][index].fields)){
                        additionalfields[category][index].fields = [additionalfields[category][index].fields]
                    }
                    if(data[key]){
                        additionalfields[category][index].fields.push(data[key])
                    }
                }else{
                    let field = data[key]
                    if (key === 'mileage' || key === 'tires_and_rims' || key === 'owners_of_pts' || key === 'color' || key === 'power'){
                        if ( key === 'tires_and_rims'){
                            let str = data[key] ? data[key].slice(0, -2) : ''
                            field = str 
                        }else if (key === 'mileage' ){
                            let str = data[key].slice(0, -3)
                            field = str
                        }else if (key === 'power' ){
                            let str = data[key].replace(/[А-яа-я.\s]/gi, '')
                            field = str
                        }
                        else{
                            field = data[key]  
                        }
                    }
                    additionalfields[category].push({"alias": key1, "fields": field !== undefined ? field : [] })
                }
                

                // additionalfields3[asd].push({ "alias": key.replace(/[0-9]/g, '') })

            }
        }


        // console.log('add 3', additionalfields3[asd])


        // console.log("asdasdasd",newOBJ[asd]);
        if (subcategoryData[category] !== undefined) {
            obj.subcategory = category
        }
        // console.log("addfields", additionalfields)
        //
        //
        // console.log('obj',obj)
        setLoading(true);

        axios.post(`${BASE_URL}/api/setPosts`, obj)
            .then(r => {
				// console.log("DDDDDDDDDDDDDDDDDATA", obj, data)
                postId = r?.data?.id;



                additionalfields[category].unshift({ "alias": 'post_id', "fields": postId })
                // console.error('additionalfields',additionalfields)

                console.log(additionalfields);

                axios.post(`${BASE_URL}/api/subcategory`, additionalfields)
                  .then(r => console.log(r.data))
                  .catch(e => console.log(e))



                axios.post(`${STATIC_URL}/post/${r?.data?.id}`, photoData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((r) => {
					// console.log(`${STATIC_URL}/${r.data.images.photos[0]}`)
                    setProduct({ title: data.title, location: data.location, price: data.price, id: postId, photo: `${STATIC_URL}/${r?.data.images.photos[0]}` })
                    setPromotion(true)
                })
				// axios.post(`${CACHE_URL}/cache/${postId}`, {data: {...mapData}})
            })  

    }



    return (
        promotion ? <Promotion product={product} /> :
            <MetaLayout title={'Подать объявление'}>
                {!matchesMobile && !matchesTablet && <Container className={classes.root}>
                    <Box className={classes.offersBox}>
                        <Typography className={classes.title} variant='h3'>Новое объявление</Typography>
                        <FormProvider {...methods} >
                            <Verify showTitle={showTitle}/>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Box className={classes.formPart}>
                                    <Category/>
                                    {showTitle ? null : <Title title='' />}
                                </Box>
                                {subcategoryData[category] !== undefined ?
                                    <Box className={classes.formPart}>
                                        <AdditionalInformation newOBJ={subcategoryData} asd={category?.toLowerCase()} />
                                    </Box>
                                    : ''}
                                <Box className={classes.formPart}>
                                    <Description />
                                    {category !== 'vacancies' && category !== 'summary' ? 
                                        <Price price=''/>
                                        :
                                        null
                                    }
                                    <Photoes ctx={photoesCtx} />
                                </Box>
                                <Box className={classes.formPart}>
                                    <Location />
                                    <Contacts />
                                    <Box className={classes.submit}>
                                        <ErrorMessages validate={subcategoryData[category]} type={category}/>
                                        <Button type='submit' color='primary' variant='contained'>Продолжить</Button>
                                    </Box>
                                </Box>
                            </form>
                        </FormProvider>
                    </Box>
                </Container>}
                {matchesMobile || matchesTablet ? <PlaceOfferMobile /> : null}

                <Backdrop className={classes.backdrop} open={loading}>
                    <Loader size={64} />
                </Backdrop>
            </MetaLayout>
    )

}

export default PlaceOffer;
