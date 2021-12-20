import { makeStyles } from "@material-ui/core";


const useClass = makeStyles(() => ({
  title: {
    fontSize: '14px',
    color: "rgba(143, 143, 143, 1)",
    marginRight: 4,
  },
  content: {
    fontSize: '14px',
    color: "rgba(21, 21, 21, 1)",
  },
}))


const InfoItem = ({name, desc, mobile}) => {

  // console.log('name, desc, mobile ===>',name, desc, mobile)

  const classes = useClass()

  if(name === 'Цвет:') {
    switch (desc) {
      case 1:
        desc = 'Белый';
        break
      case 2:
        desc = 'Серебристый';
        break
      case 3:
        desc = "Серый";
        break
      case 4:
        desc = "Черный";
        break
      case 5:
        desc = "Коричневый";
        break
      case 6:
        desc = "Бежевый";
        break
      case 7:
        desc = "Красный";
        break
      case 8:
        desc = "Оранжевый";
        break
      case 9:
        desc = "Жёлтый";
        break
      case 10:
        desc = "Зелёный";
        break
      case 11:
        desc = "Голубой";
        break
      case 12:
        desc = "Синий";
        break
      case 13:
        desc = "Фиолетовый";
        break
      case 14:
        desc = "Пурпурный";
        break
      case 15:
        desc = "Розовый";
        break
      case 16:
        desc = "Разноцветный";
        break

      default:
        desc ='Белый';

    }
  } else if(name === 'VIN (номер кузова):') {
    desc = `${desc.slice(0,4)}*************`;
  }


  return (
    <>
      {desc && <div className="productAboutItem" style={ {
        display: 'flex',
        justifyContent: !mobile ? 'space-between' : 'normal',
        alignItems: name === 'Цвет:'? "center" : "flex-start",
        // maxWidth: !mobile ? '100%' : '40%',
        // flexBasis: !mobile ? '100%' : '34%',
        // maxWidth: '50%',
        // minWidth: '40%',
        // width: mobile ? '50%' : "100%",
        // padding: "10px 0",
      }}>
        <div className={classes.title}>{name}</div>
        <pre className={classes.content}>{desc}</pre>
      </div>}
    </>
  )
  
}

export default InfoItem
