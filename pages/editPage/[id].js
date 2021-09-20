import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Backdrop, Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import Verify from '../../components/placeOffer/Verify';
import MetaLayout from '../../layout/MetaLayout';
import { useMedia } from '../../hooks/useMedia';
import { useForm, FormProvider } from 'react-hook-form';
import { useProduct } from "../../hooks/useProduct";
import Title from '../../components/placeOffer/Title';
// import Category from '../components/placeOffer/Category';
import Description from '../../components/placeOffer/Description';
import Price from '../../components/placeOffer/Price/Price';
import Photoes from '../../components/placeOffer/Photoes';
import Location from '../../components/placeOffer/Location';
import Contacts from '../../components/placeOffer/Contacts';
import ErrorMessages from '../../components/placeOffer/ErrorMessages';
import { useAuth } from '../../lib/Context/AuthCTX';
import Loader from '../../UI/icons/Loader';
import PlaceOfferMobile from '../../components/placeOffer/placeOfferMobile';
import Promotion from '../../components/placeOffer/Promotion';
import { useCategoryPlaceOffer } from '../../hooks/useCategoryPlaceOffer';
import AdditionalInformation from '../../components/placeOffer/AdditionalInformation';
import axios from 'axios';
import { BASE_URL, STATIC_URL } from '../../lib/constants';
// import { DelActiveCTX } from "../../lib/Context/DialogCTX"
// import { useOfferAccount } from "../../lib/Context/OfferAccountCTX";

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

