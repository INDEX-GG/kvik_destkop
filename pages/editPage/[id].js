import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Backdrop, Box, Button, Container, makeStyles, Typography } from '@material-ui/core';
import Verify from '../../components/placeOffer/Verify';
import MetaLayout from '../../layout/MetaLayout';
import { useMedia } from '../../hooks/useMedia';
import { useForm, FormProvider } from 'react-hook-form';
import { useProduct } from "../../hooks/useProduct";
import Title from '../../components/placeOffer/Title';
import Description from '../../components/placeOffer/Description';
import Price from '../../components/placeOffer/Price/Price';
import Location from '../../components/placeOffer/Location';
import Contacts from '../../components/placeOffer/Contacts';
import ErrorMessages from '../../components/placeOffer/ErrorMessages';
import { useAuth } from '../../lib/Context/AuthCTX';
import Loader from '../../UI/icons/Loader';
import PlaceOfferMobile from '../../components/placeOffer/placeOfferMobile';
import Promotion from '../../components/placeOffer/Promotion';
import axios from 'axios';
import { BASE_URL, STATIC_URL } from '../../lib/constants';
import PhotosForEditPage from "../../components/placeOffer/PhotosForEditPage";
import {useProductEditPhoto} from "../../hooks/useProductEditPhoto";
import {getDataByPost} from "../../lib/fetch";

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
	loader: {
		display: 'flex',
		justifyContent: 'center',
		minHeight: '100vh',
	}

}));

function EditPage() {
	const { query } = useRouter();
	const { price, title, photo, description, address} = useProduct(query.id)
	const { editPhotos } = useProductEditPhoto(query.id)


	const { id, token } = useAuth();
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [promotion, setPromotion] = useState(false);
	const [editProduct, setEditProduct] = useState({});
	const { matchesMobile, matchesTablet } = useMedia();
	const [edit, setEdit] = useState(false)

	const methods = useForm();
	let photoes = [];
	let postId = Number(query.id);
	const photoesCtx = (obj) => {
		return photoes = obj;
	}


	// убирает Категорию из verify
	useEffect(() => {
	setEdit(true)
	}, []);

	// const additionalfields = {category_id: [{alias: 'post_id', fields: postId}]}

	const onSubmit = data => {
		// console.log('data',data)
		data.price = data.price.replace(/\D+/g, '');
		data.user_id = id
		delete data.photoes
		const photoData = new FormData;
		if (photoes.length > 1) {
			photoes.forEach(photo => photoData.append('files[]', photo));
		} else if (photoes.length === 1) {
			photoData.append('files[]', photoes[0]);
		}


		let obj = {}
		for (let key in data) {
			if (key === 'title'  || key === 'bymessages' || key === 'byphone' || key === 'contact' || key === 'description' || key === 'location' || key === 'price' || key === 'trade' || key === 'user_id') {
				obj[key] = data[key];
			}
		}


		setLoading(true);









		console.log('',editPhotos.photos)


		if(photoes.filter(item => item.lastModified !== undefined).length > 0) {
			axios.post(`${STATIC_URL}/post/${postId}`, photoData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})

				.then((r) => {
					// console.log('r.data',r.data)
					let jj = 0
					// для увиличения j во внутреннем цикле
					for (let i = 0; i < photoes.length; i++) {
						// console.log(`photoes[i]===> на шаге ${i} цикла`,photoes[i])
						if (photoes[i].lastModified && photoes[i].lastModified !== undefined) {
							for (let j = 0+jj; j < r.data.images.photos.length; j++) {
								// console.log('jj==>',jj)
								// console.log(`Малый цикл шаг ${j}`)
								// console.log(`Заменил фаил ${photoes[i]} на ссылку ${r.data.images.photos[j]}!`)
								photoes[i] = r.data.images.photos[j]
								// console.log(` ${photoes[i]} равен ? ${photoes[i]}`)
								jj = ++j;
								if(photoes[i] === photoes[i]) break;
							}

						} else {
							// console.log(`Удалил из  ${photoes[i]} http://192.168.8.111:6001/ ===inFor=== >`,)
							photoes[i] = `images${photoes[i].src.split('images')[1]}`
						}
					}
					// console.log('photoesVVVVVVVVVVVVVVVV',photoes)
					// // console.log('...r.data.images.photos',...r.data.images.photos)
					// // console.log('старые фотки после редактирования',photoes.filter(item => item.lastModified === undefined).map(item => item.src.replace('http://192.168.145.195:6001/','')))
					// // console.log('общий массив фоток после редактирования',[...photoes.filter(item => item.lastModified === undefined).map(item => item.src.replace('http://192.168.145.195:6001/','')), ...r.data.images.photos])


					// // console.log('$$$allConvertedPhoto$$$$',allConvertedPhoto)
					getDataByPost(`${BASE_URL}/api/postUpdate`, {
						user_id: id,
						post_id: postId,
						title : obj.title,
						description: obj.description,
						price: obj.price,
						address: obj.location.value,
						photo: photoes
					}, token)
					setEditProduct({post_id: postId,
						title : obj.title,
						description: obj.description,
						price: obj.price,
						address: obj.location.value,
						photo: photoes[0]
					})
					// // console.log('Добавлены новые фотки',)
					setPromotion(true)
				})
		} else {
			// console.log('photoes only photos', photoes.map(item => `images${item.src.split('images')[1]}`))
			const photoWithoutChanges = photoes.map(item => `images${item.src.split('images')[1]}`)
			getDataByPost(`${BASE_URL}/api/postUpdate`, {
				user_id: id,
				post_id: postId,
				title : obj.title,
				description: obj.description,
				price: obj.price,
				address: obj.location.value,
				photo: photoWithoutChanges
			}, token)
			setEditProduct({
				post_id: postId,
				title : obj.title,
				description: obj.description,
				price: obj.price,
				address: obj.location.value,
				photo: photoWithoutChanges[0]
			})
			setPromotion(true)
		}
	}

	return (

		promotion ? <Promotion editProduct={editProduct} /> :
			<MetaLayout title={'Редактирование объявления'}>
				{!matchesMobile && !matchesTablet &&  <Container className={classes.root}>
					 < Box className={classes.offersBox}>
						<Typography data-testid={'main-heading'} className={classes.title} variant='h3'>Редактирование объявления</Typography>
						<FormProvider {...methods} >
							<Verify edit={edit}/>
							{ price && title && photo && description && address !== undefined  ? <form onSubmit={methods.handleSubmit(onSubmit)}>
								<Box className={classes.formPart}>
									<Title title={title} />
								</Box>
								<Box className={classes.formPart}>
									<Description description={description} />
									<Price price={price} edit={edit}/>
									<PhotosForEditPage ctx={photoesCtx} photo={photo} />
								</Box>
								<Box className={classes.formPart}>
									<Location address={address}/>
									<Contacts />
									<Box className={classes.submit}>
										<ErrorMessages edit={edit}/>
										<Button type='submit' color='primary' variant='contained'>Продолжить</Button>
									</Box>
								</Box>
							</form>  : <Box className={classes.loader}><Loader size={50} /></Box> }
						</FormProvider>
					</Box>
				</Container>}
				{matchesMobile || matchesTablet ? <PlaceOfferMobile /> : null}
				<Backdrop className={classes.backdrop} open={loading}>
					<Loader  size={64} />
				</Backdrop>
			</MetaLayout >
	)
}

export default EditPage;