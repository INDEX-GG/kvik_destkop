const OffersRenderListIcon = ({clickHandler, color}) => {
    return (
        <svg onClick={clickHandler} width="13" height="13" fill={color} xmlns="http://www.w3.org/2000/svg"><path fill={color} stroke={color} d="M.5.5h1.167v1.167H.5zM.5 5.917h1.167v1.167H.5zM.5 11.334h1.167v1.167H.5z"/><path stroke={color} d="M3.25.583H13M3.25 7.083h6.5M3.25 11.416h4.333"/></svg>
    )
}
export default OffersRenderListIcon;