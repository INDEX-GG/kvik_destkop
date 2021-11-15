import { makeStyles } from "@material-ui/core";
import { useRouter } from 'next/router'
import BurgerAnimal from "../../UI/icons/BurgerAnimal";
import BurgerAuto from "../../UI/icons/BurgerAuto";
import BurgerBusiness from "../../UI/icons/BurgerBusiness";
import BurgerElectronic from "../../UI/icons/BurgerElectronic";
import BurgerHobby from "../../UI/icons/BurgerHobby";
import BurgerHome from "../../UI/icons/BurgerHome";
import BurgerRealEstate from "../../UI/icons/BurgerRealEstate";
import BurgerServices from "../../UI/icons/BurgerServices";
import BurgerThing from "../../UI/icons/BurgerThing";
import BurgerWork from "../../UI/icons/BurgerWork";
import DefaultCategory from "../../UI/icons/DefaultCategory";

const useStyles = makeStyles(() => ({
  searchItem: {
    padding: "8px 0",
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  activeSearchItem: {
	backgroundColor: '#E9E9E9',
	'&:hover': {
      background: '#E9E9E9'
    },
  },
  text: {
    padding: '0 24px 0 16px'
  },
  category: {
    color: "#8F8F8F",
    display: 'inline-flex',
    alignItems: 'center',
  },
  categoryName: {
	  marginRight: '10px'
  }
}));

const iconsObj = {
	real_estate: <BurgerRealEstate size={18} fill="#8F8F8F"  />,
	transport: <BurgerAuto size={18} fill="#8F8F8F" />,
	consumer_electronics: <BurgerElectronic size={18} fill="#8F8F8F"  />,
	job: <BurgerWork size={18} fill="#8F8F8F"  />,
	for_busines: <BurgerBusiness  size={18} fill="#8F8F8F"  />,
	for_home_and_d: <BurgerHome size={18} fill="#8F8F8F"  />,
	personal_floops: <BurgerThing size={18} fill="#8F8F8F"  />,
	animals: <BurgerAnimal  size={18} fill="#8F8F8F"  />,
	hobbies_sports_and_leisure: <BurgerHobby  size={18} fill="#8F8F8F"  />,
	services: <BurgerServices  size={18} fill="#8F8F8F"  />,
};

const SearchItem = ({children, categoryName, /** setSearchValue */suggestData, activeSugges, changeSuggestSelect, index}) => {
  
  const classes = useStyles();
  const router = useRouter();

  const generateIcon = () => {
	if (suggestData?.category) {
		const categoryAlias = suggestData.category.split(',')[0].toLowerCase();
		const AliasIcon = iconsObj[categoryAlias]
		return AliasIcon
	}
	return <DefaultCategory/>;
  }


  const handleClick = () => {
	if (suggestData?.category) {

		const categoryAlias = suggestData.category.split(',').reverse()[0]

		if (suggestData.type != 'query') {
			router.push(`/search/${categoryAlias}`)
			return;
		}

		router.push({
			pathname: `/search/${categoryAlias}`,
			query: {text: suggestData.text, modelsAuto: suggestData?.check?.mark, submodels: suggestData?.check?.model  }
		})

		console.log(suggestData)


	} else {
		router.push({
			pathname: '/search/all',
			query:{text: suggestData.text}
		})
	}
  }



  return (
		<div className={`${classes.searchItem} ${activeSugges && classes.activeSearchItem}`} 
		  onClick={handleClick}
		  onMouseEnter={() => changeSuggestSelect(index + 1)}
		  >
			<span className={classes.text}>{children}</span>
			{categoryName != suggestData.text ?
			<span className={`${classes.category} ${classes.categoryName}`}>{categoryName}</span> : null}
			<span className={classes.category}>{generateIcon()}</span>
		</div>
  )
}

export default SearchItem
