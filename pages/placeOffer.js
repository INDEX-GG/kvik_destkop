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


    const [asd, setAsd] = useState();
    const { ...newOBJ } = useCategoryPlaceOffer(asd, methods);
    useEffect(() => {



        if (methods?.watch('alias4') && (methods.control._fields == undefined ? methods.control.fieldsRef.current.alias4?._f.value !== '' : methods.control._fields.alias4?._f.value !== '')) {
            setAsd(methods?.watch('alias4').toLowerCase());
        } else if (methods?.watch('alias3') && (methods.control._fields == undefined ? methods.control.fieldsRef.current.alias4?._f.name === undefined : methods.control._fields.alias4?._f.name === undefined)) {
            setAsd(methods?.watch('alias3').toLowerCase());
        } else if (methods?.watch('alias2') && (methods.control._fields == undefined ? methods.control.fieldsRef.current.alias3?._f.name === undefined : methods.control._fields.alias3?._f.name === undefined)) {
            setAsd(methods?.watch('alias2').toLowerCase());
        } else {
            setAsd(undefined);
        }

        
        /*  if (methods?.watch('alias4') && methods.control.fieldsRef.current.alias4?._f.value !== '') {
             setAsd(methods?.watch('alias4'));
         } else if (methods?.watch('alias3') && methods.control.fieldsRef.current.alias4?._f.name === undefined) {
             setAsd(methods?.watch('alias3'));
         } else if (methods?.watch('alias2') && methods.control.fieldsRef.current.alias3?._f.name === undefined) {
             setAsd(methods?.watch('alias2'));
         } else {
             setAsd(undefined);
         } */
    }, [methods?.watch('alias4'), methods?.watch('alias3'), methods?.watch('alias2')]);


    const onSubmit = data => {
        console.log('DATAAAAAAA',data)
        console.log(photoes, photoes.length)
        data.price = data.price.replace(/\D+/g, '');
        const alias = [data?.alias1, data?.alias2];
        if (data?.alias3) {
            alias.push(data.alias3);
        }
        if (data?.alias4) {
            alias.push(data.alias4);
        }

		data.coordinates = data.location?.data ? JSON.stringify([data.location.data.geo_lat, data.location.data.geo_lon]) : JSON.stringify([])
		console.log(data.coordinates)
		data.location = data.location?.value ? data.location.value : data.location

        console.log('alias',alias);
        console.log("data", data);
        data.alias = alias.join(',');
        data.user_id = id
        delete data.alias1
        delete data.alias2
        delete data.alias3
        delete data.alias4
        delete data.photoes
        const photoData = new FormData;
        console.log('photoes', photoes)
        if (photoes.length > 1) {
            photoes.forEach(photo => photoData.append('files[]', photo));
        } else if (photoes.length === 1) {
            photoData.append('files[]', photoes[0]);
        }

        let obj = {}
        let additionalfields = { [asd]: [] }
        // let additionalfields2 = { [asd]: [] }

        // let additionalfields3 = { [asd]: [] }

        for (let key in data) {

            if (key === 'title' || key === 'alias' || key === 'bymessages' || key === 'byphone' || key === 'contact' || key === 'description' || key === 'location' || key === 'price' || key === 'trade' || key === 'user_id' || key == 'coordinates') {
                obj[key] = data[key];
            }
            else {
                /* console.log('key', key.replace(/[0-9]/g, '')) */
                // additionalfields2[asd].push({ "alias": key, "fields": data[key] === '' ? '' : key === 'mileage' || key === 'tires_and_rims' || key === 'owners_of_pts' || key === 'color' ? +data[key] : data[key] })

                // additionalfields[asd].push({ "alias": key, "fields": data[key] === '' ? '' : key === 'mileage' || key === 'tires_and_rims' || key === 'owners_of_pts' || key === 'color' ? +data[key] : data[key] })
                
                const key1 = key.replace(/[0-9]/g, '')
                const el = additionalfields[asd].find(el => el.alias === key1)
                if (el){
                    const index = additionalfields[asd].indexOf(el)
                    if (!Array.isArray(additionalfields[asd][index].fields)){
                        additionalfields[asd][index].fields = [additionalfields[asd][index].fields]
                    }
                    if(data[key]){
                        additionalfields[asd][index].fields.push(data[key])
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
                    additionalfields[asd].push({"alias": key1, "fields": field !== undefined ? field : [] })
                }
                

                // additionalfields3[asd].push({ "alias": key.replace(/[0-9]/g, '') })

            }
        }


        // console.log('add 3', additionalfields3[asd])


        // console.log("asdasdasd",newOBJ[asd]);
        if (newOBJ[asd] !== undefined) {
            obj.subcategory = asd
        }
        console.log("addfields", additionalfields)
        // console.log(additionalfields2)

        console.log('obj',obj)
        setLoading(true);

        axios.post(`${BASE_URL}/api/setPosts`, obj)
            .then(r => {
				console.log("DDDDDDDDDDDDDDDDDATA", obj, data)
                postId = r?.data?.id;
                console.log('postId',postId)
                additionalfields[asd].unshift({ "alias": 'post_id', "fields": postId })
                console.error('additionalfields',additionalfields)
                axios.post(`${BASE_URL}/api/subcategory`, additionalfields)
                console.log('r',r)
                axios.post(`${STATIC_URL}/post/${r?.data?.id}`, photoData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((r) => {
                    // console.log(r)
                    setProduct({ title: data.title, price: data.price, id: postId, photo: `${STATIC_URL}/${r?.data.images.photos[0]}` })
                    console.log(r?.data.images.photos[0])
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
                            <Verify />
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Box className={classes.formPart}>
                                    <Title />
                                    <Category />
                                </Box>
                                {newOBJ[asd] !== undefined ?
                                    <Box className={classes.formPart}>
                                        <AdditionalInformation newOBJ={newOBJ} asd={asd?.toLowerCase()} />
                                    </Box>
                                    : ''}
                                <Box className={classes.formPart}>
                                    <Description />
                                    {asd !== 'vacancies' && asd !== 'summary' ? 
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
                                        <ErrorMessages validate={newOBJ[asd]} type={asd}/>
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
