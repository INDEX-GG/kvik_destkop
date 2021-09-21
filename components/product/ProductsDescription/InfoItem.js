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
  return <div style={ {
    display: 'flex',
    alignItems: "flex-start",
    width: mobile ? '50%' : "100%",
    padding: "10px 0",

  }}>
    <div className={classes.title}>{name}</div>
    <pre className={classes.content}>{desc}</pre>
  </div>
}

export default InfoItem
