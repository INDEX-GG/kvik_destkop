import {makeStyles} from "@material-ui/core";
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


    const dictionaryOfCars = ['bmw', 'лада', 'renault', 'toyota', 'skoda', 'hyundai', 'chery', 'kia']
    const dictionaryOfAnimals = ['кошка', 'собака', 'щенок', 'крот', 'пёсик', 'котенок', 'корова', 'рыбка', 'крыса']

    let category

    // let category = dictionaryOfCars.includes(value.toLowerCase()) ? "transport" : ""

    if (dictionaryOfCars.includes(value.toLowerCase())) {
        category = "transport"
    } else if (dictionaryOfAnimals.includes(value.toLowerCase())){
        category = "Animals"
    }
    // dictionaryOfCars.includes(value.toLowerCase()) ? "transport" : ""


        console.log(value)
    // switch (value) {
    //     case dictionaryOfCars.includes(value.toLowerCase()):
    //         console.log('rere `gnf$$$$$$$$$',)
    //         return  category = "transport"
    //     case dictionaryOfAnimals.includes(value.toLowerCase()):
    //         return category = "Animals,Rodents"
    //     default:
    //         category = "transport"
    // }

    console.log('category!', category)

    // todo: свитч кейс с определением категории обьявления
    // todo: возможно тут проверку и в зависимости от value подставляется категория
    // todo: максимум 8 строчек

    return (
        <div className={classes.searchField}>
            {category && <SearchItem category={category}>{value}</SearchItem>}
            {/*<SearchItem category={dictionaryOfAnimals.includes(value.toLowerCase()) ? "Animals,Rodents" : 'for_home_and_d,Security_systems,Safes'} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
        </div>
    )
}

export default SearchBlock
