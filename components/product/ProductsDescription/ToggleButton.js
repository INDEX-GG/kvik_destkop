
const ToggleButton = ({text, onClick, top}) => {
  return (
    <div onClick={() => onClick()} style={{
      color: "#00A0AB",
      width: '100%',
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      cursor: "pointer",
      paddingTop: 10,
      
    }}>
      <span style={{
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
      }}>{text}</span>
      <svg style={{
        transform: top ? "rotate(180deg)" : 'rotate(0deg)',
        transition: "transform 0.3s",
      }} width="22" height="20" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.0251 13.1886L12.0711 6.00044L5.11707 13.1886" stroke="#00A0AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>


    </div>
  )
}

export default ToggleButton
