
const ToggleButton = ({text, onClick}) => {
  return (
    <div onClick={() => onClick()} style={{
      color: "#00A0AB",
      width: '100%',
      display: "flex",
      justifyContent: "flex-end",
      cursor: "pointer"
    }}>
      <span>{text}</span>
    </div>
  )
}

export default ToggleButton
