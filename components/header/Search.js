import { Box, TextField, makeStyles} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import { useMedia } from '../../hooks/useMedia';
import SearchBlock from './SearchBlock';
import SearchCheckbox from './SearchCheckbox';

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
			// left: '12px',
			paddingLeft: 12,
			fontSize: "12px",
			background: "#FFFFFF",
			zIndex: 10
		}
}));

const Search = ({text = false}) => {
	const classes = useStyles();
	const [showButtons, setShowButtons] = useState(true)
	const [onlyPhoto, setOnlyPhoto] = useState(false)
	const [safetyOffer, setSafetyOffer] = useState(false)
	const [saveResult, setSaveResult] = useState(false)
	const [searchValue, setSearchValue] = useState();
	const {matchesTablet, matchesMobile} = useMedia()
	const mobile = matchesTablet || matchesMobile

	// const [result, setRes] = useState();

	// const handelSearch = e => {
	// 	setSearch(e.target.value)
	// 	if (search?.length > 2) {
	// 		setRes(search)
	// 	}
	// }

	// useEffect(() => {
	// 	axios.post('/api/search', { product_name: result })
	// 		.then(res => console.log(res))
	// }, [result])

	const handleChange = (e) => {
		setSearchValue(e.target.value)
	}
	

	const handleBlur = (event) => {
		if (event.relatedTarget === null) {
      setShowButtons(false);
    }
	}
	

	return (
			
		<Box className={classes.input} onBlur={handleBlur} onFocus={() => setShowButtons(true)} >
				<TextField
					value={searchValue}
					onChange={handleChange}
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
				{(showButtons && searchValue && searchValue.length < 25) && 
					<SearchBlock value={searchValue} />
				}
				
		</Box>
	)
}

export default Search;
