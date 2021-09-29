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
import {  STATIC_URL } from '../../lib/constants';
import PhotosForEditPage from "../../components/placeOffer/PhotosForEditPage";


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

	// запрос содержимого полей для редактирования
	const { price, title, photo, description, address, productInfoFields } = useProduct(query.id)


	const { id } = useAuth();
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [promotion, setPromotion] = useState(false);
	const [product, setProduct] = useState({});
	const [obj, setObj] = useState({});
	const [allPhotos, setAllPhotos] = useState([]);
	const [convertPhoto, setConvertPhoto] = useState([]);
	// const [editProduct, setEditProduct] = useState({});
	const { matchesMobile, matchesTablet } = useMedia();
	const [edit, setEdit] = useState(false)


	const methods = useForm();
	let photoes = [];
	let postId = productInfoFields.post_id;
	const photoesCtx = (obj) => {
		return photoes = obj;
	}

	useEffect(() => {
	setEdit(true)
	}, []);


	const onSubmit = data => {
		 console.log('DATATAAAAAAA',data)
		data.price = data.price.replace(/\D+/g, '');


		data.user_id = id
		delete data.photoes
		const photoData = new FormData;
		if (photoes.length > 1) {
			photoes.forEach(photo => photoData.append('files[]', photo));
		} else if (photoes.length === 1) {
			photoData.append('files[]', photoes[0]);
		}


		for (let key in data) {
			if (key === 'title'  || key === 'bymessages' || key === 'byphone' || key === 'contact' || key === 'description' || key === 'location' || key === 'price' || key === 'trade' || key === 'user_id') {
				setObj(obj[key] = data[key]);
			}
		}
		setLoading(true);


			// отправка фаилов для получения ссылок
			axios.post(`${STATIC_URL}/post/${postId}`, photoData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			.then((r) => {
				setConvertPhoto(r.data.images.photos)
				setPromotion(true)
			})

	}



	useEffect(() => {
		let ph = [...photoes]

		const allUpdatePhotosCollector = () => {
			for (let i = 0; i < ph.length; i++) {

				// eslint-disable-next-line no-prototype-builtins
				if (ph[i].lastModified && ph[i].lastModified !== undefined) {
					for (let j = 0; j < convertPhoto.length; j++) {
						ph[i] = convertPhoto[j];

					}
				} else {
					ph[i] = ph[i].src
				}
			}


		};
		console.log('кукусик сработал', obj)
		setAllPhotos(allUpdatePhotosCollector())
		setProduct({post_id: postId,
			title : obj.title,
			description: obj.description,
			price: obj.price,
			address: obj.location,
			photo: allPhotos
		})
	}, [convertPhoto]);


	useEffect(() => {
		// axios.post(`${STATIC_URL}/api/postUpdate`, product)
		// console.log('convertPhoto=====>',convertPhoto)
		// console.log('editProduct=====>',editProduct)
		// console.log('allPhotos=down=USE====>',allPhotos)
		// setProduct({ title: data.title, price: data.price, id: postId, photo: `${STATIC_URL}/${r?.data.images.photos[0]}` })
	}, [product]);




	// POST    /api/postUpdate
	//
	// {"post_id": 613,
	// 	"title" :"newtitle",
	// 	"description": "newdescr",
	// 	"price": 22.22,  "address": "newad",
	// 	"photo": ["images/po/d4/3a/06/44/b19d47d81fb2299f7004b3a987f7c20210928132107782171.webp", "images/po/d4/3a/06/44/b19d47d81fb2299f7004b3a987f7c20210928132107782172.webp"]
	// }
	return (

		promotion ? <Promotion product={product} /> :
			<MetaLayout title={'Редактирование объявления'}>
				{!matchesMobile && !matchesTablet && <Container className={classes.root}>
					{price && title && photo && description && address && < Box className={classes.offersBox}>
						<Typography className={classes.title} variant='h3'>Редактирование объявления</Typography>
						<FormProvider {...methods} >
							<Verify edit={edit}/>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<Box className={classes.formPart}>
									<Title title={title} />
								</Box>
								<Box className={classes.formPart}>
									<Description description={description} />
									<Price price={price} />
									<PhotosForEditPage ctx={photoesCtx} photo={photo} />
								</Box>
								<Box className={classes.formPart}>
									<Location address={address}/>
									<Contacts />
									<Box className={classes.submit}>
										<ErrorMessages />
										<Button type='submit' color='primary' variant='contained'>Продолжить</Button>
									</Box>
								</Box>
							</form>
						</FormProvider>
					</Box>}
				</Container>}
				{matchesMobile || matchesTablet ? <PlaceOfferMobile /> : null}
				<Backdrop className={classes.backdrop} open={loading}>
					<Loader size={64} />
				</Backdrop>
			</MetaLayout >
	)
}

export default EditPage;