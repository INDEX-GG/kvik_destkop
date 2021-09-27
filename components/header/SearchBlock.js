import { makeStyles } from "@material-ui/core";
import SearchItem from "./SearchItem";


const useStyles = makeStyles(() => ({
  searchField: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    marginTop: 22,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0 0 8px 8px',
    padding: 8,
    boxShadow: '0px 12px 12px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden'
  }
}));

const SearchBlock = ({value}) => {
	const classes = useStyles();

  return (
    <div className={classes.searchField}>
      <SearchItem category="transport">{value}</SearchItem>
      <SearchItem category="for_home_and_d,Security_systems,Safes">{value}</SearchItem>
      <SearchItem category="for_home_and_d,Renovation_and_construction,Tools" >{value}</SearchItem>
    </div>
  )
}

export default SearchBlock
