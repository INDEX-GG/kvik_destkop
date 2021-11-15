import { Box, TextField, makeStyles} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, {useEffect, useState} from 'react';
import { useMedia } from '../../hooks/useMedia';
import SearchBlock from './SearchBlock';
import SearchCheckbox from './SearchCheckbox';
import {useRouter} from "next/router";
import axios from 'axios';
import { PUBLIC_SEARCH } from '../../lib/constants'


const useStyles = makeStyles(() => ({
	input: {
		position: 'relative',
		flexGrow: 1,
		'& input': {
			padding: '7px 24px',
		}
    },
    icon: {
        position: 'absolute',
        right: '24px',
        height: '100%',
    },
		checkbox: {
			color: "#C7C7C7",
			alignItems: "flex-end",
			paddingRight: 5,
			paddingTop: 2,
			'&>span': {
				fontSize: "12px",
			}
		},
		checkboxes: {
			display: "flex",
			position: 'absolute',
			justifyContent: "space-between",
			width: '100%',
			top: '100%',
			paddingLeft: 12,
			fontSize: "12px",
			background: "#FFFFFF",
			zIndex: 10
		}
}));

const Search = ({text = false}) => {
	const classes = useStyles();

	const [showButtons, setShowButtons] = useState(false)
	const [onlyPhoto, setOnlyPhoto] = useState(false)
	const [safetyOffer, setSafetyOffer] = useState(false)
	const [saveResult, setSaveResult] = useState(false)
	const [searchValue, setSearchValue] = useState();
	const [hovered, setHovered] = useState(false)

	const [suggestData, setSuggestData] = useState([]);
	const [suggestNumber, setSuggestNumber] = useState(0);
	const [suggestItem, setSuggestItem] = useState({});

	const {matchesTablet, matchesMobile} = useMedia()
	const mobile = matchesTablet || matchesMobile


	const router = useRouter()

	useEffect(() => {
		const handleRouteChange = () => {
			setSearchValue('')
		}
		router.events.on('routeChangeStart', handleRouteChange)
		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	}, [])

	useEffect(() => {
		if (suggestData) setSuggestNumber(0);
	}, [suggestData])

	useEffect(() => {
		setSuggestItem(suggestData[suggestNumber - 1])
		if (suggestData[suggestNumber - 1]?.text) {
			if (hovered) return;
			setSearchValue(suggestData[suggestNumber - 1].text)
		}
	}, [suggestNumber])

	

	const handleChange = (e) => {
		setSearchValue(e.target.value)
		axios.post(`${PUBLIC_SEARCH}/search`, {'text': e.target.value})
		  .then(r => setSuggestData(r.data.data));
	}
	

	const handleBlur = (event) => {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setTimeout(function() {
				setShowButtons(false);
			}.bind(this), 200)
		}
	}

	const generateSuggest = (step, lastItem, start) => {


		if (suggestNumber <= 0) {
			setSuggestNumber(start)
			return;
		}

		if (suggestNumber == lastItem) {
			setSuggestNumber(start);
			return;
		}
		setSuggestNumber(suggestNumber + step)
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && e.target.value.length > 2 && !suggestItem?.category) {

			const searchArr = suggestData.filter(item => {
				if (item?.text?.toLowerCase() === e.target.value.toLowerCase() && item?.category) {
					return item
				}
			})


			if (searchArr.length) {
				const item = searchArr[0]
				const category = item.category.split(',').reverse()[0]
				if (item.name === e.target.value) {
					router.push(`/search/${category}`)

				} else {
					router.push({
						pathname: `/search/${category}`,
						query: {
							text: item.text,
							modelsAuto: item?.check?.mark,
							submodels: item?.check?.model
						}
					})
				}
			} else {
				router.push({pathname: '/search/all',query: {text: e.target.value}})
			}

		}

		if (e.key === 'Enter' && suggestItem?.category) {
			const category = suggestItem.category.split(',').reverse()[0]

			if (suggestItem.type === 'query') {
				router.push({pathname: `/search/${category}`,query: {text: suggestItem.text, modelsAuto: suggestItem?.check?.mark, submodels: suggestItem?.check?.model}})
				return;
			}

			router.push(`/search/${category}`)
		}

		if (e.key === 'ArrowDown') {
			setHovered(false)
			generateSuggest(1, suggestData.length, 1)
		}
		if (e.key === 'ArrowUp') {
			setHovered(false)
			generateSuggest(-1, 1, suggestData.length)
		}
	}


	const changeSuggestSelect = (index) => {
		setSuggestNumber(index);
		setSuggestItem(suggestData[index])
		setHovered(true)
	}

	

	return (	
		<Box className={classes.input} onBlur={handleBlur} onFocus={() => setShowButtons(true)} >
				<TextField
					value={searchValue}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					variant='outlined' size='small'
					placeholder={text ? text : "Поиск по объявлениям"}
					fullWidth className={classes.searchInput} 
				/>
				<SearchIcon className={classes.icon} />
				{(showButtons && !mobile) && 
					<div className={classes.checkboxes}>
						<div style={{display: 'flex'}}>
							<SearchCheckbox checked={onlyPhoto} changeChecked={setOnlyPhoto} label='Только с фото' />
							<SearchCheckbox checked={safetyOffer} changeChecked={setSafetyOffer} label='Безопасная сделка' />
						</div>
						<SearchCheckbox checked={saveResult} changeChecked={setSaveResult} label='Сохранить поиск' />					
					</div>
				}
				{(showButtons && searchValue) && 
					<div>
						<SearchBlock 
							value={searchValue}
							setSearchValue={setSearchValue} 
							suggestData={suggestData}
							activeSuggest={suggestNumber} 
							changeSuggestSelect={changeSuggestSelect}
						/>
					</div>
				}
				
		</Box>
	)
}

export default Search;
