import { makeStyles } from "@material-ui/core";


const useClass = makeStyles(() => ({
  title: {
    color: "#8F8F8F",
    marginRight: 4,
  },
  content: {
    color: "#2C2C2C"
  },
}))


const InfoItem = ({name, desc, mobile}) => {
  const classes = useClass()

  if(name === 'Цвет:') {
    switch (desc) {
      case 1:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#FFFFFF"}}/>;
        break
      case 2:
        desc = <div style={{
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          background: "linear-gradient(180deg, #000000 0%, rgba(255, 255, 255, 0) 100%)"
        }}/>;
        break
      case 3:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "##828282"}}/>;
        break
      case 4:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#000000"}}/>;
        break
      case 5:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#974B00"}}/>;
        break
      case 6:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#FDE4B9"}}/>;
        break
      case 7:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#F60000"}}/>;
        break
      case 8:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#FF7E10"}}/>;
        break
      case 9:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#FFEB78"}}/>;
        break
      case 10:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#28B26F"}}/>;
        break
      case 11:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#78C5F3"}}/>;
        break
      case 12:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#3144B6"}}/>;
        break
      case 13:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#7F00FF"}}/>;
        break
      case 14:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#C400AA"}}/>;
        break
      case 15:
        desc = <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#FFCADA"}}/>;
        break
      case 16:
        desc = <div style={{
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          background: "linear-gradient(180deg, #FF0000 0%, #FAFF00 32.29%, #05FF00 55.21%, #00F0FF 67.71%, #000AFF 81.25%, #FF00F5 100%)"
        }}/>;
        break

      default:
        <div style={{borderRadius: "50%", width: "20px", height: "20px", background: "#FFFFFF"}}/>;

    }
  } else if(name === 'VIN (номер кузова):') {
    desc = `${desc.slice(0,4)}*************`;
  }



  return <div style={ {
    display: 'flex',
    alignItems: name === 'Цвет:'? "center" : "flex-start",
    width: mobile ? '50%' : "100%",
    padding: "10px 0",

  }}>
    <div className={classes.title}>{name}</div>
    <pre className={classes.content}>{desc}</pre>
  </div>
}

export default InfoItem