function EditPage() {
	const { query } = useRouter();
	// const { productInfoFields, name, raiting, address, userPhoto, category_id, user_id, created_at, delivery, description, photo, reviewed, secure_transaction, title, trade, price, oldprice } = useProduct(query.id);
	const {price, title, photo, description} = useProduct(query.id)
	console.log("🚀 ~ file: [id].js ~ line 65 ~ EditPage ~ price", price)
	console.log("🚀 ~ file: [id].js ~ line 65 ~ EditPage ~ title", title)
	console.log("🚀 ~ file: [id].js ~ line 65 ~ EditPage ~ photo", photo)
	console.log("🚀 ~ file: [id].js ~ line 65 ~ EditPage ~ description", description)

	const { id } = useAuth();
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [promotion, setPromotion] = useState(false);
	const [product, setProduct] = useState({});
	const { matchesMobile, matchesTablet } = useMedia();
	// const [offerValues, setofferValues] = useState({});
	// const { userAccountProvider } = useOfferAccount()
	// const [archiveOffersBox, setArchiveOffersBox] = useState([]);

	const methods = useForm();
	let photoes = [];
	let postId = 0;
	const photoesCtx = (obj) => {
		return photoes = obj;
	}
	// console.log(methods)
	/* получение дополнительных полей */
	const [asd, setAsd] = useState();
	const { ...newOBJ } = useCategoryPlaceOffer(asd);
	useEffect(() => {
		if (methods?.watch('alias4') && (methods.control._fields == undefined ? methods.control.fieldsRef.current.alias4?._f.value !== '' : methods.control._fields.alias4?._f.value !== '')) {
			setAsd(methods?.watch('alias4'));
		} else if (methods?.watch('alias3') && (methods.control._fields == undefined ? methods.control.fieldsRef.current.alias4?._f.name === undefined : methods.control._fields.alias4?._f.name === undefined)) {
			setAsd(methods?.watch('alias3'));
		} else if (methods?.watch('alias2') && (methods.control._fields == undefined ? methods.control.fieldsRef.current.alias3?._f.name === undefined : methods.control._fields.alias3?._f.name === undefined)) {
			setAsd(methods?.watch('alias2'));
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
		console.log(data)
		console.log(photoes, photoes.length)
		data.price = data.price.replace(/\D+/g, '');
		const alias = [data?.alias1, data?.alias2];
		if (data?.alias3) {
			alias.push(data.alias3);
		}
		if (data?.alias4) {
			alias.push(data.alias4);
		}

		console.log(alias);
		console.log(data);
		data.alias = alias.join(',');
		data.user_id = id
		delete data.alias1
		delete data.alias2
		delete data.alias3
		delete data.alias4
		delete data.photoes
		const photoData = new FormData;
		console.log(photoes)
		if (photoes.length > 1) {
			photoes.forEach(photo => photoData.append('files[]', photo));
		} else if (photoes.length === 1) {
			photoData.append('files[]', photoes[0]);
		}

		let obj = {}
		let additionalfields = { [asd]: [] }
		let additionalfields2 = { [asd]: [] }

		let additionalfields3 = { [asd]: [] }

		for (var key in data) {
			if (key === 'title' || key === 'alias' || key === 'bymessages' || key === 'byphone' || key === 'contact' || key === 'description' || key === 'location' || key === 'price' || key === 'trade' || key === 'user_id') {
				obj[key] = data[key];
			}
			else {
				/* console.log('key', key.replace(/[0-9]/g, '')) */
				additionalfields2[asd].push({ "alias": key.replace(/[0-9]/g, ''), "fields": data[key] === '' ? '' : key === 'mileage' || key === 'tires_and_rims' || key === 'owners_of_pts' || key === 'color' ? +data[key].replace(/\D+/g, '') : data[key] })

				additionalfields[asd].push({ "alias": key, "fields": data[key] === '' ? '' : key === 'mileage' || key === 'tires_and_rims' || key === 'owners_of_pts' || key === 'color' ? +data[key].replace(/\D+/g, '') : data[key] })

				additionalfields3[asd].push({ "alias": key.replace(/[0-9]/g, '') })

			}
		}


		console.log(additionalfields3[asd])



		if (newOBJ[asd] !== undefined) {
			obj.subcategory = asd
		}
		console.log(additionalfields)
		console.log(additionalfields2)

		console.log(obj)
		setLoading(true);

		axios.post(`${BASE_URL}/api/setPosts`, obj)
			.then(r => {
				postId = r?.data?.id;
				additionalfields[asd].unshift({ "alias": 'post_id', "fields": postId })
				console.log(additionalfields)
				axios.post(`${BASE_URL}/api/subcategory`, additionalfields)

					.then(r => console.log(r))
				axios.post(`${STATIC_URL}/post/${r?.data?.id}`, photoData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then((r) => {
					console.log(r)
					setProduct({ title: data.title, price: data.price, id: postId, photo: `${STATIC_URL}/${r?.data.images.photos[0]}` })
					console.log(product)
					console.log(r?.data.images.photos[0])
					setPromotion(true)
				})
			})

	}


	// useEffect(() => {
	// 	if (userAccountProvider?.length > 0) {
	// 		// Активные объявления
	// 		setArchiveOffersBox(userAccountProvider?.filter((offer) => offer.verify_moderator.verify[0] === "1" && offer.active !== 0 && offer.active !== 4));

	// 	}
	// }, [])

	// console.log('archiveOffersBox', archiveOffersBox);





	return (

		promotion ? <Promotion product={product} /> :
			<MetaLayout title={'Редактирование объявления'}>
				{!matchesMobile && !matchesTablet && <Container className={classes.root}>
					<Box className={classes.offersBox}>
						<Typography className={classes.title} variant='h3'>Редактирование объявления</Typography>
						<FormProvider {...methods} >
							<Verify />
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<Box className={classes.formPart}>
									<Title title={title} />
								</Box>
								{newOBJ[asd?.toLowerCase()] !== undefined ?
									<Box className={classes.formPart}>
										<AdditionalInformation newOBJ={newOBJ} asd={asd?.toLowerCase()} />
									</Box>
									: ''}
								<Box className={classes.formPart}>
									<Description description={description} />
									<Price price={price} />
									<Photoes ctx={photoesCtx} photo={photo} />
								</Box>
								<Box className={classes.formPart}>
									<Location />
									<Contacts />
									<Box className={classes.submit}>
										<ErrorMessages />
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

export default EditPage;