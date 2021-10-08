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


    const dictionaryOfCars = [
        'acura', 'alfa Romeo', 'audi', 'ac', 'adler', 'alpina', 'amc', 'ariel', 'aro', 'asia', 'abum', 'austin', 'aston martin',
        'baic', 'bajaj', 'baltijas dzips', 'boajun', 'barkas', 'baw', 'bentley', 'bmw', 'bio auto', 'brilliance', 'bufori', 'buick', 'byd',
        'cadillac', 'caterham', 'changhe', 'changan', 'chery', 'cheryexeed', 'chevrolet', 'chrysler', 'citroen',
        'dacia', 'dadi', 'daewoo', 'daihatsu', 'daimler', 'datsun', 'derways', 'dkw', 'dodge', 'dongfeng', 'doninvest', 'ds', 'dw hower',
        'eagle', 'excalibur',
        'faw', 'ferrari', 'fiat', 'fisker', 'ford', 'foton', 'fso',
        'gac', 'geely', 'genesis', 'gmc', 'golden dragon', 'great wall',
        'hafei', 'haima', 'hanomag', 'huanghai', 'hudson', 'haval', 'hawtai', 'honda', 'hummer', 'hyundai',
        'infinity', 'iran khordo', 'isuzu', 'iveco',
        'jac', 'jaguar', 'jeep', 'jensen', 'jinbei', 'jmc', 'kia',
        'lamborghini', 'lancia', 'land rover', 'landwind', 'ldv', 'lexus', 'lifan', 'lincoln', 'luxgen',
        'mahindra', 'marussia', 'maruti', 'maserati', 'maybach', 'mazda', 'mclaren', 'mercedes-benz', 'mercury', 'metrocab', 'mg', 'mini', 'mitsubishi', 'mitsuoka', 'morgan', 'morris',
        'nissan', 'nysa',
        'oldsmobile', 'osca', 'opel',
        'packard', 'peugeot', 'plymouth', 'pontiac', 'porsche', 'proton', 'puch',
        'ram', 'ravon', 'reliant', 'renault', 'renault samsung', 'rocar', 'rolls-royce', 'rover',
        'saab', 'saturn', 'scion', 'seat', 'shunaghuan', 'skoda', 'sma', 'smart', 'ssangyong', 'steyr', 'studebaker', 'subaru', 'suzuki',
        'talbot', 'tata', 'tatra', 'tazzari', 'tesla', 'tianma', 'tianye', 'toyota', 'trabant', 'triumph',
        'vauxhall', 'volkswagen', 'volvo', 'vortex',
        'wanderer', 'wartburg', 'weltmeister', 'westfield', 'willys', 'w motors',
        'xin kai', 'xpeng',
        'zibar', 'zotye', 'zx',
        'автокам', 'апал', 'богдан',
        'ваз (lada)', 'ваз', 'lada', 'вис', 'газ', 'ераз', 'заз', 'зил', 'зис', 'иж', 'канонир', 'комбат', 'луаз', 'москвич', 'раф', 'смз', 'тагаз', 'уаз']


    const dictionaryOfRealEstate = [
        'квартира', 'квартира в новостройках', 'квартира в аренду', 'квартира посуточно', 'отели',
        'дом', 'дача', 'коттедж', 'комната', 'коммерческая недвижимость', 'земельный участок', 'гараж', 'машиноместо',]


    const dictionaryOfAnimals = ['кошка', 'собака', 'щенок', 'крот', 'пёсик', 'котенок', 'корова', 'рыбка', 'крыса']

    let category

    // let category = dictionaryOfCars.includes(value.toLowerCase()) ? "transport" : ""

    if (dictionaryOfCars.includes(value.toLowerCase())) {
        category = "transport"
    } else if (dictionaryOfAnimals.includes(value.toLowerCase())) {
        category = "Animals"
    } else if (dictionaryOfRealEstate.includes(value.toLowerCase())) {
        category = "real_estate"
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
