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
		// alignItems: 'center',
		minHeight: '100vh',
	}

}));

function EditPage() {
	const { query } = useRouter();
	const { price, title, photo, description, address, editPhotos} = useProduct(query.id)

	console.log('photo in offer',photo)
	// console.log('', photo.map(item => item.replace('http://192.168.8.111:6001/', '')))

	console.log('editPhotos',editPhotos)

	const { id } = useAuth();
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
		console.log('DATAAAAAAAAA+++>>>>>',data)
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

		photoes[photoes.length -1].lastModified !== undefined ?
		 axios.post(`${STATIC_URL}/post/${postId}`, photoData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
		.then((r) => {
			let allConvertedPhoto = [...photoes]
			let jj = 0
			// для увиличения j во внутреннем цикле
			for (let i = 0; i < allConvertedPhoto.length; i++) {
				if (allConvertedPhoto[i].lastModified && allConvertedPhoto[i].lastModified !== undefined) {
					for (let j = 0+jj; j < r.data.images.photos.length; j++) {
						allConvertedPhoto[i] = r.data.images.photos[j]
						jj = ++j;
						if(allConvertedPhoto[i] === allConvertedPhoto[i]) break;
					}
				} else {
					allConvertedPhoto[i] = allConvertedPhoto[i].src.replace('http://192.168.8.111:6001/', '')
				}
			}
			axios.post(`${BASE_URL}/api/postUpdate`, {post_id: postId,
				title : obj.title,
				description: obj.description,
				price: obj.price,
				address: obj.location,
				photo: allConvertedPhoto
			})
			setEditProduct({post_id: postId,
				title : obj.title,
				description: obj.description,
				price: obj.price,
				address: obj.location,
				photo: allConvertedPhoto
			})
			setPromotion(true)
		}) :
			axios.post(`${BASE_URL}/api/postUpdate`, {
				post_id: postId,
				title : obj.title,
				description: obj.description,
				price: obj.price,
				address: obj.location,
				photo: editPhotos
			})

			setEditProduct({post_id: postId,
				title : obj.title,
				description: obj.description,
				price: obj.price,
				address: obj.location,
				photo: photo[0]
			})
		setPromotion(true)
	}

	return (

		promotion ? <Promotion editProduct={editProduct} /> :
			<MetaLayout title={'Редактирование объявления'}>
				{!matchesMobile && !matchesTablet &&  <Container className={classes.root}>
					 < Box className={classes.offersBox}>
						<Typography className={classes.title} variant='h3'>Редактирование объявления</Typography>
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