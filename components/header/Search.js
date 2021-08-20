import { Box, TextField, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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
}));

const Search = ({text = false}) => {

	const classes = useStyles();
	// const [search, setSearch] = useState();
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

	// console.log(result)

	return (
		<Box className={classes.input} >
			<TextField
				// value={search}
				// onChange={e => handelSearch(e)}
				variant='outlined' size='small'
				placeholder={text ? text : "Поиск по объявлениям"}
				fullWidth className={classes.searchInput} />
			<SearchIcon className={classes.icon} />
		</Box>
	)
}

export default Search;
