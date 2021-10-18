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

const SearchBlock = ({suggestData}) => {
    const classes = useStyles();


    // const dictionaryOfCars = [
    //     'acura', 'alfa Romeo', 'audi', 'ac', 'adler', 'alpina', 'amc', 'ariel', 'aro', 'asia', 'abum', 'austin', 'aston martin',
    //     'baic', 'bajaj', 'baltijas dzips', 'boajun', 'barkas', 'baw', 'bentley', 'bmw', 'bio auto', 'brilliance', 'bufori', 'buick', 'byd',
    //     'cadillac', 'caterham', 'changhe', 'changan', 'chery', 'cheryexeed', 'chevrolet', 'chrysler', 'citroen',
    //     'dacia', 'dadi', 'daewoo', 'daihatsu', 'daimler', 'datsun', 'derways', 'dkw', 'dodge', 'dongfeng', 'doninvest', 'ds', 'dw hower',
    //     'eagle', 'excalibur',
    //     'faw', 'ferrari', 'fiat', 'fisker', 'ford', 'foton', 'fso',
    //     'gac', 'geely', 'genesis', 'gmc', 'golden dragon', 'great wall',
    //     'hafei', 'haima', 'hanomag', 'huanghai', 'hudson', 'haval', 'hawtai', 'honda', 'hummer', 'hyundai',
    //     'infinity', 'iran khordo', 'isuzu', 'iveco',
    //     'jac', 'jaguar', 'jeep', 'jensen', 'jinbei', 'jmc', 'kia',
    //     'lamborghini', 'lancia', 'land rover', 'landwind', 'ldv', 'lexus', 'lifan', 'lincoln', 'luxgen',
    //     'mahindra', 'marussia', 'maruti', 'maserati', 'maybach', 'mazda', 'mclaren', 'mercedes-benz', 'mercury', 'metrocab', 'mg', 'mini', 'mitsubishi', 'mitsuoka', 'morgan', 'morris',
    //     'nissan', 'nysa',
    //     'oldsmobile', 'osca', 'opel',
    //     'packard', 'peugeot', 'plymouth', 'pontiac', 'porsche', 'proton', 'puch',
    //     'ram', 'ravon', 'reliant', 'renault', 'renault samsung', 'rocar', 'rolls-royce', 'rover',
    //     'saab', 'saturn', 'scion', 'seat', 'shunaghuan', 'skoda', 'sma', 'smart', 'ssangyong', 'steyr', 'studebaker', 'subaru', 'suzuki',
    //     'talbot', 'tata', 'tatra', 'tazzari', 'tesla', 'tianma', 'tianye', 'toyota', 'trabant', 'triumph',
    //     'vauxhall', 'volkswagen', 'volvo', 'vortex',
    //     'wanderer', 'wartburg', 'weltmeister', 'westfield', 'willys', 'w motors',
    //     'xin kai', 'xpeng',
    //     'zibar', 'zotye', 'zx',
    //     'автокам', 'апал', 'богдан',
    //     'ваз (lada)', 'ваз', 'lada', 'вис', 'газ', 'ераз', 'заз', 'зил', 'зис', 'иж', 'канонир', 'комбат', 'луаз', 'москвич', 'раф', 'смз', 'тагаз', 'уаз']
    //
    //
    // const dictionaryOfRealEstate = [
    //     'квартира', 'квартира в новостройках', 'квартиры', 'квартира в аренду', 'квартира посуточно', 'отели',
    //     'дом', 'дача', 'коттедж', 'комната', 'коммерческая недвижимость', 'земельный участок', 'гараж', 'машиноместо', 'хата']
    //
    //
    // const dictionaryOfJob = ['администратор', 'водитель', 'грузчик', 'кладовщик', 'курьер', 'машинист', 'менеджер', 'монтажник',
    //     'оператор','охранник','повар','продавец','продавец-кассир','продавец кассир','кассир','разнорабочий','сварщик','уборщица','промоутер','дизайнер','сварщик','торговый представитель',
    //     'электрик','автомеханик','автомойщик','автослесарь','слесарь','сантехник','повар','кондитер','маханик','кузнец','автокрановщик'
    //     ,'верстальщик','программист','специалист','seo','web-дизайнер','web дизайнер','веб-дизайнер','веб дизайнер','вэб дизайнер','дизайнер','авиадиспетчер',
    //     'event-менеджер','организатоор','авиаинженер','агент','агент по туризму','агроном','адвокат','административный директор','директор','администратор гостиницы',
    //     'администратор ресторана','администратор сайта','актер','актуарий','аналитик','аниматор','антикризисный управляющий','арт-директор','арт директор','архивариус',
    //     'архитектор','архитектор-проектировщик','астроном','аудитор','байер','банкир','банковский кассир-операционист','бармен','бизнес-аналитик','бизнес-тренер',
    //     'биоинженер','биолог','биотехнолог','блогер','брейдер','брокер','бухгалтер','веб-программист','верстальщик','ветеринар','визажист',
    //     'винодел','воспитатель детского сада','востоковед','врач','врач скорой помощи','врач онколог','генетик','главный инженер',
    //     'геодезист','геолог','геофизик','геоэколоог','гид','гид-переводчик','гинеколог','главный бухгалтер','главный инженер в строительстве',
    //     'главный редактор','графический дизайнер','гример','грумер','дегустатор','диджей','диетолог','ддизайнер','дизайнер интерьера',
    //     'дизайнер рекламы','дизайнер-модельер','дипломат','директор','журналист','звукооператор','звукорежессер','зубной техник','имиджмейкер',
    //     'инженер','инженер по бурению','инженер по оборудованию','инженер по охране труда','инженер по технике безопасности','инженер по транспоту',
    //     'инженер по эксплуатации','инженер по телекоммуникации и связи','инженер связи','инженер конструктор','инженер-проектировщик',
    //     'инженер-сметчик','инженер-строитель','инженер-технолог по качеству','инженер-эколог','инженер-электрик','инженер-энергетик',
    //     'инженер по вождению','интервьюер','искуствовед','картограф','киновед','кинолог','кинооператор','клипмейкер','кондитер','консультант по туризму',
    //     'контент-менеджер','копирайтер','корректор','косметолог','коуч','криминалист','критик','культуролог','ландшафтный дизайнер',
    //     'лингвист','лоббист','gr-специалист','логист','логопед','маркетолог','массажист','мастер по маникюру','машинист электропоезда',
    //     'медсестра','менеджер','менеджер гостинично-ресторанного бизнеса','менеджер по pr','менеджер по заупкам',
    //     'менеджер по инновациям','менеджер по логистике','менеджер по маркетингу','менеджер по персоналу','менеджер по персоналу','менеджер по продажам',
    //     'менеджер по развитию','менеджер по рекламе','менеджер по туризму','менеджер проекта','мерчендайзер','младшая медицинская сестра','модельер',
    //     'мультипликатор','налоговый инспектор','налоговый консультант','нанотехнолог','начальник строительного участка','невролог',
    //     'нейрохирург','нотариус','океанолог','оператор пк','оператор кино и телевидения','ортопед','офис-менеджер','официант','оценщик','эксперт по оценке',
    //     'парикмахер','педагог','педиатр','переводчик','пилот','псатель','пожарный','политолог','политтехнолог','полицейский',
    //     'помощник бухгалтера','пресс-атташе','провизор','программист php','программист react','программист javascript','программист cotlin','программист c++',
    //     'программист c#','data analyst','программист python','программист java','программист go','программист ruby','qa-инженер','android разработчик ',
    //     'ios разработчик ', 'контекстолог','модератор','тестировщик', 'тимлид',
    //     'продавец-консультант','продюссер','прокурор','прораб','психолог','психотерапевт','радиотехник','реабилитолог','регионовед','редактор',
    //     'редактор книг','режиссер','рекламный агент','рекрутер','ресторатор','риелтор','сварщик','секретарь','секретарь-референт','системный администратор',
    //     'системный аналитик','следователь','социальный педогог','социальный работник','социолог','специалист по вэд','специалист по государственному и муниципальному управлению',
    //     'безопасник','специалист по информационной безопасности','специалист по обслуживанию компьютерных сетей','специалист по защите информации',
    //     'спичрайтер','главный тренер','стилист','стоматолог','страховой агент','стюардесса','судья','сценарист','таможенник','телеведущий',
    //     'тележурналист','терапевт','тестировщик по','технолог','технолог пищевого производства','технолог пищевой промышленности','технолог по нефтепереработке',
    //     'товаровед','транспортный планировщик','трейдер','тренер по фитнесу','тренинг-менеджер','управляющий рестораном','учитель','учитель иностранного языка','учитель физики',
    //     'учитель алгебры','учитель младших классов','учитель изо','учитель труда','учитель русского языка','учитель математики','учитель биологии','учитель химии',
    //     'фармацевт','физик','финансовый директор','финансовый менеджер','флорист','фотограф','химик-технолог','хирург','хореограф','художник-график',
    //     'художник-илюстратор','шеф-повар','художник','эколог','экономист','эксперт-криминалист','энергетик','этнограф','ювелир','юрисконсульт','юрист','юрист-международник',
    //     'экзарцист','свещенник','военный','сторож','диспетчер','дрессировщик','токарь','строитель','нянечка','сиделка','инструктор','мастер по ремонту',
    //     'монтажник слаботочных систем','контралер','стропальщик','крановщик','оператор колл-центра','монтажник связи','программист bitrix','педагог дополнительного образования',
    //     'асистент','водитель-экспедитор','it-специалист','smm марктолог',]
    //
    //
    // const dictionaryOfAnimals = [
    //     'лягушка', 'кошка', 'собака', 'щенок', 'крот', 'пёсик', 'котенок', 'корова', 'рыбка', 'крыса', 'кот', 'пёс', 'трубкозуб', 'абиссинский', 'аддакс',
    //     'пингвин адели', 'аффенпинчер', 'афганская борзая', 'африканская лягушка-бык', 'африканский лесной слон', 'африканская циветта', 'африканская когтистая лягушка',
    //     'африканский лесной слон', 'африканская пальмовая циветта', 'африканский пингвин', 'африканская древесная жаба', 'африканская дикая собака', 'айди', 'айну',
    //     'эрдельтерьер', 'эрдельтерьер', 'акбаш', 'акита', 'овчарка акита', 'алабай', 'аляскинский хаски', 'аляскинский кли кай', 'аляскинский маламут', 'аляскинская овчарка',
    //     'альбатрос', 'гигантская черепаха альдабра', 'аллигатор', 'аллигатор гар', 'альпака', 'альпийская такса бракка', 'альпийский козел', 'алуски',
    //     'американская овчарка', 'американский бульдог', 'американский кокер-спаниель', 'американская енотовидная собака',
    //     'американская эскимосская собака', 'американский фоксхаунд', 'американский безволосый терьер', 'американский питбультерьер', 'американский карликовый козел', 'американская малиновка',
    //     'американский стаффордширский терьер', 'американская жаба', 'американский водяной спаниель', 'амурский леопард', 'анатолийская овчарка', 'анчоусы',
    //     'рыба-ангел', 'рыба-удильщик', 'ангорская коза', 'муравей', 'антарктический чешуйчатый червь', 'муравьед', 'антилопа', 'собака аппенцеллера', 'чихуахуа',
    //     'арапайма', 'песец', 'полярный заяц', 'арктический волк', 'броненосец', 'армиворм', 'азиатский слон', 'азиатский гигантский шершень', 'азиатская пальмовая циветта',
    //     'азиатский черный медведь', 'зубры', 'австралийский пудель', 'австралиец или', 'австралийский бульдог', 'австралийская пастушья собака', 'австралийская собака-келпи',
    //     'австралийский лабрадудль', 'австралийский туман', 'австралийский ретривер', 'австралийская овчарка', 'австралийский терьер', 'авосет', 'аксолотль', 'муравьед', 'льбатрос',
    //     'аллигатор', 'альпака', 'ант', 'муравьед', 'антилопы', 'обезьяна', 'армадилло', 'осел', 'бабуин', 'барсук', 'барракуда', 'летучая мышь', 'медведь', 'бобер', 'пчела', 'зубр',
    //     'кабан', 'баффало', 'бабочка', 'верблюд', 'капибара', 'карибу', 'казуар', 'кошка', 'гусеница', 'быдло', 'серна', 'гепард', 'курица', 'шимпанзе', 'шиншилла', 'галка', 'моллюск',
    //     'кобра', 'тараканище', 'треска', 'баклан', 'койот', 'краб', 'журавль', 'крокодил', 'ворона', 'кроншнеп', 'олень', 'динозавр', 'собака', 'акулы', 'дельфин', 'хрустащая', 'голубь',
    //     'стрекоза', 'утка', 'дюгонь', 'чернозобик', 'орел', 'ехидна', 'угорь', 'эланд', 'слон', 'лось', 'му', 'сокол', 'хорек', 'финч', 'рыбы', 'фламинго', 'муха', 'лиса', 'лягушка', 'гаур',
    //     'газель', 'песчанка', 'жираф', 'гнать', 'гну', 'козел', 'щегол', 'золотая рыбка', 'гусь', 'горилла', 'ястреб-тетеревятник', 'кузнечик', 'глухарь', 'гуанако', 'чайка', 'хомяк', 'заяц',
    //     'ястреб', 'ежик', 'цапля', 'селедка', 'бегемот', 'шершень', 'лошадка', 'человека', 'колибри', 'гиена', 'козерог', 'ибис', 'шакал', 'ягуар', 'джей', 'медуза', 'кенгуру', 'зимородок',
    //     'коала', 'кукубара', 'куду', 'чибис', 'жаворонок', 'лемур', 'еопард', 'лев', 'лама', 'лобстер', 'саранча', 'лорис', 'вошь', 'лирохвост', 'сорока', 'маллард', 'ламантин', 'мандрил',
    //     'богомол', 'куница', 'сурикат', 'минк', 'крот', 'мангуста', 'обезьяна', 'лось', 'комар', 'мышь', 'мул', 'нарвал', 'тритон', 'соловей', 'спрут', 'окапи', 'опоссум',
    //     'орикс', 'страус', 'выдра', 'сова', 'устрица', 'пантера', 'попугай', 'куропатка', 'павлин', 'пеликан', 'пингвин', 'фазан', 'свинья', 'голубь', 'пони', 'дикобраз',
    //     'барс', 'перепелка', 'птицам', 'кетцаль', 'кролик', 'енот', 'железнодорожный транспорт', 'рам', 'крысы', 'ворон', 'красный олень', 'красная панда', 'северный олень',
    //     'носорог', 'ладья', 'саламандра', 'лосось', 'песочный доллар', 'кулик', 'сардины', 'скорпион', 'морской конек', 'уплотнение', 'акула', 'овцы', 'егеры', 'скунс',
    //     'улитка', 'змея', 'воробей', 'паук', 'колпица', 'кальмар', 'белка', 'старлинг', 'стингрей', 'вонючий жук', 'аист', 'ласточка', 'лебедь', 'тапир', 'долгопят',
    //     'термит', 'тигр', 'жаба', 'форель', 'черепаха', 'гадюка', 'стервятник', 'кенгуру', 'морж', 'оса', 'ласка', 'кит', 'дикая кошка', 'волк', 'росомаха',
    //     'вомбат', 'вальдшнеп', 'дятел', 'червь', 'королек', 'як', 'зебра']
    //
    // // const lover = (arr) => {
    // //     return arr.map(item => item.toLowerCase());
    // // }
    // // console.log('LOVER',lover(dictionaryOfAnimals))
    //
    // let category
    //
    //
    //
    // if (dictionaryOfCars.includes(value.toLowerCase())) {
    //     category = "transport"
    // } else if (dictionaryOfAnimals.includes(value.toLowerCase())) {
    //     category = "Animals"
    // } else if (dictionaryOfRealEstate.includes(value.toLowerCase())) {
    //     category = "real_estate"
    // } else if (dictionaryOfJob.includes(value.toLowerCase())) {
    //     category = "job"
    // }
    //


    // todo: свитч кейс с определением категории обьявления
    // todo: возможно тут проверку и в зависимости от value подставляется категория
    // todo: максимум 8 строчек


    return (
        <div className={classes.searchField}>
            {/*{category && <SearchItem category={category} value={value} setSearchValue={setSearchValue}>{value}</SearchItem>}*/}
            {/*<SearchItem category={dictionaryOfAnimals.includes(value.toLowerCase()) ? "Animals,Rodents" : 'for_home_and_d,Security_systems,Safes'} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
            {/* <SearchItem category={category} >{value}</SearchItem> */}
            {/*<SearchItem category={category} >{value}</SearchItem>*/}
			{suggestData.length && suggestData.map((item, index) => {
				 return <SearchItem key={index} categoryName={item.name} suggestData={item} >{item.text}</SearchItem>
			})}
        </div>
    )
}

export default SearchBlock
