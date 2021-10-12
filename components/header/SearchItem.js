import { makeStyles } from "@material-ui/core";
import Router from 'next/router'
import { useFindCategory } from "../../hooks/useFindCategory";
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
    '&:hover': {
      background: '#E9E9E9'
    }
  },
  text: {
    padding: '0 24px 0 16px'
  },
  category: {
    color: "#8F8F8F",
    display: 'inline-flex',
    alignItems: 'center',
  }
}));

const aliasIcon = {
  real_estate: <BurgerRealEstate size={18} fill="#8F8F8F"  />,
  transport: <BurgerAuto size={18} fill="#8F8F8F" />,
  Consumer_electronics: <BurgerElectronic size={18} fill="#8F8F8F"  />,
  job: <BurgerWork size={18} fill="#8F8F8F"  />,
  for_busines: <BurgerBusiness  size={18} fill="#8F8F8F"  />,
  for_home_and_d: <BurgerHome size={18} fill="#8F8F8F"  />,
  Animals: <BurgerAnimal  size={18} fill="#8F8F8F"  />,
  personal_floops: <BurgerThing size={18} fill="#8F8F8F"  />,
  Hobbies_sports_and_leisure: <BurgerHobby  size={18} fill="#8F8F8F"  />,
  services: <BurgerServices  size={18} fill="#8F8F8F"  />
};

const SearchItem = ({children, category, setSearchValue}) => {
	const classes = useStyles();
  const {categoriesByAlias} = useFindCategory()
  
  const splited = category?.split(',')
  // console.log('splited',splited)
  const categoryData = categoriesByAlias(splited)
  // console.log('categoryData',categoryData)
  const categoryName = splited.length === 1 ? categoryData.name : categoryData.label
  // console.log('categoryName',categoryName);

  const RouterPush = () => {
    setSearchValue('')
    return Router.push(`/search/${splited.slice(-1)}`)
  }


  return (
    <div  className={classes.searchItem} onClick={() => RouterPush()} tabIndex={0}>
      <span className={classes.text}>{children}</span>
      <span className={classes.category}>{aliasIcon[category] ? aliasIcon[category] : <DefaultCategory />} <span style={{paddingLeft: 8}}>{categoryName}</span> </span>
    </div>
  )
}

export default SearchItem
